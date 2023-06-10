import { authToken } from '@/store';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DefaultValue, useRecoilState } from 'recoil';

message.config({
  maxCount: 1,
});

export const useFetch = () => {
  const [token, setToken] = useRecoilState(authToken);
  const navigate = useNavigate();

  const authHeaders = () => {
    if (token) {
      return { token };
    } else {
      return {};
    }
  };

  const handleResponse = (response: any) => {
    return response.text().then((text: string) => {
      try {
        const data = text && JSON.parse(text);
        const error = (data && (data.msg || data.message)) || response.statusText;


        if (data.code !== 200) {
          if (data.code === 201 && token) {
            setToken(new DefaultValue());
            navigate('/login');
            return Promise.reject(Error('需要登录'));
          }

          if (data.code === 301 && token) {
            location.href = '/home';
            return Promise.reject(Error('无权限'));
          }

          if (data.code === 502 && token) {
            return data;
          }
          // message.error(error);
          // throw new Error(error)
          return data;
        }

        if (!response.ok) {
          // message.error(error);
          // throw new Error(error)
          return Promise.reject(error);
        }
        return data;
      } catch (error) {
        return {
          data: error,
          code: 500,
          message: '系统内部错误',
        }
      }
    });
  };

  const request = (method: string) => {
    return (url: string, options?: Record<any, any>) => {
      let allUrl = url;
      const { params, formData, ...otherOption } = options || {};
      const requestOptions: Record<any, any> = {
        method,
        headers: authHeaders(),
        ...(params || formData ? otherOption : {}),
      };
      if (formData) requestOptions.body = formData;
      if (method !== 'GET' && !requestOptions.body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(options);
      }
      if (params || method === 'GET') {
        const list = [];
        const currentParams = params || options;
        for (const key in currentParams) {
          const str = `${key}=${encodeURIComponent(currentParams[key])}`;
          list.push(str);
        }
        const data = list.join('&');
        allUrl = data ? `${url}?${data}` : url;
      }
      return fetch(allUrl, requestOptions).then(handleResponse);
    };
  };

  return {
    authHeaders,
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };
};

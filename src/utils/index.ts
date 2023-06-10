import { PageInfo, ResultDataType } from '@/types';

export const testFun = (a: number, b: number) => {
  return a + b;
};

export const chineseWord = (num = 1) => {
  const random = () =>
    (Math.floor(Math.random() * (0x4e00 - 0x9fbf)) + 0x9fbf).toString(16);
  let str = '';
  for (let index = 0; index < num; index++) {
    const chinese = `\\u${random()}`;
    if (chinese && chinese.indexOf('\\u') !== -1) {
      const valArr = chinese.split('\\u');
      let result = '';
      for (let j = 0, length = valArr.length; j < length; j++) {
        result += String.fromCharCode(parseInt(valArr[j], 16));
      }
      str += result.slice(1);
    }
  }
  const strs = str.split('');
  strs.length = num;
  return strs.join('');
};

export function MockFun<T>(
  data: T,
  pageInfo?: PageInfo,
): Promise<ResultDataType<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data,
        pageInfo,
        message: '成功',
      });
    }, 1000);
  });
}

// 工具方法，深拷贝，使用最新的structuredClone，不存在使用polyfill
export function structuredClone<T extends any>(obj: T): T {
  if (window.structuredClone) {
    return window.structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

// 节流
export function throttle<T extends () => void>(fun: T, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        fun();
      }, wait);
    }
  };
}

export const useRules = () => {
  const max = (num: number) => ({
    max,
    message: `长度不超过${num}位`,
  });
  const min = (num: number) => ({
    min,
    message: `长度不能小于${num}位`,
  });
  const len = (num: number) => ({
    max: num,
    min: num,
    message: `长度不为${num}位`,
  });
  const email = () => ({
    type: 'email',
    message: '邮箱格式不正确',
  });
  const pwdPattern = () => ({
    message: `请输入由英文大小写、数字组成的密码`,
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/,
  });
  const required = (msg: string) => ({
    required: true,
    message: msg,
  });
  const specialSymbols = () => ({
    pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
    message: '禁止输入特殊字符',
  });
  return { required, max, min, email, len, pwdPattern, specialSymbols };
};

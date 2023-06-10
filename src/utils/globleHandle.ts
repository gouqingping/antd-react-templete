/**
 * pomise 异步调用api
 * @param callback
 * @returns
 */
export const promiseAck = (callback: any) => {
  return new Promise<void>((resolve) => {
    callback(resolve);
  });
};

/**
 * 生成随机密码
 * @baiyan 生成密码规则：不能有空格，密码为6位，由英文大小写、数字、符号组成，大小写英文字母需要区分
 * @param randomFlag
 * @param min
 * @param max
 * @returns
 */
export const randomPass = (randomFlag: boolean, min: number, max?: number) => {
  let str = '';
  let range = min;
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '-',
    '.',
    '~',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    ':',
    '<',
    '>',
    '?',
  ];

  if (randomFlag && max) {
    range = Math.round(Math.random() * (max - min)) + min; // 任意长度
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

/**
 * 剔除无用的
 * @param obj
 * @param args
 * @returns
 */
export const omit = <T extends Record<string, any>, P extends keyof T>(
  obj: T,
  args: string[],
) => {
  const newObj = {} as Omit<T, P>;
  const keys = Object.keys(obj).filter(
    (item) => !args.includes(item as string),
  ) as Exclude<keyof T, P>[];
  keys.forEach((key) => {
    if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

/**
 * is
 * @returns
 */
export const is = {
  undefined: (value: any) => {
    // eslint-disable-next-line no-void
    return value === void 0;
  },
  boolean(value: any) {
    return (
      value === true ||
      value === false ||
      toString.call(value) === '[object Boolean]'
    );
  },
};

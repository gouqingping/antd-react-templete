export type ProxyItem = [string, string];
export type ProxyList = ProxyItem[];
export type ProxyTargetList = Record<
  string,
  any & { rewrite: (path: string) => string }
>;
export interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_GZIP: boolean;
  VITE_DYNAMIC_IMPORT: boolean;
  VITE_LEGACY: boolean;
}
export const httpsRE = /^https:\/\//;
export function getOutDirName(mode: any) {
  let OUT_DIR_NAME = 'dist';
  Array.isArray(mode) &&
    mode.forEach((item) => {
      if (item.includes('FILE_NAME')) {
        const buildName: any = item.split('=');
        OUT_DIR_NAME = Array.isArray(buildName) ? buildName[1] : 'dist';
      }
    });
  return OUT_DIR_NAME;
}
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: any) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
export function wrapperEnv(envConf: { [k: string]: any } = {}): ViteEnv {
  const ret: ViteEnv | any = {
    VITE_PUBLIC_PATH: './',
    VITE_PORT: 3000,
    ...envConf,
  };
  for (const envName of Object.keys(envConf)) {
    const name = envConf[envName].replace(/\\n/g, '\n');
    let realName = name === 'true' ? true : name === 'false' ? false : name;
    if (envName === 'VITE_PORT') realName = Number(realName);
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) { }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

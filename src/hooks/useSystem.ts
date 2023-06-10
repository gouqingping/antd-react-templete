import con from '@/amb';
import { get } from 'lodash';

interface SystemOutput {
  readonly init: (loaded: (isLiaded: boolean) => void) => Promise<void>;
  readonly isPro: () => boolean;
  readonly getConfig: (
    key?: string,
    reset?: any,
  ) => { [key: string]: any } | string;
  readonly getENV: () => string;
  readonly getEnvUrl: () => string;
  readonly getApi: (key?: string, reset?: any) => { [key: string]: any };
  readonly getSysConfig: (key?: string, reset?: any) => any;
  readonly getTheme: (key?: string, reset?: any) => any;
  readonly getTitle: () => string;
  readonly getLogo: () => string;
  readonly getRequest: () => string;
  readonly getChatGLMUrl: () => string;
  readonly getLoginBackground: () => string;
}

let configs: { [key: string]: any } = con || {};

export const useSystem = (): SystemOutput => {
  const config: { [key: string]: any } = configs;
  const getConfig = (key?: string, reset?: any) => {
    if (!key) return config;
    return get(config, key, reset);
  };
  const getENV = () => getConfig('ENV');
  const isPro = () => getENV() !== 'dev';
  const getEnvUrl = () => getConfig('ENV_URL');
  const getApi = (key?: string, reset?: any) =>
    getConfig(key ? `api.${key}` : 'api', reset);

  const getSysConfig = (key?: string, reset?: any) =>
    getConfig(key ? `config.${key}` : 'config', reset);
  const getTheme = (key?: string, reset?: any): any =>
    getConfig(key ? `theme.${key}` : 'theme', reset);

  const getRequest = () => getConfig('api.base') || '';
  const getChatGLMUrl = () => getConfig('api.chatglm') || '';
  const getTitle = () => getConfig('config.systemName');
  const getLogo = () => getConfig('config.logo') || '/logo.png';
  const getLoginBackground = () =>
    getConfig('config.loginBackground') || '/loginBackground.jpg';
  const init = async (loaded: (isLiaded: boolean) => void) => {
    if (!isPro()) return loaded(true);
    try {
      const currentCon = await fetch(`/${con.ENV_URL}`, { method: 'GET' }).then(
        (res) => res.json(),
      );
      Object.keys(currentCon).forEach((key) => (config[key] = currentCon[key]));
      configs = config;
    } catch {
      configs = con;
    }
    loaded(true);
  };
  return {
    init,
    isPro,
    getConfig,
    getLogo,
    getENV,
    getTheme,
    getEnvUrl,
    getApi,
    getSysConfig,
    getTitle,
    getRequest,
    getChatGLMUrl,
    getLoginBackground,
  };
};

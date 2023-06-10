import react from '@vitejs/plugin-react'
import { ambiences } from 'ambiences';
import { resolve } from 'path';
// import legacy from '@vitejs/plugin-legacy';
import svgr from 'vite-plugin-svgr'
import { defineConfig, ConfigEnv, UserConfigExport, loadEnv, PluginOption } from 'vite';
import { wrapperEnv, rollupOptionsOutput, createProxy, defineConfigs } from './config';
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const root = `${process.cwd()}`;
  const env = loadEnv(mode, root);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_LEGACY } = wrapperEnv(env);
  const outDir = `dist`;
  return defineConfig({
    root,
    base: mode.indexOf('pro') > -1 ? '/' : VITE_PUBLIC_PATH,
    ...defineConfigs,
    plugins: [
      mode !== 'stage' ? react({ jsxRuntime: 'classic' }) : react(),
      ambiences("json", "dist", { env: "ts", isPro: mode === 'stage' }) as PluginOption,
      svgr(),
      // legacy({
      //     targets: ['> 1%, last 1 version, ie >= 8'],
      //     // 面向IE11时需要此插件
      //     additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // }),
    ],
    esbuild: {
      exclude: ['/node_modules/?*.less'],
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    build: {
      outDir,
      polyfillDynamicImport: VITE_LEGACY,
      rollupOptions: {
        output: rollupOptionsOutput,
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^~@/,
          replacement: resolve(__dirname, './'),
        },
        {
          find: /^~/,
          replacement: '',
        },
        {
          find: '@pages',
          replacement: resolve(__dirname, './src/pages'),
        },
        {
          find: '@worker',
          replacement: resolve(__dirname, './src/worker'),
        },
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
        {
          find: '@antv/x6-react-shape',
          replacement: '@antv/x6-react-shape/dist/x6-react-shape.js',
        },
        {
          find: '@antv/x6-react-components/es/split-box/style/index.css',
          replacement: '@antv/x6-react-components/es/split-box/style/index.css',
        },
        {
          find: '@antv/x6-react-components',
          replacement: '@antv/x6-react-components/dist/x6-react-components.js',
        },
        {
          find: '@antv/x6', // use @antv error From issue https://github.com/vitejs/vite/issues/3413
          replacement: '@antv/x6/dist/x6.js',
        },
        {
          find: 'dagre', // use @antv error From issue https://github.com/vitejs/vite/issues/3413
          replacement: 'dagre/dist/dagre.min.js',
        },
      ],
    },
    server: {
      cors: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      hmr: { overlay: false },
    },
  })
}

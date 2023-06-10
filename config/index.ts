/* eslint-disable camelcase */
import { UserConfigExport, BuildOptions } from 'vite';
export * from './common';
export const build: BuildOptions = {
  // 设置资源路径
  // assetsDir: OUT_DIR_NAME,
  assetsInlineLimit: 10000,
  cssCodeSplit: true,
  cssTarget: 'chrome61',
  // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  brotliSize: false,
  manifest: false,
  // chunk 大小警告的限制（以 kbs 为单位）
  chunkSizeWarningLimit: 1000,
  commonjsOptions: { ignore: [] },
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: true,
      drop_debugger: true,
    },
  },
  minify: 'terser',
};

export const defineConfigs: UserConfigExport = {
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule: { name: string; remove: () => void }) => {
              if (atRule.name === 'charset') atRule.remove();
            },
          },
        },
      ],
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
};

export const rollupOptionsOutput = {
  // compact: true,
  chunkFileNames: 'static/js/[name]-[hash].js',
  entryFileNames: 'static/js/[name]-[hash].js',
  assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
  manualChunks(id: string | string[]) {
    if (id.includes('node_modules')) {
      return id.toString().split('node_modules/')[1].split('/')[0].toString();
    }
  },
};

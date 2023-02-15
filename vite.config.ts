import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import createVuePlugin from './plugin/vue';
import createAutoImportPlugin from './plugin/autoImport';
import createArcoPlugin from './plugin/arco';
import createMockPlugin from './plugin/mock';

// https://vitejs.dev/config/
export default defineConfig(() => {
  let config: UserConfig = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [...createVuePlugin(), ...createAutoImportPlugin(), ...createArcoPlugin()],
  };

  if (process.env.DEV_MODE === 'mock') {
    config.plugins.push(...createMockPlugin());
  } else {
    config = {
      ...config,
      server: {
        proxy: {
          '/api/user': {
            target: 'http://10.212.67.8:8081',
            rewrite: path => path.replace(/^\/api\/user/, ''),
          },
          '/api': {
            target: 'http://10.212.67.18:8080',
            rewrite: path => path.replace(/^\/api/, ''),
          },
        },
      },
    };
  }

  return config;
});

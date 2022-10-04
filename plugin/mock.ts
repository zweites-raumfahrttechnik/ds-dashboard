import { viteMockServe } from 'vite-plugin-mock';

function createMockPlugin() {
  return [
    viteMockServe({
      ignore: /^_*./,
    }),
  ];
}

export default createMockPlugin;

import { createApp } from 'vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue';
import bootstrapRouter from './router';

import './style/global.less';

const bootsrap = () => {
  const app = createApp(App);

  app.use(ArcoVueIcon);

  bootstrapRouter(app);

  app.mount('#app');
};

bootsrap();

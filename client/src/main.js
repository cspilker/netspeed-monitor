import Vue from 'vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import Notifications from 'vue-notification';
import { Datetime } from 'vue-datetime';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.component('datetime', Datetime);
new Vue({
  SyncLoader,
  router,
  render(h) { return h(App); },
}).$mount('#app');

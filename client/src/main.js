import Vue from 'vue'
import App from './App.vue'
import Routes from './routes/index.js'

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

Vue.config.productionTip = false

new Vue({
  router: Routes,
  VueCookie: VueCookie,
  render: h => h(App),
}).$mount('#app')

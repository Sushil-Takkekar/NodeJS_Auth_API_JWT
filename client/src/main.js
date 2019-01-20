import Vue from 'vue'
import App from './App.vue'
import Routes from './routes/index.js'

Vue.config.productionTip = false

new Vue({
  router: Routes,
  render: h => h(App),
}).$mount('#app')

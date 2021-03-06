import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)

Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'https://price-updater.herokuapp.com/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

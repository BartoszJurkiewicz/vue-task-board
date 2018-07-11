import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import { Card, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Card)
Vue.use(Button)

Vue.config.productionTip = true

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

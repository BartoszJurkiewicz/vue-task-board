import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { Icon, Card, Button, Row, Col, Form, FormItem, Input, Select, Option, DatePicker, Tooltip } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.use(Icon)
Vue.use(Card)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Tooltip)

locale.use(lang)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

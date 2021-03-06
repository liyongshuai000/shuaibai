import Vue from 'vue'
import App from './App'
import "babel-polyfill";
import {Row,Col,Button,Input,Dialog,Form,FormItem,Select,Option,Upload} from  'element-ui'



Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

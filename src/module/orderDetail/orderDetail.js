import Vue from 'vue'
import App from './App'
import "babel-polyfill";
import Vuex from 'vuex'
import store from '../../common/vuex/store'
import {Row,Col,Button,Input,Checkbox,Radio} from  'element-ui'


  

Vue.use(Vuex)  
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Radio)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  
})


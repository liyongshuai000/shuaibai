import Vue from 'vue'
import App from './App'

import {Row,Col,Button,Input,Checkbox,Radio} from  'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../../../theme/index.css'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Radio)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
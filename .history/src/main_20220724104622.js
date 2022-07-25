// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false


//Install ElementUI
Vue.use(ElementUI);
Vue.use(router)
//Install axios
Vue.use(VueAxios,axios)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // components: { App },
  // template: '<App/>'
});



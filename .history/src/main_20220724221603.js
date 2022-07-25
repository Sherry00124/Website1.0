// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueContextMenu from 'vue-contextmenu'
import VueClipboard from 'vue-clipboard2'    



Vue.config.productionTip = false


//Install ElementUI
Vue.use(ElementUI);
Vue.use(router)
//Install axios
Vue.use(VueAxios,axios)
//右键编辑
Vue.use(VueContextMenu)
//复制粘贴
Vue.use(VueClipboard)    
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});



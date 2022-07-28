//创建store
import Vue from 'vue'
import userModule from '@/store/module/user'
import Vuex from 'vuex'
Vue.use(Vuex) 
export default new Vuex.Store({
    strict: process.env.NODE_ENV !=='production',
    state:{

    },
    mutations:{

    },
    modules:{
        userModule,
    }
})
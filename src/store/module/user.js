import storageService from "../../service/storageService";
import userService from "../../service/userService";
//因为token 和info会被经常调用因此我们将他们设置为全局变量
const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null, 
    },

    mutations: {
        SET_TOKEN(state, token) {
            // 更新本地缓存
            storageService.set(storageService.USER_TOKEN, token);
            // 更新state
            state.token = token;
        },
        SET_USERINFO(state, userInfo) {
            // 更新本地缓存
            storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
            // 更新state
            state.userInfo = userInfo;
        },
    },
    actions: {
        //     register(context, { name, telephone, password }) {
        //         return new Promise((resolve, reject) => {
        //             this.axios //用this.$axios就代表main.js中的Vue.prototype.$axios = axios的axios
        //                 .post("http://localhost:8080/Register", {
        //                     //用post方法传 输入框输入的用户名和密码
        //                     name: this.ruleForm.name,
        //                     password: this.ruleForm.password,
        //                     telephone: this.ruleForm.telephone
        //                 })
        //                 .then(Response => {
        //                     //回调函数当post成功后执行
        //                     if (Response.data.code === 200) {
        //                         //如果后端返回的状态码是200
        //                         //保存token
        //                         context.commit('SET_TOKEN',Response.data.data.token)
        //                         //this.$store.commit('userModule/SET_TOKEN',Response.data.data.token);
        //                         //storageService.set(storageService.USER_TOKEN,Response.data.data.token)
        //                         // alert("注册成功！");
        //                         //保存用户信息 
        //                         userService.info().then((response) => {
        //                             context.commit('SET_USERINFO',response.data.data.user)
        //                             //this.$store.commit('userModule/SET_USERINFO',response.data.data.user);
        //                             //storageService.set(storageService.USER_INFO,JSON.stringify(response.data.data.user))
        //                             resolve(response);
        //                         })

        //                     }
        //                     if (Response.data.code === 422) {
        //                     }
        //                 })
        //                 .catch(function (error) {
        //                     // 请求失败处理
        //                     console.log("ERR:", error);
        //                 });
        //         })
        //     }
        LogOut({ commit }) {
            //清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN, "")
            //清除用户信息
            commit('SET_USERINFO', '')
            storageService.set(storageService.USER_INFO, "")
            
            
        },
    }

}
export default userModule
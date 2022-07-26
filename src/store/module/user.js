import storageService from "../../service/storageService";
//因为token 和info会被经常调用因此我们将他们设置为全局变量
const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: JSON.parse(storageService.get(storageService.USER_INFO)),
    },


mutations: {
    SET_TOKEN(state,token){
        //更新本地缓存
        storageService.set(storageService.USER_TOKEN,token);
        //更新state
        state.token = token;
    },

    SET_USERINFO(state,userInfo){
        //更新本地缓存
        storageService.set(storageService.USER_INFO,JSON.stringify(userInfo));
        //更新state
        state.userInfo = userInfo;
    },
}
}
export default userModule
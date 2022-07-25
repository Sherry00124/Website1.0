import request from '../utils/request'

//用户注册

const register = ({name,telephone,password}) =>{
    return request.post('/Register',{name,telephone,password})
}
//用户登录
const login = ({name,telephone,password}) =>{
    return request.post('/Login',{name,telephone,password})
}


//获取用户信息
const info =() =>{
    return request.get('/info');
}

export default{
    // register,
    info,
    login,
    register,
}
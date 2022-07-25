import request from '../utils/request'

//用户注册
const register = ({name, telephone, password})=>{
    return request.post('auth/Register',{name, telephone, password})
}

export default{
    register,
}
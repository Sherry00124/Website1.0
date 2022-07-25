import request from '../utils/request'

//用户注册
const register = ({name, telephone, password})=>{
    return request.post('http://127.0.0.1:8080/Register',{name, telephone, password})
}

export default{
    register,
}
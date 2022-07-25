import request from '../utils/request'

//用户注册

const register = ({name,telephone,password}) =>{
    return request.post('http://localhost:8080/Register',{name,telephone,password})
}

export default{
    register,
}
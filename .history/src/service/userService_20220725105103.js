import request from '../utils/request'

//用户注册

const register = ({name,telephone,password}) =>{
    return request.post('/Register',{name,telephone,password})
}
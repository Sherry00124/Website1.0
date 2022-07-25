//本地缓存服务

const PREFIX = 'RLP_'

//user 模块

const USER_PREFIX = `${PREFIX}user_`
const USER_TOKEN = `${USER_PREFIX}token`
const USER_INFO = `${USER_PREFIX}info`

//储存
//方便修改代理方法
const set = (key, data) =>{
    localStorage.setItem(key, data);
};


//读取
const get = (key) => localStorage.getItem(key);

export default{
    set,
    get,
    USER_TOKEN,
    USER_INFO,

}
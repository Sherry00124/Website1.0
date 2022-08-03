//本地缓存服务

const PREFIX = 'RLP_'

//user 模块

const USER_PREFIX = `${PREFIX}user_`
const HOST_PREFIX = `${PREFIX}host_`
const USER_TOKEN = `${USER_PREFIX}token`
const USER_INFO = `${USER_PREFIX}info`
const HOST_MUMA = `${HOST_PREFIX}muma`
const HOST_FILENAME = `${HOST_PREFIX}filename`
// const HOST_ADDRESS = `${HOST_PREFIX}address`
// const HOST_EGDEADDRESS = `${HOST_PREFIX}edgeaddress`
// const HOST_STATUS = `${HOST_PREFIX}status`
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
    HOST_MUMA,
    HOST_FILENAME,
    // HOST_ID,
    // HOST_NAME,
    // HOST_ADDRESS,
    // HOST_EGDEADDRESS,
    // HOST_STATUS,



}

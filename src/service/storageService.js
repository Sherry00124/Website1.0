//本地缓存服务

const PREFIX = 'RLP_'

//user 模块

const USER_PREFIX = `${PREFIX}user_`
const USER_TOKEN = `${USER_PREFIX}token`
const USER_INFO = `${USER_PREFIX}info`
const HOST_MUMA = `${HOST_PREFIX}muma`
//Mtarget中文件下載
const FILE_PREFIX = `${PREFIX}file_`
const R_FILEPATH = `${FILE_PREFIX}rfilepath`
const L_FILEPATH = `${FILE_PREFIX}lfilepath`
//HOST中保存表格信息
const HOST_PREFIX = `${PREFIX}form_`
const HOST_ADDRESS = `${HOST_PREFIX}address`
const HOST_EDGEADDRESS = `${HOST_PREFIX}edgeaddress`
const HOST_ID = `${HOST_PREFIX}id`
const HOST_HOSTNAME = `${HOST_PREFIX}hostname`
const HOST_CIDR = `${HOST_PREFIX}cidr`
const HOST_SESSIONID = `${HOST_PREFIX}sessionid`
//control
const Control_JOBID = `${PREFIX}jobid`
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
    R_FILEPATH,
    L_FILEPATH,
    HOST_ID,
    HOST_HOSTNAME,
    HOST_ADDRESS,
    HOST_EDGEADDRESS,
    HOST_CIDR,
    HOST_SESSIONID,
    Control_JOBID,
}

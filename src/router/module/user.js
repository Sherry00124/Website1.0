import Register from '@/views/Register'
import Login from '@/views/Login'
import UserIndex from '@/views/user/UserIndex'
const userRoute = [
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/control/Login',
        redirect: '/Login'
    },
    {
        path: '/home/Login',
        redirect: '/Login'
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register

    },
    {
        path: '/control/UserIndex',
        redirect: '/UserIndex'
    },
    {
        path: '/UserIndex',
        name: 'UserIndex',
        component: UserIndex,
        meta:{
            auth:true,//需要认证的路由
        }

    },
];
export default userRoute
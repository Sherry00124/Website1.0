import Register from '@/views/Register'
import Login from '@/views/Login'

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
    
];
export default userRoute
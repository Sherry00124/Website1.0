import table from '@/views/tool/table.vue'
import Upload from '@/views/tool/upload.vue'

const toolRoute = [
    
    {
        path: '/upload',
        name: 'upload',
        component: Upload,
    },
    // {
    //     path: '/download',
    //     name: 'download',
    //     component: download,
    // },
   
    {
        path: '/table',
        name: 'table',
        component: table,
    }

];
export default toolRoute
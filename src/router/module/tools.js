import CV from '@/views/tool/CV.vue'
import Copy from '@/views/tool/Copy.vue'
import download from '@/views/tool/download.vue';
import catalogue from '@/views/tool/catalogue.vue'
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
        path: '/copy',
        name: 'copy',
        component: Copy, 
    },
    {
        path: '/cv',
        name: 'cv',
        component: CV,
    },
    {
        path: '/catalogue',
        name: 'catalogue',
        component: catalogue,
    },
    {
        path: '/table',
        name: 'table',
        component: table,
    }

];
export default toolRoute
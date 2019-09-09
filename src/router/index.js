import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Main/Home'
import Detail from '@/Main/Detail'
import refresh from '@/Main/refresh'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/Detail',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/refresh',
            name: 'refresh',
            component: refresh
        }
    ]
})
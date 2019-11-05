import Home from './components/Home.vue'
import List from './components/List.vue'

export const routes = [
    {
        path: '/',
        component: Home 
    },
    {
        path: '/calendar-view',
        component: Home
    },
    {
        path: '/list-view',
        component: List
    }
];
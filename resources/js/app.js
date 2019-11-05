require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {routes} from './routes';
import StoreData from './store'
import MainApp from './components/MainApp.vue';
import VModal from 'vue-js-modal'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VModal)

const router = new VueRouter({
    routes,
    mode: 'history'
});

const store = new Vuex.Store(StoreData);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    } 
});

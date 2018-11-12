import Vue from 'vue';
import Router from 'vue-router';
import Main from './modules/main/index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "home" */ './modules/home/index.vue'),
                }
            ]

        },
    ],
});

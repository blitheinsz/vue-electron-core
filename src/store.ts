import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import initAjax from './util/ajax';
import home from './modules/home/store';


Vue.use(Vuex);

/* eslint no-param-reassign: "off" */
export default new Vuex.Store({
    state: { // 全局state
        app: {
            global: {},
            router: {},
            $http: axios,
            $notify: {
                error: (p:any) => {},
                success: (p:any) => {}
            },
            $alert: {},
            $loading: {},
            doInitAjax: initAjax,
            i18n: {},
            lang: 'cn'
        },
    },
    getters: {
    },
    mutations: { // 全局mutations
        setAjax(state) { // 初始化ajax
            state.app.doInitAjax(state.app.$http, state.app);
            // if (state.app.global.OAuth) {
            //     const tokenObj = state.app.global.OAuth.token;
            //     const auth = `${tokenObj.token_type}__${tokenObj.access_token}`;
            //     state.app.$http.defaults.headers.common.Authorization = auth;
            // }
        },
        setPublicComponent(state, payload) { // 保存一些全局通用组件
            state.app.$alert = payload.$alert;
            state.app.$loading = payload.$loading;
            state.app.$notify.error = (obj:any) => {
                payload.$notify.error({ title: obj.title || '提示', message: obj.message, showClose: false, duration: 2500 });
            };
            state.app.$notify.success = (obj:any) => {
                payload.$notify.success({ title: obj.title || '提示', message: obj.message, showClose: false, duration: 2500 });
            };
        },
        setI18N(state, payload) { // 缓存国际化语言包对象实例
            state.app.i18n = payload;
        },
        setRouter(state, payload) { // 缓存对应的路由对象实例
            state.app.router = payload;
        },
        setGlobalData(state, payload) { // 保存异步获取的系统配置数据
            Object.assign(state.app.global, { currentUser: {} }, payload);
        },
    },
    actions: { // 全局actions
        requestGlobalSystemData({ state }) { // 异步获取系统配置数据
            // return state.app.$http.all([
            //     (function () { return state.app.$http.get(SYSTEM_SETTING); }()),
            // ]).then(state.app.$http.spread((sysData) => {
            //     return Object.assign({}, sysData.data);
            // }));
        },
    },
    modules: {
        home,
    },
});

import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import enLocale2 from './lang/en';
import znLocale2 from './lang/cn';
import './util/ement-ui';
import './util/custom-directives';
import './util/custom-filters';
import './assets/styles/postcss/index.css';

Vue.config.productionTip = false;
Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale,
        ...enLocale2
    },
    cn: {
        ...zhLocale,
        ...znLocale2
    }
};
const i18n = new VueI18n({ // 国际化
    locale: 'cn',
    messages
});
ElementLocale.i18n((key:string, value:string) => i18n.t(key, value));

store.commit('setI18N', i18n);
store.commit('setRouter', router);
store.commit('setPublicComponent', Vue.prototype);
store.commit('setAjax'); // 初始化ajax

new Vue({ // 初始化application
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');


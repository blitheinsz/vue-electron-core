import Vue from 'vue';
import helper from './helper';
import mapsFun from './maps';

/** 注册全局过滤器 */

Vue.filter('pick', (value:any, def:string) => {
    if (!value) {
        return def;
    }
    return value;
});
Vue.filter('date', (value:any) => {
    return helper.date(value);
});

Vue.filter('dateMinuteTrend', (value:any) => {
    return helper.dateMinuteTrend(value);
});

Vue.filter('dateMinute', (value:any) => {
    if (!value) { return ''; }
    return helper.dateMinute(value);
});

Vue.filter('map', (value:any, key:string) => {
    if (!value) { return ''; }
    return mapsFun(key, value);
});


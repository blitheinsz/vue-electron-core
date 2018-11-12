import Vue from 'vue';
import mapsFun from './maps';
// import helper from './helper';

// 注册一个全局自定义指令 `v-map`
Vue.directive('map', {
    bind: (el:any, binding:any) => {
        const ele = el;
        const key = binding.value.key;
        const value = binding.value.value;
        ele.innerHTML = mapsFun(key, value);
    }
});

Vue.directive('htmlX', {
    bind: (el:any, binding:any) => {
        const ele = el;
        ele.innerHTML = binding.value || '';
    }
});

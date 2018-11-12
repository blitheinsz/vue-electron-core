import qs from 'qs';
import * as aes from '@/util/aes';
import * as spErrors from './special-errors';

type errorType = {
    [key: string]: (a:any, b?:any)=> void
};

const errors: errorType = {
    401: (app:any, obj:any) => {
        if (obj.errorCode) {
            app.$notify.error({ message: app.i18n.t(`lang.${obj.errorCode}`) });
            setTimeout(() => {
                app.redirectToLogin();
            }, 2000);
        } else {
            app.redirectToLogin();
        }
    },
    403: (app:any) => {
        app.$notify.error({ message: app.i18n.t('lang.1') });
    },
    422: (app:any, obj:any) => {
        let key;
        if (spErrors.specialHasCode(obj.errorCode || '')) {
            // app.router.push(`/home/error-page/${obj.errorCode}`);
        } else if (spErrors.alertHasCode(obj.errorCode || '')) {
            key = 'lang.2';
            if (obj.errorCode) {
                key = `lang.${obj.errorCode}`;
            }
            app.$alert(app.i18n.t(key));
        } else {
            key = 'lang.2';
            if (obj.errorCode) {
                key = `lang.${obj.errorCode}`;
            }
            app.$notify.error({ message: app.i18n.t(key) });
        }
    },
    500: (app:any) => {
        app.$notify.error({ message: app.i18n.t('lang.3') });
    }
};

const handleError = (app:any, status:any, obj:any) => {
    if (!errors[status]) return false;
    errors[status](app, obj);
    return true;
};

const initAjax = (http:any, app:any) => {
    const axios = http; let loading:any = null;
    axios.defaults.baseURL = '/api/v1';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // 请求拦截器
    axios.interceptors.request.use((config:any) => {
        const cfg = config;
        if (cfg.loading) {
            loading = app.$loading({
                lock: true,
                text: app.i18n.t('lang.loading'),
                spinner: 'cusom-icon-loading',
                background: 'rgba(0, 0, 0, 0.2)'
            });
        }
        if (cfg.security && cfg.data) {
            const result: any = {};
            Object.keys(cfg.data).forEach((key) => {
                result[key] = aes.encrypt(cfg.data[key]);
            });
            cfg.data = result;
        }
        if (cfg.method === 'post' || cfg.method === 'put') {
            cfg.data = qs.stringify(cfg.data);
        } else if (cfg.method === 'get') {
            if (cfg.params) {
                cfg.params = Object.assign(cfg.params, { '_=': new Date().getTime() }); // 防止缓存
            } else {
                cfg.params = { '_=': new Date().getTime() };
            }
        }
        return cfg;
    }, (error:any) => {
        if (loading) loading.close();
        return Promise.reject(error);
    });
    // 响应拦截器
    axios.interceptors.response.use((response:any) => {
        const data = response;
        if (loading) loading.close();
        return data;
    }, (error:any) => {
        if (loading) loading.close();
        handleError(app, error.response.status, error.response.data);
        const reject = Promise.reject(error);
        return reject;
    });
};


export { initAjax as default };

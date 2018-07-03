import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import axios from 'axios';
import env from '../build/env';
Vue.use(VueI18n);
Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        let $this=this
        const ajaxUrl = env === 'development || test'
            ? 'http://118.89.190.166:9980'
            : env === 'production'
                ? 'http://123.206.195.237:9980'
                : 'http://118.89.190.166:9980';
        console.log(ajaxUrl)

        let instance = axios.create({
            baseURL: ajaxUrl,
            timeout: 30000
        });
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            $this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', 'Loading')
                    ])
                }
            });
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            $this.$Spin.hide();
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        //util.checkUpdate(this);
        instance.get('login').then(res => {
            
        });
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});

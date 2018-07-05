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
import config from './config'  //api地址
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
        let $this = this
        /**
         * [instance 初始化axios对象]
         * @type {[type]}
         */
        let instance = axios.create({baseURL:config.sysConfig});
        /*
        *
        * 添加请求拦截器，加载之前loading  调用iview loading组件
        * 
        */
        instance.interceptors.request.use(function (config) {
            $this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 28
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
        /*
        *
        * 添加响应拦截器，加载之后loading hide()
        * 
        */
        instance.interceptors.response.use(function (response) {
            $this.$Spin.hide();
            if(response.data.code == 103){
                $this.$store.commit('logout', $this);
                $this.$store.commit('clearOpenedSubmenu');
                $this.$router.push({
                    name: 'login'
                });
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        /*
        *
        * 添加VUE实例属性用来代替axios
        * 
        */
        Vue.prototype.$http = instance
        Vue.http = instance


        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
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

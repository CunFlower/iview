import Cookies from 'js-cookie';
import Vue from 'vue';
/**
 * 登录
 */
const LOGIN = 'LOGIN'
/**
 * 登录成功
 */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
/**
 * 登录失败
 */
const LOGIN_ERROR = 'LOGIN_ERROR'
/**
 * 登录链接
*/
const LOGIN_URL =  '/user/login'

/**
 * 退出登录
 */
const LOGOUT = 'LOGOUT'
/**
 * 退出登录成功
 */
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
/**
 * 退出登录失败
 */
const LOGOUT_ERROR = 'LOGOUT_ERROR'
/**
 * 退出登录链接
*/
const LOGOUT_URL =  '/user/logout'

/**
 * 修改个人资料
 */
const MODIFY_USERINFO = 'MODIFY_USERINFO'
/**
 * 修改个人资料成功
 */
const MODIFY_USERINFO_SUCCESS = 'MODIFY_USERINFO_SUCCESS'
/**
 * 修改个人资料失败
 */
const MODIFY_USERINFO_ERROR = 'MODIFY_USERINFO_ERROR'
/**
 * 修改个人资料链接
*/
const MODIFY_USERINFO_URL =  '/user/modifyInfo'

const user = {
    state: JSON.parse(localStorage.getItem('userInfo')),
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        /**
         * 登录成功
         */
        [LOGIN_SUCCESS](state, data) {
            console.log('LOGIN_SUCCESS', data)
            state['INFO'] = data.data
            localStorage.setItem('userInfo', JSON.stringify(state))
        },
        /**
         * 登录失败
         */
        [LOGIN_ERROR](state, error) {
            console.log('LOGIN_ERROR', error)
        },
        /**
         * 退出登录成功
         */
        [LOGOUT_SUCCESS](state, data) {
            console.log('LOGOUT_SUCCESS', data)
        },
        /**
         * 退出登录失败
         */
        [LOGOUT_ERROR](state, error) {
            console.log('LOGOUT_ERROR', error)
        },
        /**
         * 修改个人资料成功
         */
        [MODIFY_USERINFO_SUCCESS](state, data) {
            console.log('MODIFY_USERINFO_SUCCESS', data)
        },
        /**
         * 修改个人资料失败
         */
        [MODIFY_USERINFO_ERROR](state, error) {
            console.log('MODIFY_USERINFO_ERROR', error)
        }
    },
    actions: {
        /**
         * 登录
         */
        [LOGIN]({
            commit,
            state
        }, params) {
            return new Promise((resolve, reject) => {
                Vue.http.post(LOGIN_URL,params).then((response) => {
                    commit('LOGIN_SUCCESS', response.data)
                    resolve(response.data)
                }, (error) => {
                    commit('LOGIN_ERROR', error)
                    reject()
                })
            })
        },
        /**
         * 退出登录
         */
        [LOGOUT]({
            commit,
            state
        }, params) {
            return new Promise((resolve, reject) => {
                Vue.http.get(LOGOUT_URL).then((response) => {
                    commit('LOGOUT_SUCCESS', response.data)
                    resolve(response.data)
                }, (error) => {
                    commit('LOGOUT_ERROR', error)
                    reject()
                })
            })
        },
        /**
         * 修改个人资料
         */
        [MODIFY_USERINFO]({
            commit,
            state
        }, params) {
            return new Promise((resolve, reject) => {
                Vue.http.post(MODIFY_USERINFO_URL,params).then((response) => {
                    commit('MODIFY_USERINFO_SUCCESS', response.data)
                    resolve(response.data)
                }, (error) => {
                    commit('MODIFY_USERINFO_ERROR', error)
                    reject()
                })
            })
        }
    },
    getters: {
      userInfo: (state) => {
        return state['INFO']
      }
    }
};

export default user;

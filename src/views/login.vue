<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Vue from 'vue';
import md5 from 'js-md5';
import {
  mapActions
} from 'vuex'
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    mounted () {
        
    },
    methods: {
        ...mapActions([ 'LOGIN']),
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.LOGIN({username:this.form.userName,password:md5(this.form.password)}).then((data) => {
                        if(data.code == 200){
                            Vue.http.defaults.headers.common['X-Token'] = data.data.userId+'#'+data.data.token;
                            Cookies.set('user', this.form.userName);
                            Cookies.set('password', this.form.password);
                            if (data.data.demand === 2) {
                                Cookies.set('access', 0);
                            } else {
                                Cookies.set('access', 1);
                            }
                            this.$router.push({
                                name: 'home_index'
                            });
                        }else{
                            this.$Message.error(data.message);
                        }
                    })
                }
            });
        }
    }
};
</script>

<style>

</style>

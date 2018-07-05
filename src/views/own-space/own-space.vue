<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="用户名：" prop="userName">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.userName"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户名：" prop="email">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.email"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户名：" prop="mobile">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.mobile"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户名：" prop="roleName">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.roleName"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户名：" prop="gmtCreate">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.gmtCreate"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户名：" prop="gmtModified">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.gmtModified"></Input>
                        </div>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;">取消</Button>
                        <Button type="primary" style="width: 100px;" @click="save">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name: 'ownspace_index',
    data () {
        return {
            userForm: {
                
            },
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapGetters(['userInfo']),
        ...mapActions([ 'MODIFY_USERINFO']),
        init () {
           this.userForm=this.$store.getters.userInfo
           console.log(this.$store.getters.userInfo)
        },
        save(){
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.MODIFY_USERINFO({
                            userName:this.userForm.userName,
                            name:this.userForm.name,
                            password:this.userForm.password,
                            email:this.userForm.email,
                            mobile:this.userForm.mobile,
                            userId:this.userForm.userId
                        }).then((data) => {
                            if(data.code == 200){
                                this.$Message.success(data.message);
                            }else{
                                this.$Message.error(data.message);
                            }
                    })
                }
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>

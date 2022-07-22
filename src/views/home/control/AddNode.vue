<template>
    <div id="addnode">
        <el-page-header @back="goBack" content="">
        </el-page-header>
        <div style="margin: 20px 0"></div>
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
        >
            <el-form-item label="ip地址" prop="ipaddress" required>
            <el-input type="text" v-model="ruleForm.ipaddress"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username" required>
            <el-input type="text" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" required>
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port" required>
            <el-input v-model.number="ruleForm.port"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="goToWebssh()" plain>连接</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'AddNode',
        data() {
        var checkPort = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("端口不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
                } else {
                if (value < 20) {
                    callback(new Error("必须大于20"));
                } else {
                    callback();
                }
                }
            }, 1000);
            };
            var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
            };
        return {
            ruleForm: {
                pass: "123.com.",
                port: 22,
                ipaddress: "192.168.31.62",
                username: "sherry"
            },
            rules: {
                port: [{ validator: checkPort, trigger: "blur" }]
            }
        };
        },
        methods: {
            goBack(){
                this.$router.push('./Manage')
            },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goToWebssh() {
            var jsonStr = `{"username":"${this.ruleForm.username}", "ipaddress":"${this.ruleForm.ipaddress}", "port":${this.ruleForm.port}, "password":"${this.ruleForm.pass}"}`
            var datMsg = window.btoa(jsonStr)
            this.$router.push({
                path:'/control/webssh',
                name:'WebSSH', 
                params:{
                    msg: 'msg',
                    dataObj: datMsg
                }});
        }
        }
    }
</script>
<template>
  <div class="about">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input v-model.number="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="text">
            <router-link to="/Register">点击注册</router-link>
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<style >
.demo-ruleForm {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 120px auto;
  padding: 50px 50px 30px 50px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
<script>
export default {
  name: 'Login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        password: '111111',
        name: 'z',
      },
      rules: {
        // 校验
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],

        password: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min: 6, message: '密码不小于6位', trigger: 'blur'},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 登录
      this.$refs[formName].validate((valid) => {
          if (valid) {
          //请求
          this.axios //用this.$axios就代表main.js中的Vue.prototype.$axios = axios的axios
            .post("http://localhost:8080/Login", {
              //用post方法传 输入框输入的用户名和密码
              name: this.ruleForm.name,
              password: this.ruleForm.password,
              // telephone: this.ruleForm.telephone
            })
            .then(Response => {
              //回调函数当post成功后执行
              if (Response.data.code === 200) {
                //如果后端返回的状态码是200
                //保存token
                //localStorage.setItem("token", Response.data.data.token);
                storageService.set(storageService.USER_TOKEN,Response.data.data.token)
                // alert("注册成功！");
                //保存用户信息
                userService.info().then((reponse) => {
                  storageService.set(storageService.USER_INFO,JSON.stringify(reponse.data.data.user))
                  console.log(JSON.stringify(reponse.data.data.user))
                  this.$router.push({
                  path: "/Home"
                });
                })
                //跳转主页
                
              }
              if (Response.data.code === 422) {
              }
            })
            .catch(function(error) {
              // 请求失败处理
              console.log("ERR:", error);
            });
        } else {
          console.log("用户名&密码不匹配");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

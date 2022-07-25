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

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
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
        pass: '',
        name: '',
      },
      rules: {
        // 校验
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],

        pass: [
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
          alert('submit!');
          sessionStorage.setItem('username', name); // 缓存
          this.$router.push({
            name: 'Home',
            // params: {id: this.ruleForm.name},
          }); // 跳转到主页
        } else {
          console.log('用户名&密码不匹配');
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

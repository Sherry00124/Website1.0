<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm-1"
    >
      <h2 class="register-title">欢迎注册</h2>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="ruleForm.telephone"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style >
.demo-ruleForm-1 {
  border: 1px solid #dcdfe6;
  width: 400px;
  margin: 120px auto;
  padding: 100px 100px 60px 100px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.register-title {
  text-align: center;
  margin: 0 auto 60px auto;
  color: #303133;
}
</style>
<script>
import storageService from "../service/storageService";
import userService from "../service/userService";
export default {
  data() {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
  

    return {
      ruleForm: {
        password: "111111",
        checkPass: "111111",
        telephone: "13111111111",
        name: "z"
      },
      rules: {
        //校验
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        telephone: [
          //{ required: true, min: 11, max: 11, trigger: "blur" ,message: "请输入合法手机号",validator:telephoneVaildator},
          {
            required: true,
            min: 11,
            max: 11,
            message: "手机号为11位",
            trigger: "blur"
          },
          {
            pattern: /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/,
            message: "输入的手机号码格式不正确，请重新输入",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, message: "密码不小于6位", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // register(){
    //   console.log('register')
    // },
    submitForm(formName) {
      //验证数据
      this.$refs[formName].validate(valid => {
        if (valid) {
          //请求
          userService.register("http://localhost:8080/Register", {
              //用post方法传 输入框输入的用户名和密码
              name: this.ruleForm.name,
              password: this.ruleForm.password,
              telephone: this.ruleForm.telephone
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
    }
  }
};
</script>
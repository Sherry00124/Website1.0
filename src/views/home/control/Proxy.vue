<template>
  <div class="proxy">

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-Proxy"
    >
    <!-- <h3 class="login-title">欢迎登录</h3> -->
    
    <el-form-item label="代理协议" prop="agreement">
    <el-select v-model.number="ruleForm.agreement" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <div style="margin: 20px 0"></div>
      <el-form-item label="代理服务器" prop="ip">
        <el-input v-model.number="ruleForm.ip"></el-input>
      </el-form-item>

      <el-form-item label="代理端口" prop="port" >
        <el-input
          v-model="ruleForm.port"
        ></el-input>
      </el-form-item>
      <el-row>

      
      <el-form-item>
        
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<style >
  .demo-Proxy{
    border:1px solid #DCDFE6;
    width: 350px;
    margin:60px auto;
    padding: 100px 100px 50px 100px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    
  }
  .login-title{
    text-align:center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
<script>
export default {
  name: "Proxy",
  data() {

    return {
      ruleForm: {
        ip: "",
        port: "",
      },
        options: [{
          value: '选项1',
          label: '直接连接'
        }, {
          value: '选项2',
          label: 'Http'
        }, {
          value: '选项3',
          label: 'Https'
        }, {
          value: '选项4',
          label: 'Socket4'
        }, {
          value: '选项5',
          label: 'Socket5'
        }],
        value: '',
      
      rules: {
        //校验
        ip: [{ required: true, trigger: "blur" }],

        port: [
          { required: true, trigger: "blur" },
          
        ],
        agreement:[{required: true}],
      },
    };
  },
  methods: {
      submitForm(formName) {
      //登录
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("添加代理成功");
        } else {
          console.log("出错了");
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
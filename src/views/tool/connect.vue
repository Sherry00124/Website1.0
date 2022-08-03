<template>
  <div class="upload">
    <el-col :span="20">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="upload">
      <el-form-item label="Ip:Port" prop="rIpPort">
        <el-input placeholder="请输入ip:port如：127.0.0.1:9876" v-model="ruleForm.rIpPort" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="Upload">连接</el-button>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        rIpPort: "127.0.0.1:9876",

      }
    };
  },
  methods: {
    Upload() {
      let rIpPort = this.ruleForm.rIpPort;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/connect" +
          "?rIpPort=" +
          rIpPort 
          
      ).then(res => {
        console.log('res.data: ', res.data);
      })
    }
  }
};
</script>
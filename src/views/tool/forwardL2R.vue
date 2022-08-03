<template>
  <div class="upload">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="upload">
      <el-form-item label="请输入本地ip:port" prop="lIpPort">
        <el-input placeholder="请输入本地ip:port如：127.0.0.1.998" v-model="ruleForm.lIpPort" clearable></el-input>
      </el-form-item>
      <el-form-item label="请输入远程ip:port" prop="rIpPort">
        <el-input placeholder="请输入远程ip:port如：127.0.0.1:9876" v-model="ruleForm.rIpPort" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="Upload">forwardL2R</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        lIpPort: "127.0.0.1.998",
        rIpPort: "127.0.0.1:9876"
      }
    };
  },
  methods: {
    Upload() {
      let lIpPort = this.ruleForm.lIpPort;
      let rIpPort = this.ruleForm.rIpPort;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/1/upload" +
          "?lIpPort=" +
          lIpPort +
          "&rIpPort=" +
          rIpPort
      ).then(res => {
        console.log('res.data: ', res.data);
      })
    }
  }
};
</script>
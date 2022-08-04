<template>
  <div class="upload">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="forward">
      <el-form-item label="本地ip:port" prop="lIpPort_rl">
        <el-input placeholder="本地ip:port如：127.0.0.1.998" v-model="ruleForm.lIpPort_rl" clearable></el-input>
      </el-form-item>
      <el-form-item label="远程ip:port" prop="rIpPort_rl">
        <el-input placeholder="远程ip:port如：127.0.0.1:9876" v-model="ruleForm.rIpPort_rl" clearable></el-input>
      </el-form-item>
    
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="forwardL2R">forwardL2R</el-button>
 <div style="margin: 20px 0"></div>
      <el-form-item label="本地ip:port" prop="lIpPort_lr">
        <el-input placeholder="请输入本地ip:port如：127.0.0.1.998" v-model="ruleForm.lIpPort_lr" clearable></el-input>
      </el-form-item>
      <el-form-item label="远程ip:port" prop="rIpPort_lr">
        <el-input placeholder="远程ip:port如：127.0.0.1:9876" v-model="ruleForm.rIpPort_lr" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="forwardL2R">forwardL2R</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        lIpPort_lr: "127.0.0.1:998",
        rIpPort_lr: "127.0.0.1:9876",
        lIpPort_rl: "127.0.0.1:998",
        rIpPort_rl: "127.0.0.1:9876",
      }
    };
  },
  methods: {
    forwardL2R() {
        let id = this.$route.params.id
      let lIpPort = this.ruleForm.lIpPort_lr;
      let rIpPort = this.ruleForm.rIpPort_lr;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/" + id + "/forwardL2R" +
          "?lIpPort=" +
          lIpPort +
          "&rIpPort=" +
          rIpPort
      ).then(res => {
        console.log('res.data: ', res.data);
      })
    },
    forwardR2L() {
      let id = this.$route.params.id
      let lIpPort = this.ruleForm.lIpPort_rl;
      let rIpPort = this.ruleForm.rIpPort_rl;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/" + id + "/forwardR2L" +
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
<template>
  <div class="upload">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="upload">
      <el-form-item label="Ip:Port" prop="rIpPort">
        <el-input placeholder="请输入ip:port如：127.0.0.1:9876" v-model="ruleForm.rIpPort" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="Upload">rconnect</el-button>
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
      let id = this.$route.params.id
      let rIpPort = this.ruleForm.rIpPort;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/" + id + "/rconnect" +
          "?rIpPort=" +
          rIpPort 
          
      ).then(res => {
        console.log('res.data: ', res.data);
      })
    }
  }
};
</script>
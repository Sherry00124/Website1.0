<template>
  <div class="upload">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="upload">
      <el-form-item label="cmd" prop="cmd">
        <el-input placeholder="请输入command如：whoami" v-model="ruleForm.cmd" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="Command">command</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        cmd: "whoami",

      }
    };
  },
  methods: {
    Command() {
      let cmd = this.ruleForm.cmd;
      let id = this.$route.params.id
      this.axios.post(
        "http://47.242.238.155:9996/sessions/" + id + "/command" +
          "?cmd=" +
          cmd 
          
      ).then(res => {
        console.log('res.data: ', res.data);
      })
    }
  }
};
</script>
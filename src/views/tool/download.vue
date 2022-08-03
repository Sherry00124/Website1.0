<template>
  <div class="upload">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="upload">
      <el-form-item label="请输入本地文件路径" prop="lfilepath">
        <el-input placeholder="请输入路径如：/tmp/bind" v-model="ruleForm.lfilepath" clearable></el-input>
      </el-form-item>
      <el-form-item label="请输入下载文件路径" prop="rfilepath">
        <el-input placeholder="请输入路径如：/tmp/bind" v-model="ruleForm.rfilepath" clearable></el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0"></div>
    <el-button size="small" type="primary" @click="Upload">点击下载</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        lfilepath: "/tmp/1",
        rfilepath: "/tmp/1"
      }
    };
  },
  methods: {
    Upload() {
      let id = this.$route.params.id
      let lfilepath = this.ruleForm.lfilepath;
      let rfilepath = this.ruleForm.rfilepath;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/" + id +"/download" +
          "?lfilepath=" +
          lfilepath +
          "&rfilepath=" +
          rfilepath
      ).then(res => {
        console.log('res.data: ', res.data);
        this.$message(res.data)
      })
    }
  }
};
</script>
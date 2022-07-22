<template>
  <div id="scan">
    <el-form
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm-scan"
    >
      <el-form-item label="IP" prop="ip">
        <el-input
          size="large"
          placeholder="请输入IP"
          v-model="inputIP"
          prop="ip"
        >
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>
      <div style="margin: 20px 0"></div>
      <el-form-item label="Port" prop="port">
        <el-input
          maxlength="4"
          show-word-limit
          placeholder="请输入端口号"
          v-model="inputPort"
          clearable
        >
        </el-input>
      </el-form-item>
      <div style="margin: 20px 0"></div>
      <el-form-item label="POC" prop="poc">
        <el-select v-model="value" placeholder="请选择POC">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="table" prop="table">
        <el-input placeholder="请输入任务名称" v-model="inputTable" clearable>
        </el-input>
      </el-form-item>
      <div style="margin: 20px 0"></div>

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="fileList"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-row>
          <el-button type="primary"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>

          <el-button type="primary" @click="drawer = true"
            >扫描<i class="el-icon-aim el-icon--right"></i
          ></el-button>
        </el-row>
      </el-upload>
      <el-drawer title="Scan" :visible.sync="drawer" :with-header="false">
        <span>正在扫描</span>
      </el-drawer>
    </el-form>
  </div>
</template>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.demo-ruleForm-scan {
  border: 1px solid #dcdfe6;
  width: 500px;
  margin: 50px auto;
  padding: 50px 250px 60px 150px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  /* box-shadow: 0 0 25px #909399; */
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
<script>
export default {
  name: "scan",
  //   beforeRouteLeave:()
  data() {
    return {
      inputIP: "",
      inputPort: "",
      inputTable: "",
      select: "",
      options: [
        {
          value: "选项1",
          label: "POC1",
        },
        {
          value: "选项2",
          label: "POC2",
          disabled: true,
        },
        {
          value: "选项3",
          label: "POC3",
        },
        {
          value: "选项4",
          label: "POC4",
        },
        {
          value: "选项5",
          label: "POC5",
        },
      ],
      value: "",
      fileList: [],
      rules: {
        //校验
        ip: [{ required: true }],
        port: [{ required: true }],
        table: [{ required: true }],
      },
      drawer: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

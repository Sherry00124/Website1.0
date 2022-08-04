<template>
  <div class="upload">
    <el-col :span="20">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="upload">
      <!-- <el-form-item label="本地路径" prop="lfilepath">
        <el-input placeholder="请输入路径如：/tmp/bind" v-model="ruleForm.lfilepath" clearable></el-input>
      </el-form-item> -->
      
      <el-form-item label="目标路径" prop="rfilepath">
        <el-input placeholder="请输入路径如：/tmp/bind" v-model="ruleForm.rfilepath" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-remove="handleRemove"
  :on-change="handleChange"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger"  type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;"  type="success" @click="Upload">点击上传</el-button>
</el-upload>
    <div style="margin: 20px 0"></div>
    </el-col>
  </div>
</template>
<script>
import storageService from '../../service/storageService';
export default {
  data() {
    return {
      ruleForm: {
        lfilepath: "",
        rfilepath: storageService.get(storageService.R_FILEPATH),
      },
      fileList:[],
    };
  },
  methods: {
    Upload() {
      let id = this.$route.params.id
      let lfilepath = storageService.get(storageService.UPLOAD_FILENME);
      console.log('lfilepath: ', lfilepath);
      let rfilepath = this.ruleForm.rfilepath;
      this.axios.post(
        "http://47.242.238.155:9996/sessions/" + id +"/upload" +
          "?lfilepath=" +
          lfilepath +
          "&rfilepath=" +
          rfilepath
      ).then(res => {
        console.log('res.data: ', res.data);
        this.$refs.upload.submit();
        this.$message(res.data)
      })
    },
    handleChange(file, fileLists) {
			// console.log("file",file);
      // this.fileList ={ name:file.name};
      storageService.set(storageService.UPLOAD_FILENME,document.getElementsByClassName("el-upload__input")[0].value); 
			// 本地电脑路径
			console.log("本地电脑路径",document.getElementsByClassName("el-upload__input")[0].value); 
		},
    handleRemove(file, fileList) {
      this.$message.warning(file.name + "已被移除")
        
      },

  }
};
</script>
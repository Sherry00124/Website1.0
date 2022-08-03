<template>
  <el-upload
    class="upload-demo"
    action="http://127.0.0.1:8080/upload"
    :on-success="handleAvatarSuccess"
    name="file"
    :on-change="handleChange"
    :file-list="fileList"
  >
    <div style="margin: 100px 0"></div>
    <el-button size="small" type="primary">点击上传</el-button>
    <el-button size="small" type="primary">点击下载</el-button>
  </el-upload>
</template>
<script>
    export default{
        name : 'UpLoad',
        methods:{
            handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        //console.log(res)
			this.$message.success(res.msg)
      console.log('res.msg: ', res.msg);
      console.log('res.msg.Filename: ', res.msg.Filename);
      console.log('Size: ', res.Size);
      console.log('msg.Header.Content-Type: ', res.msg.Header.Content-Type);
      },
    
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
        }
        
    }
</script>
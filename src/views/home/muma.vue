<template>
<div id="muma">
    
    <el-breadcrumb separator="/">
    
  <el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-arrow-left"></i> 首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">木马生成</a></el-breadcrumb-item>
</el-breadcrumb>
    
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="muma">
      <el-form-item label="木马类型" prop="type">
        <el-select v-model="value" clearable placeholder="请选择" @change="selectLetterClick">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件夹路径" prop="outfile">
        <el-input placeholder="请输入路径如：/tmp/bind" v-model="ruleForm.outfile" clearable></el-input>
      </el-form-item>
      <el-form-item label="Ip:Port" prop="ipPort">
        <el-input placeholder="请输入ip/port如：127.0.0.1:999" v-model="ruleForm.ipPort" clearable></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input placeholder="请输入域名如：www.abcd.com:443" v-model="ruleForm.domain" clearable></el-input>
      </el-form-item>
      <div style="margin: 20px 0"></div>
      <el-button type="danger" round @click="generate()"  >生成木马</el-button>
    </el-form>
  </div>
</template>

<script>
import storageService from "../../service/storageService";
export default {
  data() {
    return {
      ruleForm: {
        outfile: "/tmp/bind",
        ipPort: "127.0.0.1:999",
        domain: "www.abcd.com:443"
      },
      
      options: [
        {
          value: "2",
          label: "bind.exe._strip"
        },
        {
          value: "3",
          label: "go-strip_mac"
        },
        {
          value: "4",
          label: "linux_bind64"
        },
        {
          value: "5",
          label: "linux_bind64_strip"
        },
        {
          value: "6",
          label: "linux_reverseX64"
        },
        {
          value: "7",
          label: "linux_reverseX64"
        },
        {
          value: "8",
          label: "linux_reverseX64_strip"
        },
        {
          value: "9",
          label: "linux_reverse_armX64_strip"
        },
        {
          value: "10",
          label: "reverse.exe"
        },
        {
          value: "11",
          label: "reverse.exe.strip"
        },
        {
          value: "12",
          label: "reverse64.exe"
        },
        {
          value: "13",
          label: "reverse64.exe.strip"
        },
        {
          value: "14",
          label: "reverseUpdating"
        }
      ],
      value: "",
      input: ""
    };
  },
  created() {},
  methods: {
    generate() {
      let type = storageService.get(storageService.HOST_MUMA);
      console.log("type: ", type);
      let outfile = this.ruleForm.outfile;
      let ipPort = this.ruleForm.ipPort;
      let domain = this.ruleForm.domain;
      this.axios
        .post(
          "http://47.242.238.155:9996/generate" +
            "?type=" +
            type +
            "&outfile=" +
            outfile +
            "&ipPort=" +
            ipPort +
            "&domain=" +
            domain
        )
        .then(res => {
          console.log("rea.data: ", res.data);
          this.$message.success("生成成功")
        })
        .catch(function(err) {
          this.$message.success(err)
          console.log("err: ", err);
        });
      // storageService.set(storageService.HOST_MUMA,"");
    },
    selectLetterClick(e) {
      //   console.log('this.options[e].value: ', this.options[e - 1].label);
      let label = this.options[e - 1].label;
      storageService.set(storageService.HOST_MUMA, label);
      
    }
  }
};
</script>

<style>
.muma {
  border: 1px solid #dcdfe6;
  width: 550px;
  margin: 60px auto;
  padding: 80px 150px 80px 150px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;

}

</style>
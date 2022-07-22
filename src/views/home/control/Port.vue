<template>
  <div class="port">
    <el-row :gutter="10">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-form
            :model="ruleForm1"
            status-icon
            ref="ruleForm1"
            label-width="100px"
            class="demo-port"
            
          >
            <h3 class="port-title">转发远程端口</h3>
            <el-form-item label="本地" prop="local1">
              <el-input v-model.number="ruleForm1.local1"></el-input>
            </el-form-item>
            <el-form-item label="靶机" prop="remote1">
              <el-input v-model.number="ruleForm1.remote1"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm1('ruleForm1')"
                >转发</el-button
              >
            </el-form-item>
          </el-form>
          <el-table :data="tableData1" style="width: 100%" max-height="200">
            <el-table-column fixed prop="local1" label="本地" width="205">
            </el-table-column>
            <el-table-column prop="remote1" label="转发" width="205">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData1)"
                  type="text"
                  size="small"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >

      <el-col :span="12"
        ><div class="grid-content bg-purple-light">
          <el-form
            :model="ruleForm"
            status-icon
            ref="ruleForm"
            label-width="100px"
            class="demo-port"
          >
            <h3 class="port-title">映射本地端口</h3>
            <el-form-item label="本地" prop="local">
              <el-input v-model.number="ruleForm.local"></el-input>
            </el-form-item>
            <el-form-item label="靶机" prop="remote">
              <el-input v-model.number="ruleForm.remote"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm2('ruleForm')"
                >映射</el-button
              >
            </el-form-item>
          </el-form>
          <el-table :data="tableData2" style="width: 100%" max-height="200">
            <el-table-column fixed prop="local2" label="本地" width="205">
            </el-table-column>
            <el-table-column prop="remote2" label="映射" width="205">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData2)"
                  type="text"
                  size="small"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div></el-col
      >
    </el-row>

    <!-- 
    
    
 -->
  </div>
</template>
<style >
.demo-port {
  border: 1px solid #ccccff;
  width: 350px;
  margin: 0px auto;
  padding: 40px 100px 20px 40px;
  /* 上，右，下，左*/
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.port-title {
  text-align: center;
  margin: 0 auto 20px auto;
  color: #303133;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 480px;
}
</style>
<script>
export default {
  name: "Port",
  data() {
    return {
      ruleForm1: {
        locol1: "",
        remote1: "",
      },
      ruleForm: {
        locol: "",
        remote: "",
      },
      tableData1: [
        {
          local1: "192.168.1.23:8080",
          remote1: "127.0.0.1:8080",
        },
        {
          local1: "192.168.1.23:8080",
          remote1: "127.0.0.1:8080",
        },
      ],
      tableData2: [
        {
          local2: "192.168.1.23:8080",
          remote2: "127.0.0.1:8080",
        },
        {
          local2: "192.168.1.23:8080",
          remote2: "127.0.0.1:8080",
        },
        {
          local2: "192.168.1.23:8080",
          remote2: "127.0.0.1:8080",
        },
      ],
    };
  },
  methods: {
    submitForm1(formName1) {
      //登录
      this.$refs[formName1].validate((valid) => {
        if (valid) {
          alert("提交转发成功！");
          //   sessionStorage.setItem("username", name); //缓存
          //   this.$router.push("./Home"); //跳转到主页
        } else {
          console.log("出错了！");
          return false;
        }
      });
    },
    submitForm2(formName) {
      //登录
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交映射成功！");
          //   sessionStorage.setItem("username", name); //缓存
          //   this.$router.push("./Home"); //跳转到主页
        } else {
          console.log("出错了！");
          return false;
        }
      });
    },
    resetForm(formName1) {
      this.$refs[formName1].resetFields();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
};
</script>
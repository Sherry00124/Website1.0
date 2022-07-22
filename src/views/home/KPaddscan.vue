<template>
  <div class="about">
    <el-row :gutter="10">
  <el-col :span="12" ><div class="grid-content bg-purple">
<h4 class="login-title">新建扫描</h4>
<el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      
      <el-form-item label="IP/Domain" prop="ip">
        <el-input
          type="textarea"
          autosize
          v-model.number="ruleForm.ip"
        ><i class="header-icon el-icon-info"></i></el-input>
      </el-form-item>

      <el-form-item label="Port" prop="port"> 
        <el-input type="textarea" autosize v-model="ruleForm.port"></el-input>
        
      </el-form-item>
      <el-form-item label="任务名" prop="name"> 
        <el-input  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <div style="margin: 60px 0"></div>
      <el-row>
        <el-button @click="open1" type="text" >开始扫描</el-button>
        <el-button  type="text" >查看结果</el-button>
      </el-row>
    </el-form>
  </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
    <h4 class="login-title">结果展示</h4>
    <!-- <ScanResult /> -->
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    max-height="250"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
    prop="ip"
      label="ip"
      width="150">
    </el-table-column>
    <el-table-column
      prop="port"
      label="port"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>

    <el-button >结果导出</el-button>
  </div>
  </div></el-col>

</el-row>
    
  </div>
</template>
<style >
.demo-ruleForm {
  /* border: 2px solid #2a3756; */
  width: 400px;
  margin: 0px auto;
  padding: 80px 100px 50px 80px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.login-title {
  text-align: center;
  margin: 0 auto 20px auto;
  color: #6c53af;
}
.el-col {
    border-radius: 4px;
  }
  /* .bg-purple-dark {
    background: #99a9bf;
  } */
  /* .bg-purple {
    background: #d3dce6;
  } */
  /* .bg-purple-light {
    background: #e5e9f2;
  } */
  .grid-content {
    border-radius: 4px;
    min-height: 450px;
  }
</style>
<script>

export default {
  name: "Login",
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
  data() {
    return {
      ruleForm: {
        ip: "",
        port: "",
        name: "",
      },
      rules: {
        //校验
        ip: [{ required: true, message: "ip不能为空", trigger: "blur" }],
        port: [{ required: true, message: "端口不能为空", trigger: "blur" }],
        name: [{ required: true, message: "请输入任务名", trigger: "blur" }],
      },
      tableData: [{
          ip: '2016-05-03',
          port: '王小虎',
          status: '上海市普陀区金沙江路 1518 弄'
        },
        ],
        multipleSelection: []
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open1() {
        this.$notify({
          title: '成功',
          message: '正在扫描中',
          type: 'success'
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
};
</script>
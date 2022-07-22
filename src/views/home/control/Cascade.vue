<template>
  <div class="about">

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-cascade"
    >
      <el-form-item label="目标" :prop="target">
        <el-input v-model.number="ruleForm.target"></el-input>
      </el-form-item>
      <el-row>
      <el-form-item>
        
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确认</el-button>
        <el-button type="primary" >取消</el-button>
      </el-form-item>
      </el-row>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<style >
  .demo-cascade{
    border:1px solid #DCDFE6;
    width: 350px;
    margin:60px auto;
    padding: 50px 50px 30px 50px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
  }

</style>
<script>
export default {
  name: "Cascade",
  data() {
    return {
      ruleForm: {
        target: "",
    
      },
      rules: {
        //校验
        target: [{ required: true, message: "请输入目标", trigger: "blur" }],

      },
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, ]
    };
  },
  methods: {
    submitForm(formName) {
      //登录
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交成功!");
        } else {
          console.log("出错了！");
          return false;
        }
      });
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
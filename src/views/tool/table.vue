<template>
  <el-table :data="tableData" height="250" border style="width: 100%">
    <el-table-column prop="fileName" label="文件名" width="180"></el-table-column>
    <el-table-column prop="fileSize" label="大小" width="180"></el-table-column>
    <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios
        .get("https://1e666873-df02-4da6-a9ba-92350cb1b27c.mock.pstmn.io/address")
        .then(res => {
        let j = 0;
        let DataList = [];
          for (let i = 0; i < 34; i++) {
            var isDir = res.data[i].contentInfo.isDir;
            if (!isDir) {
                
                 DataList[j] = {
                                fileName:res.data[i].contentInfo.fileName,
                                fileSize:res.data[i].contentInfo.fileSize,
                                modifyTime:res.data[i].contentInfo.modifyTime
                                };
                 j++;
            
            }
          }
          this.tableData = DataList;
        });
    }
  }
};
</script>
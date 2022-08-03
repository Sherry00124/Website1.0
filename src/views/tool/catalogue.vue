<template>
  <el-tree
    :data="treeData"
    highlight-current
    :props="defaultProps"
    node-key="id"
    @node-click="handleNodeClick"
  >
    <span slot-scope="{ node }">
      <i class="el-icon-folder"></i>
      <span style="margin-left: 10px">{{ node.label}}</span>
    </span>
  </el-tree>
</template>
<script>
export default {
  data() {
    return {
      //el-tree树形菜单
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.loadNode();
  },
  methods: {
    loadNode() {
      this.axios
        .post(
          "https://1e666873-df02-4da6-a9ba-92350cb1b27c.mock.pstmn.io/address"
        )
        .then(response => {
          let num = 0;
          let newList = []; //定义一个新数组用来存放遍历的数据
          let n = 0;
          for (n in response.data) {
            n++;
          }
          console.log("n: ", n);
          for (let i = 1; i < n; i++) {
            //console.log('response.data[].contentInfo.isDir',response.data[i].contentInfo.isDir);
            var isDir = response.data[i].contentInfo.isDir;
            if (isDir) {
              // console.log('this.name: ', this.label);
              newList[num] = {
                label: response.data[i].contentInfo.fileName,
                id: num
              };
              num++;
            }
            //else return resolve([])
          }
          this.treeData = newList;
          console.log("newList: ", newList);
          console.log("this.treeData: ", this.treeData);
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
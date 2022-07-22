<template>
  <div id="Mtarget">
    <el-row :gutter="20">
      <el-col :span="7"
        ><div class="grid-content bg-purple">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange"
          >
          </el-tree>
          <div class="line"></div>
        </div>
      </el-col>
      <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          <el-table :data="tableData1" style="width: 100%" height="340">
            <el-table-column prop="filename" label="文件名" width="200">
            </el-table-column>
            <el-table-column prop="date" label="修改时间" width="180">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="180">
            </el-table-column>
            <el-table-column prop="size" label="大小" width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div style="margin: 10px 0"></div>
    <el-row :gutter="20">
      <el-col :span="7"
        ><div class="grid-content bg-purple">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            ><div style="margin: 100px 0"></div>
            <el-button size="small" type="primary">点击上传</el-button>
            <el-button size="small" type="primary">点击下载</el-button>
          </el-upload>
        </div></el-col
      >
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <el-table :data="tableData2" style="width: 100%" height="130">
            <el-table-column prop="operate" label="上传/下载" width="120">
            </el-table-column>
            <el-table-column prop="filename2" label="文件名" width="200">
            </el-table-column>
            <el-table-column prop="size2" label="大小" width="120">
            </el-table-column>
            <el-table-column prop="date2" label="时间" width="150">
            </el-table-column>
            <el-table-column
              prop="tag"
              label="状态"
              width="100"
              :filters="[
                { text: '成功', value: '成功' },
                { text: '失败', value: '失败' },
              ]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '失败' ? 'danger' : 'success'"
                  disable-transitions
                  >{{ scope.row.tag }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
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
  </div>
</template>
<script>
export default {
  name: "Manage",

  data() {
    return {
      tabPosition: "right",
      tableData1: [
        {
          date: "",
          filename: "",
          type: "",
          size: "",
        },
        {
          date: "",
          filename: "",
          type: "",
          size: "",
        },
        {
          date: "",
          filename: "",
          type: "",
          size: "",
        },
      ],
      tableData2: [
        {
          date2: "2016-05-02",
          filename2: "111",
          tag: "失败",
          size2: "11",
          operate: "",
        },
        {
          date2: "2016-05-02",
          filename2: "111",
          tag: "失败",
          size2: "11",
          operate: "",
        },
      ],
      props: {
        label: "name",
        children: "zones",
      },
      count: 1,
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++,
            },
            {
              name: "zone" + this.count++,
            },
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
  },
};
</script>
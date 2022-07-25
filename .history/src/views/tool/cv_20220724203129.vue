<template>
  <div style="margin-right: auto;margin-left: auto; 800px">
    <el-table :data="list">
        <el-table-column label="搜索引擎" prop="name"></el-table-column>
      <el-table-column label="链接" prop="url"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="copyLink(scope.row)" class="tag">复制链接</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "ClipboardTest",
  data() {
    return {
      list: [
        { name: "百度", url: "https://www.baidu.com/" },
        { name: "谷歌", url: "https://www.google.com.hk/" },
        { name: "360搜索", url: "https://www.so.com/" }
      ]
    };
  },
  methods: {
    copyLink(data) {
      console.log(1);
      let clipboard = new Clipboard(".tag", {
        text: function() {
          return data.url;
        }
      });
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          showClose: true,
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message({ message: "复制失败,", showClose: true, type: "error" });
        clipboard.destroy();
      });
    }
  }
};
</script>

<style scoped>
</style>
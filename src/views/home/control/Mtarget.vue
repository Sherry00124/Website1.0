<template>
  <div id="Mtarget">
    <el-breadcrumb separator="/">
    <!-- <el-page-header  content="详细信息"></el-page-header> -->
      <el-breadcrumb-item>编号：{{this.$route.params.id}}</el-breadcrumb-item>
      <el-breadcrumb-item>主机名：{{this.$route.params.hostName}}</el-breadcrumb-item>
      <el-breadcrumb-item>Address：{{this.$route.params.address}}</el-breadcrumb-item>
      <el-breadcrumb-item>edgeAddress：{{this.$route.params.edgeAddress}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10">
      <el-col :span="8" @contextmenu.prevent.native="openMenu($event)">
        <h1>文件夹列表</h1>
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="50px">
          <el-row>
            <el-form-item label="路径" prop="path">
              <el-col :span="18">
                <el-input v-model="ruleForm.path" autocomplete="off"></el-input>
              </el-col>
              <el-tooltip class="item" effect="dark" content="上一级目录" placement="bottom">
                <el-button icon="el-icon-back" size="mini" circle @click="goBack()"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="进入" placement="bottom">
                <el-button icon="el-icon-right" size="mini" circle @click="getData();loadNode()"></el-button>
              </el-tooltip>
            </el-form-item>
          </el-row>
        </el-form>
        <div class="dir-tree">
          <el-scrollbar style="height:100%">
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
          </el-scrollbar>

          <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li>
              <el-button
                type="text"
                icon="el-icon-document-copy"
                v-clipboard:copy="ruleForm.path"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >复制文件夹路径</el-button>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="16" @contextmenu.prevent.native="openMenu1($event)">
        <el-col>
          <h1>文件列表</h1>
        </el-col>

        <el-table
          :data="tableData1"
          style="width: 100%"
          height="420"
          highlight-current-row
          @row-contextmenu="getRemoteFilePath"
        >
          <el-table-column prop="fileName" label="文件名" width="300">
            <template slot-scope="scope">
              <i class="el-icon-document"></i>
              <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="大小" width="120"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" width="250"></el-table-column>
        </el-table>
        <ul v-show="visible1" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
          <li>
            <el-button type="text" icon="el-icon-upload2" @click="dialog = true">文件上传</el-button>
          </li>
          <li>
            <el-upload :auto-upload="false" :on-change="getLocalFilePath" action>
              <el-button type="text" icon="el-icon-upload2">文件下载</el-button>
            </el-upload>
          </li>
        </ul>
      </el-col>
    </el-row>

    <el-drawer
      title="请填写上传信息"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <uploadVue />
        <!-- <div class="demo-drawer__footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>-->
      </div>
    </el-drawer>
  </div>
</template>
<style>
.bottom {
  clear: both;
  text-align: center;
}

.item {
  margin: 4px;
}
.dir-tree {
  width: 390px;
  height: 360px;
}

.el-tree {
  min-width: 100%;
  display: inline-block !important;
}

.contextmenu {
  margin: 0;
  background: rgb(255, 255, 255);
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(142, 110, 245, 0.3);
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: rgba(204, 226, 244, 0.708);
}
.grid-content {
  border-radius: 4px;
  min-height: 250px;
}
.TextWithoutUnderline {
  text-decoration: none;
  color: rgb(46, 180, 243);
}
</style>
<script>
import uploadVue from "@/views/tool/upload.vue";
import storageService from "../../../service/storageService";
export default {
  name: "Manage",

  data() {
    return {
      dialog: false,
      loading: false,
      ruleForm: {
        path: "/"
      },
      tabPosition: "right",
      tableData1: [],
      // tableData2: [],
      treeData: [],
      defaultProps: {
        //children: 'children',
        label: "label"
      },
      visible: false,
      visible1: false,
      top: 0,
      left: 0
    };
  },
  created() {
    this.getData();
    this.loadNode();
  },
  watch: {
    //   监听属性对象，newValue为新的值，也就是改变后的值
    visible(newValue, oldValue) {
      if (newValue) {
        //菜单显示的时候
        // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
        // ("事件名" , "事件处理函数" , "布尔值");
        // 在body上添加事件处理程序
        document.body.addEventListener("click", this.closeMenu);
      } else {
        //菜单隐藏的时候
        // 移除body上添加的事件处理程序
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    visible1(newValue1, oldValue) {
      if (newValue1) {
        //菜单显示的时候
        // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
        // ("事件名" , "事件处理函数" , "布尔值");
        // 在body上添加事件处理程序
        document.body.addEventListener("click", this.closeMenu);
      } else {
        //菜单隐藏的时候
        // 移除body上添加的事件处理程序
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  components: {
    uploadVue,
  },

  methods: {
    //右键表格获取获取远程文件路径
    getRemoteFilePath(val) {
      let fileName = val.name;
      console.log("this.currentRow: ", fileName);
      let filePath = this.ruleForm.path;
      let Path = filePath + fileName;
      console.log("Path: ", Path);
      storageService.set(storageService.R_FILEPATH, Path);
    },
    //获取本地文件路径
    getLocalFilePath(file, fileLists) {
      // console.log("file",file);
      // this.fileList ={ name:file.name};
      storageService.set(
        storageService.L_FILEPATH,
        document.getElementsByClassName("el-upload__input")[0].value
      );
      // 本地电脑路径
      // console.log("本地电脑路径",document.getElementsByClassName("el-upload__input")[0].value);
      this.Download();
    },
    Download() {
      let id = this.$route.params.id;
      let lfilepath = storageService.get(storageService.L_FILEPATH);
      console.log("lfilepath: ", lfilepath);
      let rfilepath = storageService.get(storageService.R_FILEPATH);
      console.log("rfilepath: ", rfilepath);
      this.axios
        .post(
          "http://47.242.238.155:9996/sessions/" +
            id +
            "/download" +
            "?lfilepath=" +
            lfilepath +
            "&rfilepath=" +
            rfilepath
        )
        .then(res => {
          console.log("res.data: ", res.data);
          this.$message(res.data);
        });
    },
    //关闭抽屉
    handleClose(done) {
      done();
    },
    //获取鼠标右键的位置
    openMenu(e) {
      this.visible1 = false;
      var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
      var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
      this.top = y;
      this.left = x;
      this.visible = true; //显示菜单
    },
    openMenu1(e) {
      this.visible = false;
      var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
      var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
      this.top = y;
      this.left = x;
      this.visible1 = true; //显示菜单
    },
    //关闭菜单
    closeMenu() {
      this.visible = false; //关闭菜单
      this.visible1 = false;
    },
    onCopy: function(e) {
      alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    },

    handleNodeClick(data) {
      //var LastPath = this.ruleForm.path
      this.ruleForm.path = this.ruleForm.path + "/" + data.label;
      this.getData();
      this.loadNode();
    },
    goBack() {
      let path = this.ruleForm.path;
      if (path.lastIndexOf("/") == 0) {
        path = "/";
        this.$message({
          message: "到达根目录，不能再往前了！",
          type: "warning"
        });
      } else {
        path = path.substring(0, path.lastIndexOf("/"));
      }
      this.ruleForm.path = path;
      this.getData();
      this.loadNode();
    },

    getData() {
      //表格
      let id = this.$route.params.id;
      this.axios
        .post(
          "http://47.242.238.155:9996/sessions/" +
            id +
            "/dir" +
            "?path=" +
            this.ruleForm.path
        )
        .then(res => {
          let j = 0;
          let DataList = [];
          let n = 0;
          for (n in res.data) {
            n++;
          }
          for (let i = 0; i < n; i++) {
            var isDir = res.data[i].contentInfo.isDir;

            if (!isDir) {
              DataList[j] = {
                fileName: res.data[i].contentInfo.fileName,
                fileSize: res.data[i].contentInfo.fileSize,
                modifyTime: res.data[i].contentInfo.modifyTime
              };
              j++;
            }
          }
          this.tableData1 = DataList;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    loadNode() {
      //目录
      let id = this.$route.params.id;
      this.axios
        .post(
          "http://47.242.238.155:9996/sessions/" +
            id +
            "/dir" +
            "?path=" +
            this.ruleForm.path
        )
        .then(response => {
          let num = 0;
          let newList = []; //定义一个新数组用来存放遍历的数据
          let n = 0;
          for (n in response.data) {
            n++;
          }
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
          //if(node.level == 0)
          this.treeData = newList;

          //else resolve([])
        })
        .catch(error => {
          this.$message.error(error);
          //console.log('error: ', error);
        });
    }
  }
};
</script>
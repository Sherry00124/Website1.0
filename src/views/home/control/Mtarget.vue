<template>
  <div id="Mtarget">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item>详细信息</el-breadcrumb-item>
  <el-breadcrumb-item>编号：{{this.$route.params.id}}</el-breadcrumb-item>
  <el-breadcrumb-item>主机名：{{this.$route.params.hostName}}</el-breadcrumb-item>
  <el-breadcrumb-item>Address：{{this.$route.params.address}}</el-breadcrumb-item>
  <el-breadcrumb-item>edgeAddress：{{this.$route.params.edgeAddress}} </el-breadcrumb-item>
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
        </div>
      </el-col>
      <el-col :span="16" @contextmenu.prevent.native="openMenu($event)">
        <el-col>
          <h1>文件列表</h1> 
          
        </el-col>

        <el-table :data="tableData1" style="width: 100%" height="420">
          <el-table-column prop="fileName" label="文件名" width="300">
            <template slot-scope="scope">
              <i class="el-icon-document"></i>
              <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="大小" width="120"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" width="250"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template>
              <el-button  type="text" size="small"><router-link to="/download">下载</router-link> </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li>
        <el-button type="text" icon="el-icon-document-copy" @click="doCopy" class="TextWithoutUnderline">copy</el-button>
      </li>
      <li>
        <el-button type="text" icon="el-icon-upload" @click="dialog = true">upload</el-button>
      </li>
      <li>
        <el-button type="text" icon="el-icon-document-copy"><router-link to="/control/rconnect" class="TextWithoutUnderline">rconnect</router-link></el-button>
      </li>
      <li>
        <el-button type="text" icon="el-icon-document-copy" ><router-link  class="TextWithoutUnderline" to="/control/command">command</router-link></el-button>
      </li>
      <li>
        <el-button type="text" icon="el-icon-document-copy"  ><router-link class="TextWithoutUnderline" to="/control/forwardL2R">forwardL2R</router-link></el-button>
      </li>
      <li>
        <el-button type="text" icon="el-icon-document-copy"  ><router-link to="/control/rlisten" class="TextWithoutUnderline">rlisten</router-link></el-button>
      </li>
    </ul>
    <el-drawer
  title="请填写上传信息"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  >
  <div class="demo-drawer__content">
    <uploadVue/>
    <!-- <div class="demo-drawer__footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div> -->
  </div>
</el-drawer>
<!-- <el-drawer
  title="请填写连接信息"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  >
  <div class="demo-drawer__content">
    <connectVue/>
  </div>
</el-drawer> -->
    <!-- <div style="margin: 10px 0"></div> -->
    <!-- <el-row :gutter="20">
      
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-table :data="tableData2" style="width: 100%" height="130">
            <el-table-column prop="id" label="编号" width="120"></el-table-column>
            <el-table-column prop="updated_at" label="时间" width="200"></el-table-column>
            <el-table-column prop="name" label="文件名" width="120"></el-table-column>
            <el-table-column prop="address" label="存放地址" width="150"></el-table-column>
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
                >{{ scope.row.tag }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData2)"
                  type="text"
                  size="small"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>-->
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
  background: rgb(246, 148, 148);
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
import uploadVue from '@/views/tool/upload.vue';
import connectVue from '../../tool/connect.vue';
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
      tableData2: [],
      treeData: [],
      defaultProps: {
        //children: 'children',
        label: "label"
      },
      visible: false,
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
    }
  },
  components:{
    uploadVue,
    connectVue,
  },

  methods: {
    handleClose(done) {
      // this.$confirm('确定要提交表单吗？')
      //   .then(_ => {
      //     this.loading = true;
      //     setTimeout(() => {
      //       this.loading = false;
            done();
      //     }, 2000);
      //   })
      //   .catch(_ => {});
    },
    openMenu(e) {
      var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
      var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
      this.top = y;
      this.left = x;
      this.visible = true; //显示菜单
    },
    //关闭菜单
    closeMenu() {
      this.visible = false; //关闭菜单
    },
    doCopy: function() {
      this.$copyText(this.message).then(
        function(e) {
          alert("Copied");
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
    filterTag(value, row) {
      return row.tag === value;
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
      let id = this.$route.params.id
      console.log('id: ', id);
      this.axios.post("http://47.242.238.155:9996/sessions/" + id + "/dir" +"?path=" +this.ruleForm.path,)
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
      let id = this.$route.params.id
      this.axios
        .post(
          "http://47.242.238.155:9996/sessions/" + id + "/dir" +
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
<template>
  <div id="host">
    <el-col @contextmenu.prevent.native="openMenu($event)">
      <el-row>
        
        <el-tooltip class="item" effect="dark" content="连接" placement="top">
      <el-button icon="el-icon-connection" @click="connect()" circle></el-button>
    </el-tooltip>
        Sessions列表
        <el-button type="text" icon="el-icon-refresh" @click="getFormData();refresh()">Sessions刷新</el-button>
      </el-row>
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
        max-height="250"
        @row-contextmenu="getRowData"
      >
        <!-- <el-table-column fixed v-bind:prop="number" label="编号" width="60">
        </el-table-column>-->
        <el-table-column
          prop="tag"
          label="状态"
          width="80"
          :filters="[
        { text: 'true', value: 'true' },
        { text: 'false', value: 'false' },
      ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag == '0' ? 'danger' : 'success'"
              disable-transitions
            >{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="group" label="分组" width="100"></el-table-column>
        <el-table-column prop="name" label="名称" width="100"></el-table-column>
        <el-table-column prop="hexId" label="hexId" width="300"></el-table-column>
        <el-table-column prop="os" label="系统" width="100"></el-table-column>
        <el-table-column prop="arch" label="CPU架构" width="100"></el-table-column>
        <el-table-column prop="hostName" label="主机名称" width="150"></el-table-column>
        <el-table-column prop="address" label="Address" width="200"></el-table-column>
        <el-table-column prop="edgeAddress" label="edgeAddress"></el-table-column>
        <!-- <el-table-column prop="option" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              v-if="scope.row.tag == 0"
              disabled
              @click="rePeoplemessageCard(scope.row)"
            >控制</el-button>
            <el-button type="danger" size="small" v-else @click="rePeoplemessageCard(scope.row)">控制</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </el-col>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li>
        <el-button type="text" icon="el-icon-aim" @click="ToMtarget()">控制</el-button>
      </li>

      <li>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="addRoute()">增加路由</el-button>
      </li>
    </ul>
  

    <el-col @contextmenu.prevent.native="openMenu1($event)">
      <div style="margin: 20px 0"></div>
      <el-row>
        Route列表
        <el-button type="text" icon="el-icon-refresh" @click="getRoute();refresh()">Route刷新</el-button>
      </el-row>
      <el-table
        ref="filterTable"
        :data="tableData1"
        style="width: 100%"
        max-height="250"
        @row-contextmenu="getRowData"
      >
        <el-table-column
          prop="tag"
          label="状态"
          width="80"
          :filters="[
        { text: 'true', value: 'true' },
        { text: 'false', value: 'false' },
      ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag == '0' ? 'danger' : 'success'"
              disable-transitions
            >{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cidr" label="CIDR" width="100"></el-table-column>
        <el-table-column prop="id1" label="Id" width="50"></el-table-column>
        <el-table-column prop="group1" label="分组" width="100"></el-table-column>
        <el-table-column prop="name1" label="名称" width="100"></el-table-column>
        <el-table-column prop="hexId1" label="hexId" width="300"></el-table-column>
        <el-table-column prop="os1" label="系统" width="100"></el-table-column>
        <el-table-column prop="arch1" label="CPU架构" width="100"></el-table-column>
        <el-table-column prop="hostName1" label="主机名称" width="150"></el-table-column>
        <el-table-column prop="address1" label="Address" width="200"></el-table-column>
        <el-table-column prop="edgeAddress1" label="edgeAddress" width="200"></el-table-column>
      </el-table>
    </el-col>
    <ul v-show="visible1" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li>
        <el-button type="text" icon="el-icon-remove-outline" @click="delRoute()">删除路由</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import userService from "../../service/userService";
import storageService from "../../service/storageService";

export default {
  name: "Host",
  data() {
    return {
      //表格数据
      tableData: [],
      tableData1: [],
      //鼠标右键
      visible: false,
      visible1: false,
      top: 0,
      left: 0,
    };
  },
  created() {
    this.getFormData();
    this.getRoute();
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
  methods: {
    connect(){
      this.$prompt('Ip:Port', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let rIpPort = value;
          this.axios.post(
        "http://47.242.238.155:9996/sessions/connect" +
          "?rIpPort=" + rIpPort 
      ).then(res =>{
        console.log('res.data: ', res.data);
        this.$message({
            type: 'success',
            message: "连接成功"
            
          });
      })
          
        }).catch(function(error) {
          // 请求失败处理
          console.log("getERR:", error);
        });
    },
    refresh(){
      this.$message.success("刷新成功！");
    },
    handleClose(done) {
      done();
    },
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
    //获取表格中的数据
    getFormData() {
      userService.sessions().then(res => {
        let count = 0;
        for (count in res.data) {
          count++;
        }
        let dataList = [];
        for (let i = 0; i < count; i++) {
          dataList[i] = {
            id: res.data[i].id,

            group: res.data[i].group,
            name: res.data[i].name,
            hexId: res.data[i].hexId,
            os: res.data[i].os,
            arch: res.data[i].arch,
            hostName: res.data[i].hostName,
            address: res.data[i].address,
            edgeAddress: res.data[i].edgeAddress,
            tag: res.data[i].Status
          };
        }

        this.tableData = dataList;
      });
    },

    filterTag(value, row) {
      return row.tag === value;
    },
    //右鍵獲取表格中一列的信息
    getRowData(row) {
      storageService.set(storageService.HOST_ID, row.id);
      storageService.set(storageService.HOST_ADDRESS, row.address);
      storageService.set(storageService.HOST_EDGEADDRESS, row.edgeAddress);
      storageService.set(storageService.HOST_HOSTNAME, row.hostName);
      storageService.set(storageService.HOST_CIDR, row.cidr);
    },
    //进入对应的id
    ToMtarget() {
      let routeUrl = this.$router.resolve({
        name: "Manage",
        params: {
          id: storageService.get(storageService.HOST_ID),
          hostName: storageService.get(storageService.HOST_HOSTNAME),
          address: storageService.get(storageService.HOST_ADDRESS),
          edgeAddress: storageService.get(storageService.HOST_EDGEADDRESS)
        }
      });
      window.open(routeUrl.href, "_blank");
    },
    getRoute() {
      this.axios
        .get("http://47.242.238.155:9996/routes")
        .then(res => {
          let cidr;
          let dataList = [];
          let num = 0;
          for (cidr in res.data) {
            dataList[num] = {
              cidr: cidr,
              id1: res.data[cidr].id,
              group1: res.data[cidr].group,
              name1: res.data[cidr].name,
              hexId1: res.data[cidr].hexId,
              os1: res.data[cidr].os,
              arch1: res.data[cidr].arch,
              hostName1: res.data[cidr].hostName,
              address1: res.data[cidr].address,
              edgeAddress1: res.data[cidr].edgeAddress,
              tag: res.data[cidr].Status
            };
            cidr++;
            num++;
          }
          this.tableData1 = dataList;
        })
        .catch(function(error) {
          // 请求失败处理
          console.log("getERR:", error);
        });
    },

    addRoute() {
      this.$prompt("请输入CIDR", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          let CIDR = value;
          let SessionId = storageService.get(storageService.HOST_ID);
          this.axios
            .post(
              "http://47.242.238.155:9996/addRoute?sessionId=" +
                SessionId +
                "&cidr=" +
                CIDR
            )
            .then(res => {
              this.$message({
                type: "success",
                message: res.data
              });
            });
        }).catch(function(error) {
              // 请求失败处理
              console.log("delERR:", error);
            });
    },
    delRoute() {
      this.$confirm("此操作将永久删除路由, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let CIDR = storageService.get(storageService.HOST_CIDR);
          this.axios
            .post("http://47.242.238.155:9996/delRoute?cidr=" + CIDR)
            .then(res => {
              this.$message({
                type: "success",
                message: res.data
              });
              storageService.set(storageService.HOST_CIDR, "");
            })
            .catch(function(error) {
              // 请求失败处理
              console.log("delERR:", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
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
</style>
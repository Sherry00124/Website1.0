<template>
    <el-col @contextmenu.prevent.native="openMenu($event)">
    <el-button @click="getJobs()" icon="el-icon-refresh"> </el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-contextmenu="getData"
      >
      <el-table-column
        prop="Id"
        label="Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Jobs"
        label="Jobs"
        >
      </el-table-column>
    </el-table>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li>
              <el-button type="text" @click="delJob()">删除</el-button>
            </li>
          </ul>
    </el-col>
  </template>

  <script>
import storageService from '../../service/storageService';
    export default {
      data() {
        return {
          tableData: [],
          visible: false,
      top: 0,
      left: 0
        }
      },
      created(){
        this.getJobs();
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
    },
      methods:{
        getData(row){
            console.log('row: ', row.Id);
        storageService.set(storageService.Control_JOBID,row.Id);
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
        getJobs(){
            let id = this.$route.params.id;
            this.axios.get("http://47.242.238.155:9996/sessions/"+id+"/jobs").then(res =>{
                let n = 0;
                let dataList = []
                for( n in res.data){
                    dataList[n] = {Id:n,Jobs:res.data[n]}
                }
                this.tableData = dataList;

            })
        },
        delJob(){
            let id = this.$route.params.id;
            let jobid = storageService.get(storageService.Control_JOBID);
            this.axios.post("http://47.242.238.155:9996/sessions/" + id + "/deljob?jobId=" + jobid).then(res =>{
              
                this.$message.success(res.data)
            })
        }
      }
    }
  </script>
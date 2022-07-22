<template>
<div id="control">
<el-container style="height: 600px; border: 1px solid #eee">
  <Nav />
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      
  <el-dropdown>
  <el-button circle>
    <i class="el-icon-user "></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item><router-link to="./UserIndex" class="redTextWithoutUnderline">个人中心</router-link> </el-dropdown-item>
    
    <el-dropdown-item><router-link to="./Login" class="redTextWithoutUnderline">退出</router-link></el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-header>
    
    <el-main>
      <div v-show="$route.meta.showfater">Welcome</div>
      
      <router-view />
    </el-main>
  </el-container>
</el-container>


  
</div>
</template>
<style>
  .el-header {
    background-color:   #e5e5ff;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #5e5ec9bb;
    color: #333;
  }
 
	.redTextWithoutUnderline {
	 text-decoration: none;
	 color:rgb(0, 0, 0); 
	}

</style>

<script>
import Nav from "./Cnav.vue";

  export default {
    props:['number'],
    name: "Control",
    data() {
      
      return {
        
      }
    },
    components: {
    Nav,

  },
  };
</script>
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
    <el-dropdown-item><el-button type="text" @click="$router.replace({name: 'UserIndex'})">个人中心</el-button></el-dropdown-item>
    <el-dropdown-item ><el-button type="text" @click="LogOut">退出</el-button></el-dropdown-item>
    <el-dropdown-item><el-button type="text" @click="$router.replace({name: 'Login'})">登录</el-button></el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
{{ userInfo.name }}
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
import { mapActions } from 'vuex';
import { mapState } from "vuex";
  export default {
    props:['number'],
    name: "Control",
    data() {
      
      return {
        
      }
    },
    methods: mapActions('userModule',['LogOut']),
      computed: mapState({
      userInfo: (state) => state.userModule.userInfo,
    }),
    components: {
    Nav,

  },
  };
</script>
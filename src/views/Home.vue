<template>
  <div id="module">
    <el-container style="height: 600px; border: 1px solid #eee">
      <!-- <Nav /> -->
      <el-aside width="160px">
        <!-- <el-button type="text"
          ><router-link to="/Login" class="redTextWithoutUnderline"
            >登录</router-link
          ></el-button
        >

        <div class="line"></div>-->
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="4">
            <i class="el-icon-s-flag"></i>
            <router-link to="/home/muma" class="redTextWithoutUnderline">木马</router-link>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-monitor"></i>
            <router-link to="/home/Host" class="redTextWithoutUnderline">主机</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-suitcase"></i>
            <router-link to="/home/Kit" class="redTextWithoutUnderline">工具</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <router-link to="/home/Set" class="redTextWithoutUnderline">设置</router-link>
          </el-menu-item>

        </el-menu>

        <div style="margin: 350px 0"></div>
      </el-aside>
      <!-- head -->
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <el-button circle>
              <i class="el-icon-user"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="$router.replace({name: 'UserIndex'})">个人中心</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="userInfo">
                <el-button type="text" @click="LogOut">退出</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="!userInfo">
                <el-button type="text" @click="$router.replace({name: 'Login'})">登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-if="userInfo">{{ userInfo.name }}</span>
        </el-header>
        <!-- main -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-aside {
  background-color: #5e5ec9bb;
  color: #333;
  
  
}
.el-header {
  background-color: #e5e5ff;
  color: #333;
  line-height: 60px;
  
}
.redTextWithoutUnderline {
  text-decoration: none; /*取消下划线 */
  color: rgb(0, 0, 0); /*设置颜色 */
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>



<script>
import storageService from "../service/storageService";
import userModule from "../store/module/user";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  // computed:{
  //   userInfo(){
  //     return this.$store.state.userModule.userInfo;
  //   },
  // },
  computed: mapState({
    userInfo: state => state.userModule.userInfo
  }),
  // computed:{
  //   userInfo(){
  //     return JSON.parse(storageService.get(storageService.USER_INFO))
  //   },
  // },
  methods: mapActions("userModule", ["LogOut"])
  // methods: {
  //   LogOut(){
  //     // sessionStorage.clear("username", name); //缓存
  //     //清除token
  //     storageService.set(storageService.USER_TOKEN,"")
  //     //清除用户信息
  //     storageService.set(storageService.USER_INFO,"")
  //     //跳转到主页
  //     this.$router.push("./Login"); //跳转到登录页面
  //   },
  // },
};
</script>
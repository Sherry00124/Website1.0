<template>

    <el-aside width="140px" >
      <div class="line"></div>
      <el-menu :default-openeds="['1', '3']" >
        <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <router-link to="/home/Host" class="redTextWithoutUnderline">返回首页</router-link>
      </el-menu-item>
          <el-menu-item index="1">
        <i class="el-icon-discover"></i>
        <router-link to="/control/Manage" class="redTextWithoutUnderline">目标管理</router-link>
      </el-menu-item>
        <!-- <el-menu-item index="2">
        <i class="el-icon-magic-stick"></i>
        <router-link to="/control/Proxy" class="redTextWithoutUnderline">代理设置</router-link>
          
      </el-menu-item>
          <el-menu-item index="3">
        <i class="el-icon-connection"></i>
        <router-link to="/control/Cascade" class="redTextWithoutUnderline">级联设置</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <router-link to="/control/Port" class="redTextWithoutUnderline">端口操作</router-link>
      </el-menu-item> -->
      <!-- <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <router-link to="/control/Other" class="redTextWithoutUnderline">其他操作</router-link>
      </el-menu-item> -->
      <el-menu-item index="6">
        <i class="el-icon-connection"></i>
        <router-link to="/control/connect" class="redTextWithoutUnderline">Connect</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <router-link to="/control/rconnect" class="redTextWithoutUnderline">Rconnect</router-link>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-menu"></i>
        <router-link to="/control/rlisten" class="redTextWithoutUnderline">Rlisten</router-link>
      </el-menu-item>
      <el-menu-item index="9">
        <i class="el-icon-menu"></i>
        <router-link to="/control/forwardL2R" class="redTextWithoutUnderline">ForwardL2R</router-link>
      </el-menu-item>
      <el-menu-item index="10">
        <i class="el-icon-menu"></i>
        <router-link to="/control/command" class="redTextWithoutUnderline">Command</router-link>
      </el-menu-item>
      </el-menu>
    </el-aside>

</template>

<script>
export default{
  name:"Cnav",
  methods:{
    
  }
}
</script>
<template>


    <el-header style="text-align: right; font-size: 10px" mode="horizontal">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        
          <el-row>
            <el-button icon="el-icon-s-custom" circle></el-button>
            
          </el-row>
          <div class="line"></div>
          </el-menu>
          </el-header>

  
</template>

<script>

</script>
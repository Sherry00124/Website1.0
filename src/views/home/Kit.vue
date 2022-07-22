<template>
  <div id="kit">
    <el-tabs :tab-position="tabPosition" style="height: 495px">
      <el-tab-pane label="端口扫描">
        <PortScan />
      </el-tab-pane>
      <el-tab-pane label="漏洞扫描"> </el-tab-pane>
      <el-tab-pane label="..."> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import PortScan from './Kportscan.vue'
export default {
  name: "Kit",

  data() {
    return {
      tabPosition: "right",
      
    };
   
  },
   components: {
    PortScan,
  },

  
};
</script>
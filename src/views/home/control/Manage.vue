<template>
  <div id="manage">
    <el-tabs :tab-position="tabPosition" style="height: 495px">
      <el-tab-pane label="目标管理">
        <Mtarget />
      </el-tab-pane>
      <el-tab-pane label="交互Shell">
        <router-link to="/control/xshell" class="redTextWithoutUnderline"><el-button type="info" round>开始配置</el-button></router-link>
      </el-tab-pane>
      <el-tab-pane label="VNC">
        <Mvnc />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.el-col {
  border-radius: 5px;
}
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 10px;
  min-height: 350px;
}
.redTextWithoutUnderline {
  text-decoration: none; /*取消下划线 */
  color: rgb(0, 0, 0); /*设置颜色 */
}
</style>
<script>
import Mtarget from "./Mtarget.vue"

import Mvnc from "./Mvnc.vue"
export default {
  name: "Manage",
  components: {
    // Nav,
    Mtarget,
    Mvnc,
  },
  data() {
    return {
      tabPosition: "right",
    };
  },
};
</script>
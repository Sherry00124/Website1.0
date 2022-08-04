<template>
  <div id="manage">
    <el-tabs :tab-position="tabPosition" style="height: 495px">
      <el-tab-pane label="文件管理">
        <Mtarget />
      </el-tab-pane>
      <el-tab-pane label="交互Shell">
        <router-link to="/control/xshell" class="redTextWithoutUnderline"><el-button type="info" round>开始配置</el-button></router-link>
      </el-tab-pane>
      <el-tab-pane label="VNC">
        <Mvnc />
      </el-tab-pane>
      <el-tab-pane label="Command">
        <CommandVue/>
      </el-tab-pane>

      <el-tab-pane label="RConnect">
        <RConnectVue/>
      </el-tab-pane>
      <el-tab-pane label="Forward">
        <ForwardVue/>

      </el-tab-pane>
      
      <el-tab-pane label="RListen">
        <RlistenVue/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.el-col {
  border-radius: 5px;
}

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
import CommandVue from "../../tool/command.vue";
import RConnectVue from "../../tool/rconnect.vue";
import ForwardVue from "../../tool/forward.vue";
import RlistenVue from "../../tool/rlisten.vue";
export default {
  name: "Manage",
  components: {
    // Nav,
    Mtarget,
    Mvnc,
    CommandVue,
    RConnectVue,
    ForwardVue,
    RlistenVue,
  },
  data() {
    return {
      tabPosition: "right",
    };
  },
};
</script>
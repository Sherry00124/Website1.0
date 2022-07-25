<template>
  <div id="console">
    <el-page-header @back="goBack" content=""></el-page-header>
    <!-- <el-button icon="el-icon-search" circle @click="addnode()"></el-button> -->
    <div  class="console" id="terminal" ref="terminal"></div>
  </div>
</template>
<script>
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as attach from 'xterm/lib/addons/attach/attach'
Terminal.applyAddon(fit)
Terminal.applyAddon(attach)
export default {
  name: "Console",
  props: {
    msg: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  data() {
    return {
      term: null,
      terminalSocket: null,
    };
  },
  methods: {
    runRealTerminal() {
      console.log("webSocket is finished");
    },
    errorRealTerminal() {
      console.log("error");
    },
    closeRealTerminal() {
      console.log("close");
    },
    goBack() {
      this.$router.push("./Xshell");
    },
  },
  mounted() {
    var containerWidth = window.screen.height;
    var containerHeight = window.screen.width;
    var cols = Math.floor((containerWidth - 30) / 9);
    var rows = Math.floor(window.innerHeight / 16) - 2;
    // console.log(rows)
    // console.log(cols)
    if (this.username === undefined) {//传内容
      var url =
        (location.protocol === "http:" ? "ws" : "wss") +
        "://" +
        location.hostname +
        ":5001" +
        "/ws" +
        "?" +
        "msg=" +
        this.msg +
        "&rows=" +
        rows +
        "&cols=" +
        cols;
    } else {//传密码
      var url =
        (location.protocol === "http:" ? "ws" : "wss") +
        "://" +
        location.hostname +
        ":5001" +
        "/ws" +
        "?" +
        "msg=" +
        this.msg +
        "&rows=" +
        rows +
        "&cols=" +
        cols +
        "&username=" +
        this.username +
        "&password=" +
        this.password;
    }
    let terminalContainer = document.getElementById("terminal");
    this.term = new Terminal();//新建终端
    this.term.open(terminalContainer);
    this.terminalSocket = new WebSocket(url);//打开一个websocket
    this.terminalSocket.onopen = this.runRealTerminal;//Web Socket 已连接上
    this.terminalSocket.onclose = this.closeRealTerminal;//Web Socket 关闭
    this.terminalSocket.onerror = this.errorRealTerminal;//web socket 出错
    this.term.attach(this.terminalSocket);
    this.term._initialized = true;
    console.log("mounted is going on");
  },
  beforeDestroy() {
    this.terminalSocket.close();
    this.term.destroy();
  },
};
</script>
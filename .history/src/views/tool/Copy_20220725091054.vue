
<template>
  <div id="paste">
    <el-input size="mini" v-model="value" placeholder="0.00" @paste.native="pasteMe"></el-input>
  </div>
</template>
<script>
export default {
  methods: {
    pasteMe() {
      //获得粘贴的文字
      let self = this;
      var data = null;
      var clipboardData = e.clipboardData; // IE
      if (!clipboardData) {
        //chrome
        clipboardData = e.originalEvent.clipboardData;
      }
      data = clipboardData.getData("Text");
    }
  }
};
</script>
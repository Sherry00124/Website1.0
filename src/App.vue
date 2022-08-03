<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/upload">上传</router-link>
      <router-link to="/download">下载</router-link> 
      <router-link to="/connect">连接</router-link>
      <router-link to="/rconnect">rconnect</router-link> 
      <router-link to="/command">command</router-link> 
      <router-link to="/rlisten">rlisten</router-link> 
      <router-link to="/forwardL2R">forwardL2R</router-link> -->
      <router-view />
      </div>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

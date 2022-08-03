<template>
  <div id="host">
    <el-table ref="filterTable" :data="tableData" style="width: 100%" max-height="250">
      <!-- <el-table-column fixed v-bind:prop="number" label="编号" width="60">
      </el-table-column>-->
      <el-table-column
        prop="tag"
        label="状态"
        width="150"
        :filters="[
        { text: 'true', value: 'true' },
        { text: 'false', value: 'false' },
      ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag == '0' ? 'danger' : 'success'"
            disable-transitions
          >{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="编号" width="50"></el-table-column>
      <el-table-column prop="group" label="分组" width="100"></el-table-column>
      <el-table-column prop="name" label="名称" width="100"></el-table-column>
      <el-table-column prop="hexId" label="hexId" width="300"></el-table-column>
      <el-table-column prop="os" label="系统" width="100"></el-table-column>
      <el-table-column prop="arch" label="CPU架构" width="100"></el-table-column>
      <el-table-column prop="hostName" label="主机名称" width="200"></el-table-column>
      <el-table-column prop="address" label="Address" width="200"></el-table-column>
      <el-table-column prop="edgeAddress" label="edgeAddress" width="200"></el-table-column>
      <el-table-column prop="option" fixed="right" label="操作" width="120">
          <template slot-scope="scope">
          <el-button type="danger" size="small" v-if = "scope.row.tag == 0" disabled @click="rePeoplemessageCard(scope.row)">控制</el-button>
          <el-button type="danger" size="small" v-else  @click="rePeoplemessageCard(scope.row)">控制</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import userService from '../../service/userService';

export default {
  name: "Host",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      userService.sessions().then(res => {
        let count = 0;
        for (count in res.data) {
          count++;
        }
        let dataList = [];
        for (let i = 0; i < count; i++) {
          dataList[i] = {
            id: res.data[i].id,
            
            group: res.data[i].group,
            name: res.data[i].name,
            hexId: res.data[i].hexId,
            os: res.data[i].os,
            arch: res.data[i].arch,
            hostName: res.data[i].hostName,
            address: res.data[i].address,
            edgeAddress: res.data[i].edgeAddress,
            tag: res.data[i].Status
            
          };
        }
        

      this.tableData = dataList
      });
    },
    handleClick(row) {
      console.log(row);
    },

    filterTag(value, row) {
      return row.tag === value;
    },
    rePeoplemessageCard(row) {
        let routeUrl = this.$router.resolve({
        name: "Manage",
        params:{
          id:row.id,
          hostName:row.hostName,
          address:row.address,
          edgeAddress:row.edgeAddress
          }
        
      });
      window.open(routeUrl.href, "_blank");
      },

  },

};
</script>

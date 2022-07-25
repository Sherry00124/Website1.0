<template>
  <div
    id="app"
    @contextmenu="showMenu"
    style="
                        width: 100px;
                        height: 100px;
                        margin-top: 20px;
                        background: red;
                "
  >
    <vue-context-menu
      style="
                                width: 150px;
                                background: #eee;
                                margin-left: auto;
                        "
      :contextMenuData="contextMenuData"
      @deletedata="deletedata"
    ></vue-context-menu>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      // 菜单数据
      contextMenuData: {
        menuName: "demo",
        //菜单显示的位置
        axis: {
          x: null,
          y: null
        },
        //菜单选项
        menulists: [
          {
            fnHandler: "deletedata",
            btnName: "删除当前数据"
          }
        ]
      }
    };
  },
  methods: {
    showMenu() {
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      // Get the current location
      this.contextMenuData.axis = {
        x,
        y
      };
    },
    deletedata() {
      console.log("delete!");
    }
  }
};
</script>

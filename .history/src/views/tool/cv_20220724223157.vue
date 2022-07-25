<template>
<div id="cv" @contextmenu="showMenu"
    style="width: 100px;height: 100px;margin-top: 20px;background: red;">
    <vue-context-menu :contextMenuData="contextMenuData"
        @copy="copy"
        @paste="paste">nihao</vue-context-menu>
      
</div>
</template>
<script>
export default {
  name: 'cv',
  data () {
    return {
      	// contextmenu data (菜单数据)
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [{
          fnHandler: '复制', // Binding events(绑定事件)
          icoName: 'el-icon-copy-document', // icon (icon图标 )
          btnName: 'Copy' // The name of the menu option (菜单名称)
        }, {
            fnHandler: '粘贴',
            icoName: 'el-icon-document',
            btnName: 'Paste'
        }]
      }
    }
  },
  methods: {
    showMenu () {
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
      this.contextMenuData.axis = {
        x, y
      }
    },
    savedata () {
      alert(1)
    },
    newdata () {
      console.log('newdata!')
    }
  }
}
</script>
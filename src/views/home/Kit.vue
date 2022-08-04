<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="26%"
    :destroy-on-close="true"
    @close="closeDialog('cancel')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    >
    <p class="content">{{ content }}</p>
    <p class="description" v-if="isShowDes">{{ description }}</p>
    <span slot="footer" class="dialog-footer">
        <el-button :size="$store.state.ELDEFAULTSIZE" type="primary" @click="closeDialog('confim')">{{ confirmText }}</el-button>
        <el-button :size="$store.state.ELDEFAULTSIZE" v-if="isShowClose" @click="closeDialog('cancel')">{{ cancelText }}</el-button>
    </span>
    </el-dialog>
</template>
 
<script>
export default {
    name: 'rz-delete-dialog',
    data() {
        return {}
    },
    props: {
        visible: { // 控制弹窗显示
            type: Boolean,
            default: false
        },
        title: { // 弹窗标题
            type: String,
            default: '删除'
        },
        content: { // 删除弹窗内容
            type: String,
            default: ''
        },
        description: { // 删除弹窗描述
            type: String,
            default: ''
        },
        isShowDes: { // 是否显示描述
            type: Boolean,
            default: false
        },
        isShowClose: { // 是否显示取消按钮
            type: Boolean,
            default: false
        },
        confirmText: { // 按钮显示文字
            type: String,
            default: '确定'
        },
        cancelText: { // 取消显示文字
            type: String,
            default: '取消'
        },
    },
    methods: {
        init() {
           // 初始化
        },
        /**
         * 点击按钮的回调
         * params {String} confim 确定 cancel 取消
         */
        closeDialog(val){
            this.$emit('closeDialog', val);
        },
    },
}
</script>
 
<style>
    .content {
        letter-spacing: 1px;
    }
    .description {
        color: #aaa;
        margin-top: 10px;
        letter-spacing: 1px;
 
    }
</style>
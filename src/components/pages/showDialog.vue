<template>
  <div>
      <el-dialog title="提示" :visible.sync="prop.visible" width="30%"  :before-close="handleClose" :modal='prop.modal'>
      <span>{{prop.msg}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="prop.visible = false">取 消</el-button>
          <el-button type="primary" @click="prop.fn">确 定</el-button>
      </span>
      </el-dialog>
  </div> 
</template>
<script>
export default {
  props: ['prop'],
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

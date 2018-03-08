<template>
<div class="grid">
  <el-form label-position="left" label-width="80px">
    <el-form-item label="课件名称">
      <el-input v-model="submitData.name" placeholder="输入课件名称" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课件序号">
      <el-input v-model="submitData.seq" placeholder="输入课件序号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateSeq" style="">更新</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import {
  // updateSeq,
  updateNewSeq
} from '@/api/chapterApi'
import {
  appFrameTypes
} from '@/store/types'
import {
  mapActions
} from 'vuex'

export default {
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      submitData: {}
    }
  },
  created() {
    if (this.params) {
      this.submitData = this.params
    }
    console.log(this.submitData)
  },
  methods: {
    ...mapActions({
      removeTab: appFrameTypes.A.REMOVE_TAB
    }),
    async updateSeq() {
      try {
        this.submitData.createdTime = null
        this.submitData.modifiedTime = null
        // await updateSeq(this.submitData)
        await updateNewSeq(this.submitData)
        this.$message({
          type: 'success',
          showClose: true,
          message: '更新顺序成功!'
        })
        this.removeTab('course-create')
      } catch (e) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '更新顺序异常!'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

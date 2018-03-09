<template>
<div class="grid">
  <el-form label-position="left" label-width="80px">
    <el-form-item label="所属课程">
      <el-input v-model="submitData.courseName" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="学期">
      <el-input v-model="submitData.term" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课件名称">
      <el-input v-model="submitData.name" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课件描述">
      <el-input v-model="submitData.remark" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课件时长">
      <el-input v-model="submitData.duration" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="课件类型">
      <el-select v-model="submitData.type" :disabled="true">
        <el-option v-for="t in typeData" :key="t.value" :label="t.label" :value="t.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课件审核">
      <el-select v-model="submitData.status" placeholder="请选择课件状态">
        <el-option v-for="s in statusData" :key="s.value" :label="s.label" :value="s.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateStatus" style="">更新</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { updateStatus } from '@/api/chapterApi'
import { appFrameTypes } from '@/store/types'
import { mapActions } from 'vuex'

export default {
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      submitData: {},
      typeData: [
        {
          value: 1,
          label: '正课'
        },
        {
          value: 2,
          label: '试讲课'
        }
      ],
      statusData: [
        {
          value: 1,
          label: '上架'
        },
        {
          value: 2,
          label: '灰度'
        },
        {
          value: 3,
          label: '无效'
        }
      ]
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
    async updateStatus() {
      try {
        this.submitData.createdTime = null
        this.submitData.modifiedTime = null
        await updateStatus(this.submitData)
        this.$message({
          type: 'success',
          showClose: true,
          message: '审核成功!'
        })
        this.removeTab('course-create')
      } catch (e) {
        this.$message({
          type: 'error',
          showClose: true,
          message: e.message || '审核异常!'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

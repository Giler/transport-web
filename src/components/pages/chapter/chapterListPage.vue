<template>
<div class="grid">
  <el-form label-position="left" label-width="80px">
    <el-form-item label="课程名称">
      <el-input v-model="requestQuery.courseName" placeholder="输入课件所属的课程名称"></el-input>
    </el-form-item>
    <el-form-item label="等级">
      <el-input v-model="requestQuery.level" placeholder="输入课件所在的学期"></el-input>
    </el-form-item>
    <el-form-item label="课件名称">
      <el-input v-model="requestQuery.name" placeholder="输入课件的名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query" style="">查询</el-button>
      <el-button type="primary" @click="makeChapter" style="">确定</el-button>
    </el-form-item>
  </el-form>
  <smart-grid :selectable="true" :data="resultList" :loading="loading" :multiple='false' :event-hub="eventHub" @select="handleCheck" @pagination-change="query" @reload="query">
    <smart-grid-column code="seq" label="序号">
    </smart-grid-column>
    <smart-grid-column code="courseName" label="所属课程">
    </smart-grid-column>
    <smart-grid-column code="level" label="级别">
    </smart-grid-column>
    <smart-grid-column code="chapterId" label="课件编号">
    </smart-grid-column>
    <smart-grid-column code="name" label="课件名称">
    </smart-grid-column>
    <smart-grid-column code="version" label="版本号">
    </smart-grid-column>
    <smart-grid-column code="status" label="状态" :valueset="statusMap">
    </smart-grid-column>
    <smart-grid-column code="remark" label="课件描述">
    </smart-grid-column>
    <span v-if="hideOperation===false">
    <smart-grid-column label="操作" width="250px">
      <template scope="scope">
          <el-tooltip content="更改序号" placement="top">
           <el-button size="small" type="success" name="button"  @click="updateChapterSeq(scope.row)">更改序号
           </el-button>
         </el-tooltip>
         <el-tooltip content="审核" placement="top">
          <el-button size="small" type="warning" name="button"  @click="updateChapterStatus(scope.row)">审核
          </el-button>
          </el-tooltip>
         <el-tooltip content="删除" placement="top">
           <el-button size="small" type="danger" name="button"  @click="showDeleteChapter(scope.row)">删除
           </el-button>
         </el-tooltip>
        </template>
    </smart-grid-column>
    </span>
  </smart-grid>
  <show-dialog :prop="dialog"></show-dialog>  
</div>
</template>
<script>
import {
  getChapterPage,
  deleteChapter
} from '@/api/chapterApi'
import {
  appFrameTypes
} from '@/store/types'
import {
  mapActions
} from 'vuex'
import Vue from 'vue'
import showDialog from '@/components/pages/showDialog'
export default {
  props: {
    hideOperation: {
      type: Boolean
    }
  },
  data() {
    return {
      statusMap: {
        1: '上架',
        2: '灰度',
        3: '无效'
      },
      typeMap: {
        1: '正课',
        2: '试讲课'
      },
      loading: false,
      resultList: {},
      updateTable: false,
      requestQuery: {},
      description: '',
      eventHub: new Vue(),
      multiple: true,
      checkNum: 0,
      submitObject: {},
      dialog: {
        msg: '',
        fn: '',
        visible: false
      }
    }
  },
  created() {
    this.query()
    console.log(this.hideOperation)
  },
  methods: {
    ...mapActions({
      addTab: appFrameTypes.A.ADD_TAB
    }),

    async query(pageable = { //
      size: 10,
      page: 0
    }) {
      this.loading = true
      try {
        this.resultList = await getChapterPage({ ...pageable, //异步变同步
          ...this.requestQuery
        })
        console.log(this.resultList)
      } finally {
        this.loading = false
      }
    },
    updateChapterStatus(rowData) {
      this.addTab({
        id: 'chapter-update-status',
        params: rowData,
        name: '课件审核'
      })
    },
    updateChapterSeq(rowData) {
      this.addTab({
        id: 'chapter-update-seq',
        params: rowData,
        name: '课件顺序更新'
      })
    },
    showDeleteChapter(rowData) {
      this.dialog.fn = () => {
        this.deleteChapter(rowData)
      }
      this.dialog.msg = '确定要删除该课件吗？'
      this.dialog.visible = true
    },
    async deleteChapter(rowData) {
      try {
        this.submitObject.chapterId = rowData.chapterId
        this.submitObject.version = rowData.version
        await deleteChapter(this.submitObject)
        this.$message({
          type: 'success',
          showClose: true,
          message: '删除成功!'
        })
      } catch (e) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '删除异常!'
        })
      }
      this.dialog.visible = false
      this.eventHub.$emit('reload')
    },
    makeChapter() {
      this.$emit('emit-chapter', this.chooseChapterOne)
    },
    handleCheck(rowData, checked) {
      this.chooseChapterOne = rowData
    }
  },
  components: {
    showDialog
  }
}
</script>

<style lang="less" scoped>
</style>

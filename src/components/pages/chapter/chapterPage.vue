<template>
  <div class="grid">
    <el-form label-position="left" label-width="80px">
    <el-form-item label="章节名">
      <el-input v-model="chapter.name"  placeholder="输入章节名"></el-input>
    </el-form-item>
    <el-form-item>
       <el-button type="primary"  style="">查询</el-button>
        <el-button type="primary" @click="makeChapter"  style="">确定</el-button>
    </el-form-item>
  </el-form>
    <smart-grid :radiotable="true" :data="objectList" @select="handleCheck"  @pagination-change="query" @reload="query">
      <smart-grid-column code="courseId" label="课程编号" width="100px">
      </smart-grid-column>
      <smart-grid-column code="chapterId" label="章节编号">
      </smart-grid-column>
      <smart-grid-column code="name"  label="章节名称" width="150px"></smart-grid-column>
      <smart-grid-column code="version" label="章节版本号" width="100px">
      </smart-grid-column>
    </smart-grid>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      objectList: {
        content: []
      },
      chapter: {},
      chooseChapterOne: {}
    }
  },
  created() {
    this.query()
  },
  methods: {
    async query(pageable = {size: 10, page: 0}) {
      console.log(pageable.size)
      this.objectList.size = 10
      this.objectList.number = 0
      this.objectList.numberOfElements = 8
      this.objectList.totalPages = 1
      this.objectList.Elements = 8
      this.objectList.first = true
      this.objectList.last = true
      for (let i = 0; i < 10; i++) {
        let testObject = {}
        testObject.courseId = i
        testObject.chapterId = 'chapterId' + i
        testObject.name = '章节' + i
        testObject.version = 'v1.1.' + i
        this.objectList.content.push(testObject)
      }
    },
    makeChapter() {
      this.$emit('emit-chapter', this.chooseChapterOne)
    },
    handleCheck(rowData, checked) {
      if (checked === true) {
        this.chooseChapterOne = {}
        this.chooseChapterOne.courseId = rowData.courseId
        this.chooseChapterOne.name = rowData.name
      }
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
</style>

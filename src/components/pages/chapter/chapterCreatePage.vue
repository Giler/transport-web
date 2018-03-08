<template>
<div class="grid">
  <el-form label-position="left" label-width="80px">
    <!-- <el-form-item label="Level">
      <el-col :span="11">
        <el-form-item label="">
          <el-input v-model="submitData.level" placeholder="选择Level" :disabled="true"></el-input>
        </el-form-item>
      </el-col> 
      <el-col :span="11">
        <el-form-item label="">
          <el-button @click="openTerm" type="primary">选择等级</el-button>
        </el-form-item>
      </el-col>
    </el-form-item> -->
    <!-- <el-form-item label="学期">
      <el-input v-model="submitData.termName" placeholder="无需手动输入，请选择等级" :disabled="true"></el-input>
    </el-form-item> -->
    
    <el-form-item label="课程编号">
      <el-input v-model="submitData.chapterId" placeholder="输入课程编号" @blur="showChapter"></el-input>
    </el-form-item>
    <el-form-item label="课件名称">
      <el-input v-model="submitData.name" placeholder="输入课件名称"></el-input>
    </el-form-item>
    <el-form-item label="课件描述">
      <el-input v-model="submitData.remark" placeholder="输入课件描述"></el-input>
    </el-form-item>
    <el-form-item label="课件时长">
      <el-input v-model="submitData.duration" placeholder="输入课件时长" ></el-input>
    </el-form-item>
    <el-form-item label="课件类型">
      <el-select v-model="submitData.type" placeholder="请选择课件类型">
        <el-option v-for="t in typeData" :key="t.value" :label="t.label" :value="t.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属年级">
      <el-col :span="11">
        <el-form-item label="">
          <el-input v-model="submitData.courseName" placeholder="无需手动输入，请选择等级" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="">
          <el-button @click="openTerm" type="primary">选择等级</el-button>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="级别">
      <el-input v-model="submitData.level" placeholder="无需手动输入，请选择等级" :disabled="false"></el-input>
    </el-form-item>
    <el-form-item label="资源文件">
      <el-form-item>
        <el-upload ref="uploadRef" class="upload-demo" :action="uploadUrl" :data="{'chapterId': submitData.chapterId}" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-progress="handleProgress" :before-upload="handleBeforeUpload" :file-list="fileList" :with-credentials="true">
          <span v-if="!readonly">
             <el-button size="small" type="primary">点击上传</el-button>
             <div class="el-upload__tip" slot="tip">只能上传zip格式文件，且不超过80mb</div>
           </span>
        </el-upload>
      </el-form-item>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save" style="">保存</el-button>
    </el-form-item>
    <el-dialog title="选择学期" v-model="termFormVisible">
      <termPage  @emit-term="chooseTerm"></termPage>
    </el-dialog>
  </el-form>
</div>
</template>
<script>
import {
  createChapter, getLastChapter
} from '@/api/chapterApi'
import {
  appFrameTypes
} from '@/store/types'
import {
  mapActions
} from 'vuex'
import termPage from '@/components/pages/term/termPage'
import { getApiHost } from '@/common/settings'
export default {
  props: {
    // 允许上传的文件类型
    nameField: {
      type: String,
      default: 'name'
    },
    fileTypeList: {
      type: Array,
      default: () => {
        return [
          'zip'
        ]
      }
    },
    // 允许上传的最大大小
    fileMaxSize: {
      type: Number,
      default: 1024 * 1024 * 80
    },
    settingFileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object
    }
  },
  data () {
    return {
      fileList: [],
      termFormVisible: false,
      uploadUrl: getApiHost() + '/ls/chapter/upload',
      submitData: {
        duration: '25'
      },
      typeData: [{
        value: 1,
        label: '正课'
      }, {
        value: 2,
        label: '试讲课'
      }],
      statusData: [{
        value: 1,
        label: '上架'
      }, {
        value: 2,
        label: '灰度'
      }, {
        value: 3,
        label: '无效'
      }]
    }
  },
  created () {
    if (this.params) {
      this.submitData = this.params
    }
    console.log(this.submitData)
  },
  methods: {
    ...mapActions({
      removeTab: appFrameTypes.A.REMOVE_TAB
    }),
    async showChapter () {
      let that = this
      if (this.submitData.chapterId != null) {
         await getLastChapter({ chapterId: this.submitData.chapterId })
          .then(res => {
            if (res != null){
              that.submitData = {chapterId: res.chapterId}
              that.submitData.courseId = res.courseId
              that.submitData.name = res.name
              //that.submitData.level = res.level
              that.submitData.duration = res.duration
              that.submitData.remark = res.remark
              that.submitData.type = res.type
              that.submitData.courseName = res.courseName
              that.submitData.level = res.level
            }
          })
      }
    },
    // 上传附件
    handleRemove (file, fileList) {
      console.log('handleRemove')
      const index = this.fileList.indexOf(file)
      if (index !== -1) {
        this.fileList.splice(index, 1)
      }
      this.$emit('upload-method', this.fileList)
    },
    handlePreview (file) {
      console.log('todo handlePreview')
    },
    // 文件上传时 钩子
    handleProgress (event, file, fileList) {
      console.log('todo handleProgress')
    },
    // 文件之前校验文件大小 文件类型 钩子
    handleBeforeUpload (file) {
      const fileType = file.name.split('.').pop()
      const index = this.fileTypeList.indexOf(fileType.toLowerCase())
      if (index === -1) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '不允许上传该类型附件!'
        })
        this.$refs.uploadRef.uploadFiles.pop()
        return false
      }
      if (file.size > this.fileMaxSize) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '最大允许上传附件的大小为80MB!'
        })
        this.$refs.uploadRef.uploadFiles.pop()
        return false
      }
    },
    // 上传成功后
    handleSuccess (resp, file, fileList) {
      if (resp.status === 200) {
        // 回显文件名
        console.log(resp)
        console.log(file)
        // resp.data.name = file.name
        this.submitData.resourceUrl = resp.data
        // this.fileList.push(resp.data)
        // this.$emit('upload-method', this.fileList)
      } else {
        const error = new Error(resp.message || '未知错误')
        error.resp = resp
        this.$message({
          type: 'warning',
          message: '附件上传异常!'
        })
      }
    },
    openTerm () {
      this.termFormVisible = true
    },
    chooseTerm (term) {
      this.submitData.courseId = term.id
      this.submitData.courseName = term.name
      this.submitData.level = term.level
      //this.submitData.termName = term.name
      //this.submitData.term = term.term
      this.termFormVisible = false
    },
    async save () {
      try {
        await createChapter(this.submitData)
        this.$message({
          type: 'success',
          showClose: true,
          message: '保存成功!'
        })
      } catch (e) {
        this.$message({
          type: 'error',
          showClose: true,
          message: e.message || '保存异常!'
        })
      }
    }
  },
  components: {
    termPage
  }
}
</script>

<style lang="less" scoped>

</style>

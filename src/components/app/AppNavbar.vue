<template>
<section>
  <div class="user-info">
    <!-- <img class="pull-left" src="../../assets/images/ic_launcher.png"> -->
    <div class="pull-right">
      <p>{{userName}}</p>
      <a href="#" @click="logout">退出</a>
    </div>
  </div>
  <div class="logo" @click="reloadAll"></div>
  <div class="nav-search">
    <!-- <el-autocomplete ref="elAuto" @keydown.esc.stop.native="cancelSelect" @select="handleSelect" @keydown.enter.stop.native="cancelSelect" :fetch-suggestions="querySearchAsync" custom-item="app-nav-bar-dataitem" placeholder="请输入搜索内容" style="width:300px;" v-model="searchQuery"></el-autocomplete> -->
    <el-popover
      ref="search_popover"
      placement="bottom"
      trigger="click" v-model="search_popover">
    </el-popover>
    <!-- <div style="float:left; width: 300px;" @click="querySearchAsync">
      <el-input v-popover:search_popover @click="querySearchAsync" @change="querySearchAsync" @focus="querySearchAsync" @keydown.enter.stop.native="search" v-model="searchQuery" placeholder="请输入搜索内容"></el-input> -->
      <!-- <el-input v-popover:search_popover @change="querySearchAsync" @keydown.enter.stop.native="search" v-model="searchQuery" placeholder="请输入搜索内容"></el-input>
    </div>
    <div style="float:left;">
      <el-button @click="search"><i class="el-icon-search"></i> 查询</el-button>
    </div>  -->
  </div>
  <div class="pull-right org-sel">
    <el-form :label-width="'25%'">
    </el-form>
  </div>
</section>
</template>

<script>
import Vue from 'vue'
import { appFrameTypes } from '@/store/types'
import { mapActions } from 'vuex'
import { updateSearchHistory, getSearchHistory } from '@/store/storage'
Vue.component('app-nav-bar-dataitem', {
  functional: true,
  render: function (h, ctx) {
    const item = ctx.props.item
    return h('li', ctx.data, [
      h('div', {
        domProps: {
          innerHTML: item.value
        }
      }, [item.value])
    ])
  },
  props: {
    item: { type: Object, required: true }
  }
})
export default {
  data () {
    return {
      showUserMore: false,
      isEmpty: false,
      channleList: [],
      channleId: null,
      activeName: 'knowl',
      orgName: '',
      userName: '',
      searchQuery: '',
      sortUtils: {
        //        direction: 'DESC',
        //        property: [
        //          'klKnowledge.isImportant',
        //          'klKnowledge.createdAt'
        //        ]
      },
      searchQueryOldVal: '',
      search_popover: false,
      suggestions: [],
      tabName: '知识搜索-',
      user: {}
    }
  },
  methods: {
    ...mapActions({
      addTab: appFrameTypes.A.ADD_TAB
    }),
    logout () {
      this.$confirm('确定退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = getLoginUrl()
        // this.$router.replace('login')
      })
    },
    // 选择时联想条目时打开详情页
    handleSelect (item) {
      if (this.isEmpty) {
        this.searchQuery = item.value
        this.search()
      } else {
        this.searchQuery = this.searchQueryOldVal
        updateSearchHistory(this.searchQuery, this.activeName)
        this.addTab({ id: this.detailTabId, params: item.entity, name: item.entity[this.klEntityName].title })
        this.search_popover = false
      }
    },
    // 取消选择
    cancelSelect () {
      this.$refs.elAuto.highlightedIndex = -1
    },
    // 切换搜索类型
    changeTabs () {
      if (this.activeName === 'knowl') {
        this.detailTabId = 'knowledgeDetail'
        this.klEntityName = 'klKnowledge'
        this.searchResultTabId = 'searchKnowledgeResultPage'
        this.tabName = '知识搜索-'
        //        this.sortUtils.property = [
        //          "_score",
        //          'klKnowledge.isImportant',
        //          'klKnowledge.viewCount',
        //          'klKnowledge.createdAt'
        //        ]
      } else if (this.activeName === 'act') {
        this.detailTabId = 'activeDetail'
        this.klEntityName = 'activeInfo'
        this.searchResultTabId = 'searchActiveResultPage'
        this.tabName = '活动搜索-'
        //        this.sortUtils.property = [ "_score", 'activeInfo.createdAt' ]
      }
    },
    // 联想内容
    async querySearchAsync (queryString, cb) {
      // 联想内容只搜索title和ID
      // console.log(1)
      queryString = this.searchQuery
      // console.log(queryString)
      if (queryString) {
        this.isEmpty = false
        const query = {
          title: queryString,
          status: 4,
          sortUtils: this.sortUtils,
          page: 0,
          size: 10
        }
        this.suggestions = queryString && queryString.length > 1 ? await this.getSearchResult(query) : []
      } else {
        this.isEmpty = true
        let results = []
        let rs = await getSearchHistory(8, this.activeName)
        rs.forEach(name => {
          const result = {
            'value': name[0],
            'entity': []
          }
          results.push(result)
        })
        this.suggestions = results
      }
      if (this.suggestions && this.suggestions.length > 0) {
        this.search_popover = true
      } else {
        this.search_popover = false
      }
      // cb(this.suggestions)
      // this.$refs.elAuto.getData(queryString)
    },
    // 获取联想内容
    async getSearchResult (query) {
      const searchResult = '联想内容'
      const results = []
      if (searchResult) {
        searchResult.content.forEach(entity => {
          const result = {
            'value': entity[this.klEntityName].title_h || entity[this.klEntityName].title,
            'entity': entity
          }
          results.push(result)
        })
      }
      return results
    },
    // Api返回搜索结果
    async getPageByApi (query) {
      let searchResult = {}
      return searchResult
    },
    createStateFilter (queryString) {
      return state => {
        // return (state.value.indexOf(queryString.toLowerCase()) === 0)
        return false
      }
    },
    // 点击查询跳转到搜索结果页
    async search () {
      // 搜索列表搜索title、内容、关键字ID等
      if (!this.searchQuery) {
        return
      }
      updateSearchHistory(this.searchQuery, this.activeName)
      this.search_popover = false
      const query = {
        searchContent: this.searchQuery,
        status: 4,
        sortUtils: this.sortUtils,
        page: 0,
        size: 10
      }
      // const searchResult = await this.getPageByApi(query)
      this.addTab({ id: this.searchResultTabId, params: { pageData: {}, queryParams: query, detailTabId: this.detailTabId, klEntityName: this.klEntityName }, name: this.tabName + this.searchQuery })
    },
    reloadAll () {
      window.location.reload(true)
    },
    async getUserCurrentChannel () {
      this.channleId = 'beijing'
    }
  },
  // 保存输入框上一次内容，选择时防止整条内容
  watch: {
    searchQuery (curVal, oldVal) {
      this.searchQueryOldVal = curVal
    }
  },
  created () {
    this.getUserName()
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixins.less";
@import "../../assets/styles/vars.less";
@import "../../assets/styles/colors.less";

.logo {
  background: url(../../assets/images/logo.png) no-repeat 0 50%;
  height: @appNavHeight;
  width: 375px;
  float: left;
  margin-left: 22px;
  cursor: pointer;
}

section {
  background-color: @blue400;
  overflow: hidden;
  height: 100%;
  position: relative;
  color: #fff;
  padding: 0 10px;
}

.user-info {
  float: left;
  font-size: 14px;
  > div {
    margin-top: 11px;
  }
  img {
    margin-top: 10px;
    margin-right: 10px;
    height: 55px;
    width: 55px;
    border-radius: 50%;
  }
  p {
    margin: 0 0 3px 0;
    white-space: nowrap;
    width: 100%;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    color: @lightBlue100;
  }
}

.nav-search {
  .absolute(0, auto, 0, 50%);
  margin-left: -190px;
}

.el-form .el-form-item {
  margin: 0;
}

.org-sel {
  margin-top: 20px;
  width: 300px;
}

.title {
  padding-left: 120px;
  font-size: 22px;
  line-height: @appNavHeight;
}

.username img {
  margin-top: 8px;
  margin-right: 10px;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}
.suggestionList {
  min-width: 200px;
  overflow-y: auto;
  overflow-x: auto;
  line-height: 30px;
}
.suggestionList {
  &:hover {
    background: @grey200;
  }
  li {
    list-style-type: none;
    cursor: pointer;
    margin-left: 10px;
    font-size: 13px;
  }
}
</style>

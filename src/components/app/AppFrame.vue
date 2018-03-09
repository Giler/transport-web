<template>
<section class="app-main">
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-submenu :index="item.id + ''" v-for="(item, index) in firstTypeList" :key="index">
      <template slot="title">{{item.name}}</template>
      <el-menu-item :index="sub.id + ''" v-for="sub in item.subTypeList" :key="sub" @click="handleSelect(sub.id, item.name+'/'+sub.name)">{{sub.name}}</el-menu-item>
    </el-submenu>
  </el-menu>
  <div v-if="tabs.length" class="tabs-wrap">
    <div class="tabs-header">
      <ul class="list-unstyled">
        <li v-for="tab in tabs" :key="tab.seqId" @click="activeTab(tab)" :class="{active: tab.seqId === currentTab}">
          <el-tooltip class="item" effect="dark" :content="tab.name" placement="bottom">
            <a>{{tab.name}}</a>
          </el-tooltip>
          <i v-if="!tab.lock" class="el-icon-close" @click.stop="removeTab(tab.seqId)"></i>
        </li>
      </ul>
      <div v-show="scrollButton.show" class="oper-list">
        <button type="button" :disabled="scrollButton.disabledLeft" @click="scroll(true)"><i class="icon el-icon-caret-left"></i></button>
        <button type="button" :disabled="scrollButton.disabledRight" @click="scroll(false)"><i class="icon el-icon-caret-right"></i></button>
      </div>
    </div>
    <ul class="tabs-content list-unstyled">
      <li v-for="tab in tabs" :key="tab.seqId" v-show="tab.seqId === currentTab" class="content-wrap">
        <div :is="tab.id" :params="tab.params"></div>
      </li>
    </ul>
  </div>
  <div v-else class="empty-tabs">
    ......
  </div>
</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { appFrameTypes } from '@/store/types'
export default {
  data () {
    return {
      firstTypeList: []
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.appFrame.tabs,
      currentTab: state => state.appFrame.currentTab,
      scrollButton: state => state.appFrame.scrollButton
    })
  },
  async mounted () {
  },
  methods: {
    ...mapActions({
      removeTab: appFrameTypes.A.REMOVE_TAB,
      scroll: appFrameTypes.A.SCROLL,
      activeTab: appFrameTypes.A.ACTIVE_TAB,
      addTab: appFrameTypes.A.ADD_TAB
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixins.less";
@import "../../assets/styles/colors.less";

@tabHeight: 40px;

section {
  height: 100%;
  width: 100%;
}

.tabs-wrap {
  height: 90%;
  position: relative;
  padding-top: 10px;
}
.tabs-header {
  padding: 0 10px;
  white-space: nowrap;
  border-bottom: 1px solid @grey300;
  position: relative;
  padding-right: 50px;
  .oper-list {
    .absolute(10px, 10px, auto, auto);
    background-color: @white;
    button {
      background-color: @white;
      border: 1px solid @grey300;
      display: inline-block;
      padding: 0;
      outline: none;
      text-align: center;
      cursor: pointer;
      &[disabled] {
        opacity: 0.5;
        cursor: auto;
        &:hover .icon {
          color: @blue;
        }
      }
      &:hover .icon {
        transition: all 0.2s;
        color: @blue800;
      }
    }
    .icon {
      font-size: 12px;
      color: @blue;
    }
  }
  ul {
    overflow: hidden;
    &.full {
      border-right: 1px solid @grey300;
    }
  }
  li {
    display: inline-block;
    color: @grey700;
    background-color: @grey50;
    transition: background-color 0.2s;
    cursor: pointer;
    border-right: 1px solid @grey300;
    border-top: 1px solid @grey300;
    display: inline-block;
    padding: 0 15px;
    font-size: 14px;
    padding: 10px;
    position: relative;
    &.active {
      color: @black;
      border-top: 2px solid @blue;
    }
    &:first-child {
      border-left: 1px solid @grey300;
    }
    .el-icon-close {
      padding-left: 8px;
      font-size: 12px;
      color: @grey700;
      transition: all 0.2s;
      cursor: pointer;
      &:hover {
        color: @black;
      }
    }
    a {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 90px;
      display: inline-block;
      line-height: 12px;
    }
  }
}
.tabs-content {
  .absolute(@tabHeight + 9, 0, 0, 0);
  transition: all 0.2s;
  li.content-wrap {
    height: 100%;
    padding: 10px;
    overflow: auto;
  }
}
.article-view {
  height: 100%;
  padding: 10px;
  overflow: auto;
  margin: 0 auto;
  max-width: 1100px;
}
</style>

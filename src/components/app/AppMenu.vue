<template>
<section class="app-menu">
  <div class="menu-tabs-title">功能导航</div>
  <div class="fun-menu">
    <ul class="list-unstyled top-fun-menu">
      <li v-auth="'ls01'">
        <div class="top-name clearfix" @click="showCompose = !showCompose">
          <div class="col-4">
            <i class="icon el-icon-menu"></i>
          </div>
          <div class="col-6">
            课程管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showCompose, 'el-icon-arrow-down': !showCompose}"></i>
          </div>
        </div>
        <ul v-show="showCompose" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0101'"><i class="icon line"></i><a @click="addTab('course-list')"><i class="icon yuan"></i>课程查询</a></li>
          <li v-auth="'ls0102'"><i class="icon line"></i><a @click="addTab('course-create')"><i class="icon yuan"></i>课程创建</a></li>
        </ul>
      </li>
      <li v-auth="'ls02'">
        <div class="top-name clearfix" @click="showStatement = !showStatement">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            课件管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showStatement, 'el-icon-arrow-down': !showStatement}"></i>
          </div>
        </div>
        <ul v-show="showStatement" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0201'"><i class="icon line"></i><a @click="addTab('chapter-list')"><i class="icon yuan"></i>课件查询</a></li>
          <li v-auth="'ls0202'"><i class="icon line"></i><a @click="addTab('chapter-create')"><i class="icon yuan"></i>新建课件</a></li>
        </ul>
      </li>
      <li v-auth="'ls03'">
        <div class="top-name clearfix" @click="showOrder = !showOrder">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            预约管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showOrder, 'el-icon-arrow-down': !showOrder}"></i>
          </div>
        </div>
        <ul v-show="showOrder" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0301'"><i class="icon line"></i><a @click="addTab('ls-room-info')"><i class="icon yuan"></i>单次预约查询</a></li>
          <li v-auth="'ls0302'"><i class="icon line"></i><a @click="addTab('create-ls-room-info')"><i class="icon yuan"></i>单次预约创建</a></li>
          <li v-auth="'ls0303'"><i class="icon line"></i><a @click="addTab('chapter-term-page')"><i class="icon yuan"></i>等级预约查询</a></li>
          <li v-auth="'ls0304'"><i class="icon line"></i><a @click="addTab('chapter-term-create')"><i class="icon yuan"></i>等级预约创建</a></li>
        </ul>
      </li>
      <li v-auth="'ls06'">
        <div class="top-name clearfix" @click="showStudents = !showStudents">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            学生管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showStudents, 'el-icon-arrow-down': !showStudents}"></i>
          </div>
        </div>
        <ul v-show="showStudents" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0601'"><i class="icon line"></i><a @click="addTab('student-list')"><i class="icon yuan"></i>学生列表</a></li>
        </ul>
      </li>
      <li v-auth="'ls07'">
        <div class="top-name clearfix" @click="showTeacher = !showTeacher">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            教师管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showTeacher, 'el-icon-arrow-down': !showTeacher}"></i>
          </div>
        </div>
        <ul v-show="showTeacher" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0701'"><i class="icon line"></i><a @click="addTab('teacher-list')"><i class="icon yuan"></i>教师列表</a></li>
          <li v-auth="'ls0701'"><i class="icon line"></i><a @click="addTab('teacher-add')"><i class="icon yuan"></i>添加教师</a></li>
        </ul>
      </li>
      
      <li v-auth="'ls08'">
        <div class="top-name clearfix" @click="showDeviceCheck = !showDeviceCheck">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            网络检测
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showDeviceCheck, 'el-icon-arrow-down': !showDeviceCheck}"></i>
          </div>
        </div>
        <ul v-show="showDeviceCheck" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0801'"><i class="icon line"></i><a @click="addTab('ls-revice-check-list')"><i class="icon yuan"></i>网络检测列表</a></li>
        </ul>
      </li>
      <!-- 管理员全权限控制 -->
      <li v-auth="'ls04'">
        <div class="top-name clearfix" @click="showSysUser = !showSysUser">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            系统用户管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showSysUser, 'el-icon-arrow-down': !showSysUser}"></i>
          </div>
        </div>
        <ul v-show="showSysUser" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0401'"><i class="icon line"></i><a @click="addTab('sysuser-list')"><i class="icon yuan"></i>系统用户查询</a></li>
          <li v-auth="'ls0402'"><i class="icon line"></i><a @click="addTab('sysuser-create')"><i class="icon yuan"></i>系统用户创建</a></li>
          <li v-auth="'ls0403'"><i class="icon line"></i><a @click="addTab('studen-teacher-list')"><i class="icon yuan"></i>学生老师查询</a></li>
        </ul>
      </li>
      <li v-auth="'ls05'">
        <div class="top-name clearfix" @click="showbackground = !showbackground">
          <div class="col-4">
            <i class="iconfont icon-gongzuotai"></i>
          </div>
          <div class="col-6">
            后台管理
          </div>
          <div class="col-2">
            <i class="icon" :class="{'el-icon-arrow-up': showbackground, 'el-icon-arrow-down': !showbackground}"></i>
          </div>
        </div>
        <ul v-show="showbackground" class="list-unstyled child-fun-menu">
          <li v-auth="'ls0501'"><i class="icon line"></i><a @click="addTab('ls-role-page')"><i class="icon yuan"></i>角色管理</a></li>
          <li v-auth="'ls0502'"><i class="icon line"></i><a @click="addTab('ls-privilege')"><i class="icon yuan"></i>资源管理</a></li>
        </ul>
      </li>
    </ul>
  </div>
</section>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import {
  appFrameTypes
} from '@/store/types'

export default {
  data() {
    return {
      showCompose: true,
      showWorkbench: true,
      showOrder: true,
      showbackground: true,
      showStatement: true,
      showStudents: true,
      showTeacher: true,
      showSysUser: true,
      showDeviceCheck: true
    }
  },
  computed: {
    ...mapState({
      currentTab: state => state.appFrame.currentTab
    })
  },
  mounted() {
    // 默认打开系统首页
    if (!this.currentTab) {
      this.addTab('home')
    }
  },
  methods: {
    ...mapActions({
      addTab: appFrameTypes.A.ADD_TAB
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
@import '../../assets/styles/colors.less';
section {
    height: 100%;
    background-color: #f6f2ed;
}
.menu-tabs-title {
    font-size: 14px;
    border-bottom: 1px solid #ded9d3;
    padding: 10px 10px 10px 20px;
    color: #333;
}
.fixed-menu {
    li {
        border-bottom: 1px solid #ded9d3;
        color: #666;
        font-size: 14px;
        cursor: pointer;
        & > div {
            padding: 15px;
            div {
                padding: 1px;
            }
            &:first-child {
                border-right: 1px solid #ded9d3;
            }
            &:hover {
                transition: all 0.3s;
                background-color: #ede7e0;
            }
        }
    }
    .iconfont {
        color: #999;
        font-size: 18px;
        &.icon-shouyeshouye {
            color: #18baf5;
        }
    }
}

.access-wrap {
    font-size: 14px;
    padding-top: 5px;
}

.top-fun-menu {
    font-size: 14px;
    color: #333;
    background-color: #c6c0b3;
    cursor: pointer;
    & > li:not(:last-child) {
        border-bottom: 1px solid #ded9d3;
    }
    .icon,
    .iconfont {
        color: #666;
    }
    .top-name {
        padding: 15px 10px;
        & > div {
            &:first-child {
                padding-left: 20px;
            }
        }
    }
}

.child-fun-menu {
    background-color: #e7e4dc;
    margin-left: -4px;
    font-size: 12px;
    padding-left: 40px;
    li {
        display: block;
        padding: 10px 10px 10px 15px;
        border-left: 2px solid #c6c0b3;
        position: relative;
        &:last-child .line::before {
            content: ' ';
            width: 2px;
            height: 16px;
            display: inline-block;
            background-color: #e7e4dc;
            position: relative;
            top: 2px;
            left: -2px;
        }
        .line {
            display: inline-block;
            height: 2px;
            width: 10px;
            background-color: #c6c0b3;
            .absolute(17px, auto, auto, 0);
        }
        a {
            padding: 3px 5px;
            cursor: pointer;
            &:hover {
                transition: all 0.3s;
                background-color: #c6c0b3;
                border-radius: 10px;
                .yuan {
                    transition: all 0.3s;
                    border-color: #666;
                }
            }
            .yuan {
                display: inline-block;
                height: 12px;
                width: 12px;
                border-radius: 50%;
                border: 2px solid #c6c0b3;
                margin-right: 8px;
                position: relative;
                top: 2px;
            }
        }
    }
}
</style>

import Vue from 'vue'
export const pageMaps = [{
  id: 'home',
  name: '系统首页',
  component: require('@/components/pages/home/Home'),
  lock: true
}, {
  id: 'test',
  name: '测试显示',
  component: require('@/components/pages/test/test')
}, {
  id: 'ls-room-info',
  name: '单次预约查询',
  component: require('@/components/pages/lsroominfo/lsRoomInfoPage')
}, {
  id: 'create-ls-room-info',
  name: '新建单次预约',
  component: require('@/components/pages/lsroominfo/lsRoomInfoCreate')
}, {
  id: 'studen-teacher-list',
  name: '学生老师查询',
  component: require('@/components/pages/lsroominfo/selectUserPage')
}, {
  id: 'course-list',
  name: '课程查询',
  component: require('@/components/pages/course/courseListPage')
}, {
  id: 'course-create',
  name: '新建课程',
  component: require('@/components/pages/course/courseCreatePage')
}, {
  id: 'chapter-list',
  name: '课件查询',
  component: require('@/components/pages/chapter/chapterListPage')
}, {
  id: 'chapter-create',
  name: '新建课件',
  component: require('@/components/pages/chapter/chapterCreatePage')
}, {
  id: 'chapter-update-status',
  name: '课件审核',
  component: require('@/components/pages/chapter/chapterUpdateStatusPage')
}, {
  id: 'chapter-update-seq',
  name: '课件顺序更新',
  component: require('@/components/pages/chapter/chapterUpdateSeqPage')
}, {
  id: 'chapter-term-page',
  name: '等级预约查询',
  component: require('@/components/pages/classInfo/classInfoPage')
}, {
  id: 'chapter-term-create',
  name: '等级预约创建',
  component: require('@/components/pages/lsroominfo/termLsRoomInfoCreate')
}, {
  id: 'ls-role-page',
  name: '角色创建',
  component: require('@/components/pages/role/rolePage')
}, {
  id: 'ls-privilege',
  name: '权限查看',
  component: require('@/components/pages/privilege/privilegeTree')
}, {
  id: 'sysuser-create',
  name: '系统用户创建',
  component: require('@/components/pages/sysuser/sysUserCreatePage')
}, {
  id: 'sysuser-list',
  name: '系统用户查询',
  component: require('@/components/pages/sysuser/sysUserListPage')
}, {
  id: 'student-list',
  name: '学生列表',
  component: require('@/components/pages/student/studentListPage')
}, {
  id: 'teacher-list',
  name: '教师列表',
  component: require('@/components/pages/teacher/teacherListPage')
}, {
  id: 'teacher-add',
  name: '添加教师',
  component: require('@/components/pages/teacher/teacherAddPage')
}, {
  id: 'ls-revice-check-list',
  name: '网络检测',
  component: require('@/components/pages/revice/reviceCheckResultPage')
}]
// 预先将组件注册
const components = {}
pageMaps.forEach(({
  id,
  component
}) => {
  if (id && component) {
    components[id] = component
  }
})
Vue.mixin({
  components
})

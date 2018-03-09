import Vue from 'vue'
export const pageMaps = [{
  id: 'home',
  name: '系统首页',
  component: require('@/components/pages/home/Home'),
  lock: true
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

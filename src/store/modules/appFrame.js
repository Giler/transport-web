import Vue from 'vue'
import { appFrameTypes } from '@/store/types'
import { pageMaps } from '@/components/pages/'
// initial state
const state = {
  tabs: [],
  currentTab: '',
  scrollButton: {
    show: false,
    disabledLeft: false,
    disabledRight: false
  },
  cbs: []
}

const triggerCallback = (cbs, tab) => {
  cbs.forEach(cb => {
    cb(tab)
  })
}

// actions
const actions = {
  [appFrameTypes.A.CALC_SCROLL_BUTTON]({ state, commit }, scrollRight = false) {
    Vue.nextTick(() => {
      const $tabs = document.querySelector('.tabs-wrap .tabs-header ul')
      let {scrollWidth, offsetWidth, scrollLeft} = $tabs
      const scrollButton = {...state.scrollButton}
      if (offsetWidth === scrollWidth) {
        scrollButton.show = false
      } else {
        scrollButton.show = true
        let currentWidht = offsetWidth + scrollLeft
        if (scrollRight) {
          const suStep = scrollWidth - currentWidht
          $tabs.scrollLeft = suStep
          currentWidht = scrollWidth
          scrollLeft = suStep
        }
        if (scrollLeft === 0) {
          scrollButton.disabledLeft = true
        } else {
          scrollButton.disabledLeft = false
        }
        if (currentWidht === scrollWidth) {
          scrollButton.disabledRight = true
        } else {
          scrollButton.disabledRight = false
        }
      }
      commit(appFrameTypes.UPDATE_SCROLL_BUTTON, scrollButton)
    })
  },
  [appFrameTypes.A.SCROLL]({ dispatch }, isLeft = true) {
    const $tabs = document.querySelector('.tabs-wrap .tabs-header ul')
    const {scrollWidth, offsetWidth, scrollLeft} = $tabs
    const currentWidht = offsetWidth + scrollLeft
    let step = 50
    if (isLeft) {
      step = -(scrollLeft < step ? scrollLeft : step)
    } else {
      const suStep = scrollWidth - currentWidht
      step = suStep > 50 ? step : suStep
    }
    $tabs.scrollLeft = scrollLeft + step
    // 滚动按钮控制
    dispatch(appFrameTypes.A.CALC_SCROLL_BUTTON)
  },
  [appFrameTypes.A.ADD_TAB]({ state, commit, dispatch }, component) {
    if (!component) {
      return
    }
    if (typeof component === 'string') {
      component = {id: component}
    }
    const { id, link } = component
    // link为外链，直接open
    if (link) {
      window.open(link)
      return
    }

    // 生成唯一id
    const seqId = encodeURIComponent(JSON.stringify(component))
    const { tabs, currentTab } = state
    // 已经打开
    if (currentTab === seqId) {
      return
    }
    // 定位tab
    let tab = null
    tabs.forEach(page => {
      if (tab) {
        return false
      }
      if (page.seqId === seqId) {
        tab = page
      }
    })
    if (!tab) {
      // 必须在index.js中定义
      const pages = pageMaps.filter(page => page.id === id)
      if (!pages.length) {
        console.error(`${id}必须在src/components/pages/index.js中注册!`)
        return
      }
      // 构成新组件
      tab = Object.assign({}, pages[0], component, {seqId})
      commit(appFrameTypes.ADD_TAB, tab)
    }
    dispatch(appFrameTypes.A.ACTIVE_TAB, tab)
    // 滚动按钮控制
    dispatch(appFrameTypes.A.CALC_SCROLL_BUTTON, true)
  },
  [appFrameTypes.A.REMOVE_TAB]({ state, commit, dispatch }, seqId) {
    const { tabs, currentTab } = state
    let index = -1
    // 找到tab的索引
    tabs.forEach((tab, i) => {
      if (tab.seqId === seqId) {
        index = i
        return false
      }
    })
    // 打开相邻的标签
    if (tabs.length === 1) {
      dispatch(appFrameTypes.A.ACTIVE_TAB, '')
    } else if (currentTab === seqId) {
      if (index === 0) {
        dispatch(appFrameTypes.A.ACTIVE_TAB, tabs[index + 1])
      } else {
        dispatch(appFrameTypes.A.ACTIVE_TAB, tabs[index - 1])
      }
    }
    commit(appFrameTypes.REMOVE_TAB, index)
    // 滚动按钮控制
    dispatch(appFrameTypes.A.CALC_SCROLL_BUTTON)
  },
  [appFrameTypes.A.ACTIVE_TAB]({ state, commit, dispatch }, tab) {
    commit(appFrameTypes.ACTIVE_TAB, tab.seqId)
    state.cbs.length && triggerCallback(state.cbs, tab)
  }
}
  // mutations
const mutations = {
  [appFrameTypes.ADD_TAB](state, tab) {
    state.tabs.push(tab)
  },
  [appFrameTypes.ACTIVE_TAB](state, seqId) {
    state.currentTab = seqId
  },
  [appFrameTypes.WATCH_TAB](state, cb) {
    if (cb && typeof cb === 'function') {
      state.cbs.push(cb)
    }
  },
  [appFrameTypes.REMOVE_TAB](state, index) {
    state.tabs.splice(index, 1)
  },
  [appFrameTypes.UPDATE_SCROLL_BUTTON](state, scrollButton) {
    state.scrollButton = scrollButton
  }
}

export default {
  state,
  actions,
  mutations
}

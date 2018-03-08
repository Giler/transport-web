<template>
<section>
  <nav>
    <app-navbar></app-navbar>
  </nav>
  <menu :class="{expend: menuExpend}">
    <app-menu></app-menu>
  </menu>
  <i @click="toggleMenu" class="iconfont expend-oper" :class="{'icon-shouqi': menuExpend, 'icon-zhankai': !menuExpend}"></i>
  <main :class="{'menu-expend': menuExpend}">
    <app-frame></app-frame>
  </main>
</section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { appIndexTypes, appFrameTypes } from '@/store/types'
import { getLoginUrl } from '@/common/settings'
import AppNavbar from './AppNavbar'
import AppMenu from './AppMenu'
import AppFrame from './AppFrame'
import '../pages/'
export default {
  name: 'Index',
  computed: {
    ...mapState({
      menuExpend: state => state.appIndex.menuExpend
    })
  },
  created() {
    if (!this.checkBrowser()) {
      window.alert('请使用谷歌、火狐、Opera或IE9以上浏览器访问本系统！')
      window.location.href = getLoginUrl()
    }
  },
  methods: {
    ...mapMutations({
      toggleMenu: appIndexTypes.TOGGLE_MENU
    }),
    ...mapActions({
      addTab: appFrameTypes.A.ADD_TAB
    }),
    checkBrowser() {
      const agent = navigator.userAgent.toLowerCase()
      if ((agent.indexOf('msie') >= 0) && (agent.indexOf('opera') < 0)) {
        const fIEVersion = agent.match(/msie ([\d.]+)/)[1]
        if (fIEVersion >= 9) {
          return true
        }
      } else if (agent.indexOf('chrome') >= 0) {
        return true
      } else if (agent.indexOf('opera') >= 0) {
        return true
      } else if (agent.indexOf('firefox') >= 0) {
        return true
      }
      return false
    },
    logout() {
      window.location.href = getLoginUrl()
    }
  },
  components: {
    AppNavbar,
    AppMenu,
    AppFrame
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/vars.less';
@import '../../assets/styles/mixins.less';
@menuWidth: 200px;
section {
  height: 100%;
  background-color: #fff;
  position: relative;
}

nav {
  height: @appNavHeight;
}

.expend-oper {
  cursor: pointer;
  text-align: center;
  color: #666;
  z-index: 1;
  .absolute(@appNavHeight + 10, auto, auto, @menuWidth - 30px);
  &.icon-zhankai {
    left: 0;
  }
  &:hover {
    transition: all 0.2s;
    color: #333;
  }
}
menu {
  margin: 0;
  padding: 0;
  border-right: 1px solid #ccc;
  overflow: auto;
  .absolute(@appNavHeight, auto, 0, -@menuWidth);
  transition: all 0.2s;
  width: @menuWidth;
  &.expend {
      left: 0;
  }
}

main {
  transition: all .2s;
  .absolute(@appNavHeight, 0, 0, 0);
  &.menu-expend {
    left: @menuWidth;
  }
}
</style>

import { appIndexTypes } from '@/store/types'

// initial state
const state = {
  menuExpend: true
}
// mutations
const mutations = {
  [appIndexTypes.TOGGLE_MENU](state) {
    state.menuExpend = !state.menuExpend
  }
}

export default {
  state,
  mutations
}

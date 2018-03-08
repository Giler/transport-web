import {createModules} from '@/libs/module'

export const appIndexTypes = createModules('appIndex', {
  M: ['TOGGLE_MENU']
})

export const appFrameTypes = createModules('appFrame', {
  A: ['ADD_TAB', 'ACTIVE_TAB', 'REMOVE_TAB', 'SCROLL', 'CALC_SCROLL_BUTTON'],
  M: ['ADD_TAB', 'ACTIVE_TAB', 'REMOVE_TAB', 'UPDATE_SCROLL_BUTTON', 'WATCH_TAB']
})

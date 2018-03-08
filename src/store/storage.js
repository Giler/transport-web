import { debounce } from 'lodash'
export default function saveAndBack(store) {
  const storage = window.localStorage
  const saveState = storage.getItem('state')
  if (saveState) {
    store.replaceState(JSON.parse(saveState))
  }
  store.subscribe(debounce((mutation, state) => {
    const newState = JSON.stringify(state)
    const oldState = storage.getItem('state')
    if (newState !== oldState) {
      storage.setItem('state', newState)
    }
  }, 200))
}

export async function updateSearchHistory(searchContent, type) {
  let storage = window.localStorage
  const user = 'wanghai'
  let history = storage.getItem(user.userId + type + 'searchHistory')
  let newhistory = JSON.parse(history)
  if (!history) { // 第一次存放历史数据
    newhistory = []
    newhistory.push([searchContent, 1])
  } else { // 更新搜索历史
    let val = 1
    for (let nhi = 0; nhi < newhistory.length; nhi++) {
      let nh = newhistory[nhi]
      if (nh[0] === searchContent) {
        val = val + nh[1]
        newhistory.splice(nhi, 1)
        break
      }
    }
    if (newhistory.length < 1) {
      newhistory.push([searchContent, val])
    } else { // 搜索数据向上冒泡
      for (let nhj = 0; nhj < newhistory.length; nhj++) {
        let nh = newhistory[nhj]
        if (nh[1] <= val) {
          newhistory.splice(nhj, 0, [searchContent, val])
          break
        } else if (nhj === (newhistory.length - 1)) {
          newhistory.push([searchContent, val])
          break
        }
      }
    }
  }
  storage.setItem(user.userId + type + 'searchHistory', JSON.stringify(newhistory))
  // console.log(window.localStorage)
}

export async function getSearchHistory(num, type) { // 获得前num位历史数据
  const user = 'wanghai'
  let storage = window.localStorage
  let history = storage.getItem(user.userId + type + 'searchHistory')
  let newhistory = JSON.parse(history)
  // console.log(window.localStorage)
  if (newhistory) {
    return newhistory.slice(0, num)
  } else {
    return []
  }
}

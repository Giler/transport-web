// import {
//   get
// } from 'fetch-request'

// 查询课件列表

export const getChapterPage = params => {
  return this.$api.get('/ls/chapter/getPage', params)
}

export const getLastChapter = params => {
  return this.$api.get('/ls/chapter/getLastChapter', params)
}

// // 上传附件
// export const uploadFile = params => {
//   return post('/ls/chapter/uploadFile', params)
// }

// 创建课件
export const createChapter = params => {
  return this.$api.get('/ls/chapter/add', params)
}

// 更新课件
export const updateStatus = params => {
  return this.$api.get('/ls/chapter/updateStatus', params)
}

// 更新课件
export const updateSeq = params => {
  return this.$api.get('/ls/chapter/updateSeq', params)
}

// 更新课件
export const updateNewSeq = params => {
  return this.$api.get('/ls/chapter/updateNewSeq', params)
}

// 删除课件
export const deleteChapter = params => {
  return this.$api.get('/ls/chapter/delete', params)
}

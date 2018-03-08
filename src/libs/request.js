import { Message } from 'element-ui'
import { getApiHost, getLoginUrl } from '@/common/settings'

const toQueryStr = params => {
  const queryStrs = []
  flatPath(params).forEach(({key, value}) => {
    if (typeof value === 'undefined') {
      value = ''
    }
    value = encodeURIComponent(value)
    queryStrs.push(`${key}=${value}`)
  })
  return queryStrs.join('&')
}

/**
 * 递归拉平params
 */
const flatPath = (obj, paths = []) => {
  let values = []
  if (typeof obj === 'object') {
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        const newPaths = [...paths]
        newPaths.push(p)
        values = values.concat(flatPath(obj[p], newPaths))
      }
    }
  } else if (paths.length) {
    values.push({
      key: paths.join('.'),
      value: obj
    })
  }
  return values
}

const checkInternalStatus = resp => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp
  } else {
    const error = new Error(resp.statusText)
    error.resp = resp
    throw error
  }
}

const checkBizStatus = resp => {
  if (resp.status === 200) {
    return resp
  } else if (resp.status === 401) { // 未登录
    window.location.href = getLoginUrl()
  } else {
    // 这里处理errorCode为其他的情况
    const error = new Error(resp.message || '未知错误')
    error.resp = resp
    throw error
  }
}

const request = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!options.headers) {
      options.headers = {}
    }
    // 跨域携带cookies信息，如果不需要跨域则注释掉这行
    options.credentials = 'include'
    options.headers['Accept'] = 'application/json'
    /* eslint-disable no-undef  */
    fetch(`${getApiHost()}${url}`, options)
    .then(checkInternalStatus)
    .then(resp => resp.json())
    .then(checkBizStatus)
    .then(({data}) => resolve(data))
    .catch(err => {
      Message.error(String(err)).showClose = true
      reject(err)
    })
  })
}

export const post = (url, params = {}) => {
  const queryStr = toQueryStr(params)
  // const queryStr = JSON.stringify(params)
  const options = {
    method: 'POST',
    body: queryStr,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Content-Type': 'text/plain'
      // 'Content-Type': 'application/json'
    }
  }
  return request(url, options)
}

export const get = (url, params = {}) => {
  params['__time'] = new Date().getTime()
  const queryStr = toQueryStr(params)
  const options = {
    method: 'GET'
  }
  return request(url + '?' + queryStr, options)
}

export const put = (url, params = {}) => {
  params['_method'] = 'PUT'
  return post(url, params)
}

export const patch = (url, params = {}) => {
  params['_method'] = 'PATCH'
  return post(url, params)
}

export const del = (url, params = {}) => {
  params['_method'] = 'DELETE'
  return post(url, params)
}

export default get

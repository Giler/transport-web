import 'whatwg-fetch'
import isArray from 'lodash/isArray'

// 将参数转换为queryStr
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
        if (isArray(obj)) {
          // 数组情况需要组装成[0]格式
          let lastPath = newPaths.splice(paths.length - 1, 1)
          newPaths.push(`${lastPath}[${p}]`)
        } else {
          newPaths.push(p)
        }
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
// return request(url + '?' + queryStr, options)
export {
  toQueryStr
}

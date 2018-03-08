/**
 * 判断对象是否为空(没有key)
 */
export const isEmptyObject = obj => {
  return !obj || Object.keys(obj).length === 0
}

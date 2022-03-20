/**
 * 定义一个不可遍历的响应式对象
 * @param {*} value 
 * @param {*} key 
 * @param {*} val 
 * @param {*} enumerable 
 */
export function def(value, key, val, enumerable) {
  Object.defineProperty(value, key, {
    configurable:true,
    writable: true,
    enumerable:!!enumerable,
    value:val
  })
}

/**
 * 将以逗号拼接的标签字符串构建成map结构，返回数组
 * @param {*} str 标签字符串
 * @param {*} toLowerCase 是否将map的key(标签)小写
 */
export function makeMap(str, toLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for(let i=0, l=list.length;i<l;i++) {
    map[list[i]] = true
  }
  return toLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}
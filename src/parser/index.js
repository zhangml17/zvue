
import { parseHtml } from './html-parser'
/**
 * 创建ast节点
 * @param {*} tag  标签名
 * @param {*} attrs 节点属性
 * @param {*} parent 当前节点的父节点
 */
export function createASTElement(tag, attrs, parent) {
  return {
    type:1,
    tag,
    attrsList:attrs,
    parent,
    children:[]
  }
}
export function parse(template, options) {
  let ast = {}
  let currentParent
  
  parseHtml(template, {
    isUnaryTag:true, // 是否是自闭和标签
    start(tag, attrs, unary, start, end) {
      let element = createASTElement(tag, attrs, currentParent)
    },
    end() {},
    chars() {},
    comment() {}
  })
  return ast
}
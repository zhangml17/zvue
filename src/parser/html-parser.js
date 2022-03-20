import { makeMap } from '../utils/index'

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!\--/
const conditionalComment = /^<!\[/      // 条件注释的正则

export function parseHtml(html, options) {
  const stack = [] // 通过进、出栈来确保标签成对
  const expectHtml = true
  // 判断是否自闭合标签的方法
  const isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr')
  let index = 0
  let last, lastTag
  // 通过指针移动遍历模板字符串，解析
  while(html) {
    last = html
    if(!lastTag) {
      let textEnd = html.indexOf('<') // 文本节点的结束标记，即<之前的均为文本
      if(textEnd === 0) {
        if(comment.test(html)) { // 注释节点开始标记
          const commentEnd = html.indexOf('-->')
          if(commentEnd >= 0)
        }
      }
    }
  }
}
import { createCompilerCreator } from './create-compiler.js'
import { parse } from '../parser/index'
import { generate } from './codegen/index'
import { optimize } from './optimizer'

export const createCompiler = createCompilerCreator(function baseCompiler(template, options) {
  const ast = parse(template.trim(), options) // 模板解析，构建ast树
  optimize(ast, options) // 遍历ast树将静态节点打上标记
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
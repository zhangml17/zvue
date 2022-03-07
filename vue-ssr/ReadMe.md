## 手写Vue服务端渲染
### 启动
```
npm install
npm run run-all
node server.js
```
放在浏览器进行就是浏览器渲染，放在服务器进行就是服务器渲染
+ 客户端渲染不利于SEO搜索引擎优化
+ SSR直接将HTML字符串传递给浏览器，加快了首屏加载时间
+ SSR占用更多的CPU和内存资源
+ 在vue中只支持beforeCreate和created两个生命周期
### SSR的运行过程
- 只是首屏做ssr服务端渲染
- 后续的切换逻辑，执行的都是客户端渲染（前端路由切换）
- 用node服务实现ssr（koa）
- 服务端在客户端访问时必须生成独立的vue实例
### 打包过程
- 分客户端和服务端两个入口，服务端使用服务端入口来生成html，客户端入口即保证在浏览器运行即可
- 客户端入口通过webpack打出包含客户端操作行为的bundle.js，服务端入口通过webpack打包出html字符串，两者结合，实现页面，返回给浏览器

### 注意
- vue的版本和vue-server-renderer两个包的版本要一致
- vue-loader的15.x版本的vue-loader-plugin插件才在vue-loader/lib/plugin目录下，@16.x、@17.x版本就没有lib目录
- concurrently 同时执行多条命令
- vue-server-renderer版本为2.6.14，限制了vue只能使用相同版本，同时vue-router版本也要匹配

### 遇到问题
+ 当vue-server-renderer/server-plugin和html-webpack-plugin同时使用时，打包不出.html文件？<br>
解决：server.js中的renderTemplate使用public/index-server.html即可，不必使用打包后的静态文件
+  Failed to mount component: template or render function not defined.<br>
解决：[资料](https://blog.csdn.net/suixaingjun/article/details/88798829)
+ TypeError: template.head is not a function <br>
解决：尚未解决

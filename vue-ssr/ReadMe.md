## 手写Vue服务端渲染
### 启动
```
npm install
cd vue-ssr
npm run client-dev
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

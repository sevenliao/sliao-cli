# sliao-cli
a new cli tools are developed and maintained by me

# cli脚手架 安装
<!-- 
npm i inquirer
npm i ejs
npm link 
-->
# 依赖包已经添加到package，所以直接安装依赖
npm i
npm link 


# 如何使用
1. 新建文件/或者在其他文件夹下
2. 执行：sl-cli
<!-- 即可生成文件 -->


# 新建 步骤
# 1.在package.json中添加bin字段，属性值为"cli.js"
# 2.安装依赖
<!-- 引入inquirer 包
npm i inquirer
因为我们还用到了ejs, 所以引入ejs 
npm i ejs -->
# 3.创建模板 templates
# 4.创建 html
# 5.然后执行关联npm； npm link  (关键一步)


# cli.js 脚手架核心文件说明
/*
 * @description: program.version 调用该命令时 （如 sliao-cli -v） 会带出版本号：x.x.x
 * @description: program.command 定义初始化命令 （如 sliao-cli init <项目名>）
 * @description:  program.action action 是执行command命令时发生的回调
 * @param:  node index.js    init test == sliao-cli init test
 * @returns:  program.prase(process.argv)解析命令行中的参数，解析出name，并传入action回调
 */



```js
欢迎使用sliao-cli脚手架，一个可以生成HTML/REACT/VUE 的脚手架工具，支持git常规命令；
sliao-cli是什么?
  * 一个支持生成 html/react/vue 模板的脚手架工具
(A scaffolding tool that supports generating HTML / react / Vue templates;)
  * 使用：全局安装 -g ( Use: global install - g)
sliao-cli有哪些功能？
  * 初始化框架有(The initialization framework has)
    * 1.html - 干净的html + css文件   ( HTML - clean HTML + CSS file)
    * 2.react - react 框架，直接项目开发  (React - react framework, direct project development)
    * 3.vue - vue 框架，直接项目开发   (Vue - Vue framework, direct project development)

  * git常规命令(git General Command)
    * 1.sliao-cli pull : 进入项目文件，直接执行sliao-cli pull; 拉去新github新代码;
    * 2.sliao-cli commit "desc" : 进入项目文件，直接执行sliao-cli commit '描述文案', commit文件;
    * 3.sliao-cli push : 进入项目文件，直接执行sliao-cli push, 提交最新文件;
    * 4.sliao-cli tag "tagName" : 进入项目文件，直接执行sliao-cli tag tag名, 提交并推送上线，更新最新文件;
```


 ### 如果喜欢这个cli，欢迎打赏一杯咖啡
 ### If you like this cli, you are welcome to enjoy a cup of coffee
  * ![WeChat](http://13culb.com/zhibo/images/pay.jpg)
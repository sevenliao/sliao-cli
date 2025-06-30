## sliao-cli是什么?
  * 一个支持生成 html/react/vue 模板的脚手架工具
(A scaffolding tool that supports generating HTML / react / Vue templates;)
  * 使用：全局安装 -g ( Use: global install - g)

## sliao-cli有哪些功能？
  * 初始化框架有(The initialization framework has)
    * 1.html - 干净的html + css文件   ( HTML - clean HTML + CSS file)
    * 2.react - react 框架，直接项目开发  (React - react framework, direct project development)
    * 3.vue - vue 框架，直接项目开发   (Vue - Vue framework, direct project development)

  * html模板集成了自定义框架svue(git General Command)
    * 集成一个新研发的框架-svue（v1.0.0）;可以实现基本的数据绑定和点击事件，等……；
    * html模板具备基本的业务开发能力，svue框架包也只有4kb，精简且方便
    * svue 后续将继续完善……
      ```js
            new SVue({
                el: '#app',
                data: {
                    name: "test",
                    title: 'hello world！',
                    btnText: '静态test数据',
                    html: '<button>动态一个按钮</button>',
                    arrData: [
                        {
                            key: 'key1',
                            value: 'val1'
                        },
                        {
                            key: 'key2',
                            value: 'val2'
                        },
                    ]
                },
                created() {
                    console.log('初始化函数');
                },
                methods: {
                    changeName() {
                        this.name = this.btnText;
                        this.title = 'yes';
                    }
                }
            })
      ```

  * git常规命令(git General Command)
    * 1.sliao-cli pull : 进入项目文件，直接执行sliao-cli pull; 拉去新github新代码;
    * 2.sliao-cli commit "desc" : 进入项目文件，直接执行sliao-cli commit '描述文案', commit文件;
    * 3.sliao-cli push : 进入项目文件，直接执行sliao-cli push, 提交最新文件;
    * 4.sliao-cli tag "tagName" : 进入项目文件，直接执行sliao-cli tag tag名, 提交并推送上线，更新最新文件;



## 1.安装（Installation）
 * npm install -g sliao-cli

## 2.创建项目（Create project）
 * sliao-cli init xxx
## 3.进入项目文件（Enter project file）
 * cd ./xx 
## 4.安装项目依赖（Install project dependencies）
 * npm install
## 5.完成（Complete)


## 6.git
### sliao-cli pull
### sliao-cli commit "desc"
### sliao-cli push
### sliao-cli tag "tagName"



## 7.version
### v 1.4.0 (2021-10-17)
 * html模板增加了svue框架，可以直接双向绑定等相关操作
### v 1.3.9 (2021-10-02)
 * html模板放在init name 的name文件下
### v 1.3.8 (2021-09-25)
 * 去除pull和push 指令带分支，减少用户操作成本
 * Remove the branch of pull and push instructions to reduce user operation cost
### v 1.3.0
 * 修复模板自带 .git文件
 * Repair the. Git file that comes with the template



AND ing……





# --------------------share--------------------------


### 关于cli工具开发 分享（About cli tool development and sharing）

### cli-安装（Installation）
<!-- 
npm i inquirer
npm i ejs
npm link 
-->


### 依赖包已经添加到package，所以直接安装依赖
### The dependency package has been added to the package, so install the dependency directly
 * npm i
 * npm link 



### 如何使用
  * 1. 新建文件/或者在其他文件夹下
  * 2. 执行：sl-cli
  * 3. 即可生成文件
### How to use
  * 1. Create a new file / or in another folder
  * 2. Execution: SL cli
  * 3. To generate a file


### 新建 步骤
  *  1.在package.json中添加bin字段，属性值为"cli.js"
  *  2.安装依赖
<!-- 引入inquirer 包
npm i inquirer
因为我们还用到了ejs, 所以引入ejs 
npm i ejs -->
  * 3.创建模板 templates
  * 4.创建 html
  * 5.然后执行关联npm； npm link  (关键一步)

### New step
  * 1. Add the bin field in package.json, and the attribute value is "cli. JS"
  * 2. Installation dependency
<!-- Introducing the inquirer package
npm i inquirer
Because we also use EJS, we introduce EJS
npm i ejs -->
  * 3. Create templates
  * 4. Create HTML
  * 5. Then execute the associated NPM; NPM link (key step)


### cli.js 脚手架核心文件说明
 * @description: program.version 调用该命令时 （如 sliao-cli -v） 会带出版本号：x.x.x
 * @description: program.command 定义初始化命令 （如 sliao-cli init <项目名>）
 * @description:  program.action action 是执行command命令时发生的回调
 * @param:  node index.js    init test == sliao-cli init test
 * @returns:  program.prase(process.argv)解析命令行中的参数，解析出name，并传入action回调

### Description of cli.js scaffold core file
 * @ Description: program.version when calling this command (such as sliao cli - V), the version number: x.x.x will be brought out
 * @ Description: program.command define initialization commands (e.g. Xiao cli init < project name >)
 * @ Description: program.action action is the callback that occurs when executing the command
 * @param: node index.js init test == sliao-cli init test
 * @ returns: program.prase (process. Argv) parses the parameters in the command line, parses the name, and passes in the action callback




 ### 如果喜欢这个cli，欢迎打赏一杯咖啡
 ### If you like this cli, you are welcome to enjoy a cup of coffee
  * ![WeChat](http://13culb.com/zhibo/images/pay.jpg)
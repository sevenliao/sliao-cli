#!/usr/bin/env node

// 设置环境变量的 文件头
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
//commande.js 可以自动的解析命令和参数，用于处理用户输入的命令。
const program = require('commander');
//chalk, 可以给终端的字体加上颜色
const chalk = require('chalk');
//ora, 下载过程久的话，可以用于显示下载过程中的动画效果
const ora = require('ora')
//log-symbols, 可以在终端上显示出 √ 或者 × 等的图标。
const symbols = require('log-symbols');
//chlid_process 创建异步进程（子进程） exec传递的是 command 或 可执行文件
const child_process = require('child_process');
//shell 做的事就是自动化，从耗时的重复性常规动作里解放处理
const shell = require('shelljs');

const {resolve} = require('path');
const { version } = require("commander");

//项目模版封装
const { createHtml, createReact, createVue, createInitReact, createViteProject } = require("./cloneProject");



const filename = `${__dirname}/package.json`;
let versionId = 'v1.0.0'
if(fs.existsSync(filename)){
   const content = fs.readFileSync(filename).toString();
   let dt = JSON.parse(content);
   versionId = dt.version;
}


/**
 * @description: program.version 调用该命令时 （如 sliao-cli -v） 会带出版本号：x.x.x
 * @description: program.command 定义初始化命令 （如 sliao-cli init <项目名>）
 * @description:  program.action action 是执行command命令时发生的回调
 * @param:  node index.js    init test == sliao-cli init test
 * @returns:  program.prase(process.argv)解析命令行中的参数，解析出name，并传入action回调
 */
program.version(chalk.green('======Dark,sliao-cli====== \n  version: '+versionId), '-v, --version').
  command('init <name>').
  action(name => {
    //fs.existsSync 如果路径存在，则返回 true，否则返回 false
    if (!fs.existsSync(name)) {
      console.log(chalk.magentaBright('正在创建项目(Creating project)……'));
      inquirer
        .prompt([
          {
            type: 'rawlist',
            name: 'templateType',
            message: 'your choice:',
            default: 0,
            choices: [
              { value: 1, name: 'Template type: Html' },
              { value: 2, name: 'Template type: React' },
              { value: 3, name: 'Template type: Vue' },
              { value: 4, name: 'Init a React Project' },
              { value: 5, name: 'Create-vite a Project(react、vue……)' },
            ]
          },
          {
            type: "input",
            name: "name",
            message: "project name is ",
          },
          {
            type: "input",
            name: "description",
            message: "project desc is ",
          },
          {
            type: "input",
            name: "author",
            message: "project author is ",
          },
        ])
        .then((answers) => {
          // console.log(answers)
          //{ templateType: [1], name: 'www', description: '123', author: '345' }
          switch(answers.templateType){
            case 1:
              createHtml(__dirname,answers,name)
              break;
            case 2:
              createReact(name, answers)
              break;
            case 3:
              createVue(name, answers)
              break;
            case 4:
              createInitReact(name, answers)
              break;
            case 5:
              createViteProject(name, answers)
              break;
              default:
                console.log(chalk.magentaBright('请选择一个类型模板，重试(Please select a type template and try again)'));
          }
        })
        .catch((error) => {
          // Something else went wrong
          console.log(chalk.red('请正确选择(Please select correctly)\n'))
          throw error;
        });
    } else {
      console.log(symbols.error,chalk.red('项目依旧存在(The project still exists)'));
    }
  })


program.command('pull').
  action(() => {
    const githref = resolve('./');
    const branch = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s&#43;/, '') 

    child_process.exec(`git pull origin ${branch}`, {cwd:githref}, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }else{
          console.log(`* branch           ${branch}     -> FETCH_HEAD`)
          console.log('pull success: \n',stdout)
        }
    });    
  })

program.command('commit <desc>').
  action((desc) => {
    const githref = resolve('./');

    child_process.exec(`git commit -m ${desc}`, {cwd:githref}, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }else{
          console.log('commit success: \n',stdout)
        }
    });    

  })

program.command('push').
  action(() => {
    const githref = resolve('./');
    const branch = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s&#43;/, '') 
    
    child_process.exec(`git push origin ${branch}`, {cwd:githref}, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }else{
          console.log(`* branch           ${branch}     -> FETCH_HEAD`)
          console.log('push success: \n',stdout)
        }
    });   
  })

program.command('tag <tagName>').
  action(() => {
    const githref = resolve('./');

    child_process.exec(`git tag ${tagName}`, {cwd:githref}, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }else{
          child_process.exec(`git push origin ${tagName}`, {cwd:githref}, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }else{
              console.log('tag push success: \n',stdout)
            }
          });  
        }
    });   
  })


const HelpText = `======sliao-cli help desc====== 
| 1.support template          |
|  *HTML/ CREATE/ VUE         |
|   sliao-cli init 'project'  |
|                             |
| 2.support git command       |
|  *pull                      |
|    sliao-cli pull           |
|  *commit                    |
|    sliao-cli commit 'desc'  |
|  *push                      |
|    sliao-cli push           |
===============================
`
program.version(chalk.green(HelpText), '-h, --help')


program.parse(process.argv);




// 获取.git文件
function removeTempleGitFile(fireName,name) {
  const githref = resolve('./');
  const url = githref + '/'+ fireName;
  child_process.exec('cd ', {cwd:url}, function (error, stdout, stderr) {
      if (error !== null) {
          console.log('Please remove the template. Git file yourself\n' + error);
      }else{
        fs.exists(url+'/.git', function(exists) {
          // console.log(exists ? "文件存在(File exists)" : "文件不存在(file not exist)");
          if(exists){
            console.log('**************** Tips ****************************')
            console.log('   *第一次，请自行上传到自己项目github仓库')
            console.log('      (For the first time, please upload it to your project GitHub warehouse)')
            console.log('   *后面可以直接使用 sliao-cli pull；commit <desc>等命令')
            console.log('      (Later, you can directly use sliao cli pull; Commit < desc > and other commands )')
            console.log('    ')
            console.log('    ')
            console.log('   *模板生成完成，可以进行项目开发啦……')
            console.log('      (After the template generation is completed, you can carry out project development)')
            console.log('************** Tips - end ************************')
            
            deleteall(url+'/.git')
          }else{
            console.log(".git not exist)");
          }
        });
      }
  });    
}
// 删除文件夹及文件
function deleteall(path) {
  var files = [];
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteall(curPath);
      } else { 
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


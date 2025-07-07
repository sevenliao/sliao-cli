#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
//chalk, 可以给终端的字体加上颜色
const chalk = require('chalk');
//ora, 下载过程久的话，可以用于显示下载过程中的动画效果
const ora = require('ora')
//log-symbols, 可以在终端上显示出 √ 或者 × 等的图标。
const symbols = require('log-symbols');
//chlid_process 创建异步进程（子进程） exec传递的是 command 或 可执行文件
const child_process = require('child_process');
const { execSync } = require('child_process');
//shell 做的事就是自动化，从耗时的重复性常规动作里解放处理
const shell = require('shelljs');
const {resolve} = require('path');


//静态文案
const { downloading, stoppedMsg } = require("./language");


// THML 模板
function createHtml (__dirname, answers,name){
  // 模板目录
  const tmlDir = path.join(__dirname, "templates");
  // 目标目录
  const destDir = process.cwd()+'/'+ name;
  // 读取模板文件,将模板下的文件全部转换到目标目录
  fs.readdir(tmlDir, (err, files) => {
    if (err) throw err;
    fs.mkdir(name,(err)=>{
      if(err) throw err;
        files.forEach((file) => {
          // console.log(file);
          // 通过模板引擎渲染文件
          ejs.renderFile(path.join(tmlDir, file), answers, (error, result) => {
            if (error) throw error;
            // console.log(result)
            // 将结果写入模板
            fs.writeFileSync(path.join(destDir, file), result);
          });
        });
        console.log('create a svue html templates');
      })
  });
}

// React 初始化项目
function createInitReact (name, answers){
    const spinner = ora(downloading);
    spinner.start();
    //可使用download 或者 child_process
    const appName = 'my-react-app'; // 自定义应用名称
    const projectPath = path.join(__dirname, appName);
    try {
      console.log('Creating React application...');
      execSync(`npx create-react-app ${appName}`, { stdio: 'inherit' });
      console.log(`Create React application success! path: ${projectPath}`);
      spinner.succeed();
    } catch (error) {
      // console.error('创建失败:', error.message);
      console.log(symbols.error, chalk.red('create fail\n',error.message))
      spinner.file()
    }
}
// React 模板
function createReact (name, answers){
    const spinner = ora(downloading);
    
    spinner.start();
    //可使用download 或者 child_process
    url = 'https://github.com/13club/create-react-app.git'
    const fireName = 'create-react-app';
    child_process.exec('git clone ' + url, function (err) {
      if (err) {
          console.log(symbols.error, chalk.red('Template loading failed\n',err))
          console.log(symbols.error, chalk.red(stoppedMsg))
          spinner.file()
      } else {
        spinner.succeed();

        //将要移动的文件 移动到目标文件  xxx -> __dirname/<projectName>
        //__dirname 当前模块的目录名
        // shell你可以理解为一个类似cmd的攻击
        shell.mv(__dirname + '/'+ fireName, __dirname + '/' + name)
        const filename = `${fireName}/package.json`;
        const meta = {
          name,
          description: answers.description,
          author: answers.author,
        }
        if(fs.existsSync(filename)){
          //读取目录文件的package文件
          const content = fs.readFileSync(filename).toString();
          let dt = JSON.parse(content);
          dt.name = meta.name;
          dt.author = meta.author;
          dt.description = meta.description;
          //改写package.json
          fs.writeFile(filename,JSON.stringify(dt),'utf-8',(err) => {
            if(err){
              console.log('Template create -失败(fail)，reason：',err)
            }else{
              console.log('Template create-成功(success)')
              removeTempleGitFile(fireName,name)
            }
          })
          console.log(symbols.success, chalk.green('Project initialization completed'));
        } else {
          console.log(symbols.error, chalk.red('package 不存在(not exist)'));
        }
      }
    })
}

// Vue 模板
function createVue (name, answers){
  const spinner = ora(downloading);
  spinner.start();
  //可使用download 或者 child_process
  url = 'https://github.com/13club/create-vue-app.git'
  let fireName = 'create-vue-app';
  child_process.exec('git clone ' + url, function (err) {
    if (err) {
      console.log(symbols.error, chalk.red('Template loading failed\n',err))
      console.log(symbols.error, chalk.red(stoppedMsg))
      spinner.file()
    } else {
      spinner.succeed();
      //将要移动的文件 移动到目标文件  xxx -> __dirname/<projectName>
      //__dirname 当前模块的目录名
      // shell你可以理解为一个类似cmd的攻击
      shell.mv(__dirname + '/'+ fireName, __dirname + '/' + name)
      const filename = `${fireName}/package.json`;
      const meta = {
        name,
        description: answers.description,
        author: answers.author,
      }
      if(fs.existsSync(filename)){
        //读取目录文件的package文件
        const content = fs.readFileSync(filename).toString();
        let dt = JSON.parse(content);
        dt.name = meta.name;
        dt.author = meta.author;
        dt.description = meta.description;
        //改写package.json
        fs.writeFile(filename,JSON.stringify(dt),'utf-8',(err) => {
          if(err){
            console.log('Template create-失败(fail)，原因：',err)
          }else{
            console.log('Template create-成功(success)')
            removeTempleGitFile(fireName,name)
          }
        })
        console.log(symbols.success, chalk.green('Project initialization completed'));
      } else {
        console.log(symbols.error, chalk.red('package 不存在(not exist)'));
      }
    }
  })

}

// create-vite a project
function createViteProject (name, answers){
    const spinner = ora(downloading);
    spinner.start();
    //可使用download 或者 child_process
    const appName = 'my-app'; // 自定义应用名称
    const projectPath = path.join(__dirname, appName);
    // const isTypeScript = answers.template.includes('TypeScript') ? 'vue-ts' : 'vue';
    try {
      console.log('Creating my-app application...');
      execSync(
        `npx create-vite@latest ${appName} -- --template`,
        { stdio: "inherit" } // 显示命令输出
      );
      // execSync(
      //   `npx create-vite@latest ${appName} -- --template ${
      //     isTypeScript
      //   }`,
      //   { stdio: "inherit" } // 显示命令输出
      // );
      console.log(`[my-app] Application created successfully！path: ${projectPath}`);
      spinner.succeed();
    } catch (error) {
      // console.error('创建失败:', error.message);
      console.log(symbols.error, chalk.red('create fial\n',error.message))
      spinner.file()
    }
}

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

module.exports = {
  createHtml,
  createReact,
  createVue,
  createInitReact,
  createViteProject
}
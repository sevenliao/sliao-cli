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
//log-symbols, 可以在终端上显示出 √ 或者 × 等的图标。
const symbols = require('log-symbols');



/**
 * @description: program.version 调用该命令时 （如 sliao-cli -v） 会带出版本号：x.x.x
 * @description: program.command 定义初始化命令 （如 sliao-cli init <项目名>）
 * @description:  program.action action 是执行command命令时发生的回调
 * @param:  node index.js    init test == sliao-cli init test
 * @returns:  program.prase(process.argv)解析命令行中的参数，解析出name，并传入action回调
 */
program.version(chalk.green('======Dark,sliao-cli====== \n  version: 1.1.0'), '-v, --version').
  command('init <name>').
  action(name => {
    console.log(name)
    //fs.existsSync 如果路径存在，则返回 true，否则返回 false
    if (!fs.existsSync(name)) {
      console.log(chalk.magentaBright('正在创建项目(Creating project)……'));
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "project name is ",
          },
        ])
        .then((answers) => {
          // 模板目录
          const tmlDir = path.join(__dirname, "templates");
          // 目标目录
          const destDir = process.cwd();
          // 读取模板文件,将模板下的文件全部转换到目标目录
          fs.readdir(tmlDir, (err, files) => {
            if (err) throw err;
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
          });
        })
        .catch((error) => {
          // Something else went wrong
          throw error;
        });
    } else {
      console.log(symbols.error,chalk.red('项目依旧存在'));
    }
  })
program.parse(process.argv);



let download = {
    en: 'Downloading template……\n',
    zn: '正在下载模板……\n'
}

let stoppedMsg = {
    en: 'Maintenance has been stopped, you can choose create-vite to create the corresponding project',
    zn: '已经停止维护,可以选择create-vite创建对应项目'
}


let venture = 'en';

module.exports = {
    downloading: download[venture],
    stoppedMsg: stoppedMsg[venture]
}
const fs = require('fs');
const path = require('path');
const { PATH_TYPE } = require('../constants');

function getPathType(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) { return reject(err); }
      resolve(stats.isFile()? PATH_TYPE.FILE : (stats.isDirectory()? PATH_TYPE.DIR : PATH_TYPE.UNKOWN));
    });
  });
}

function getFileContent(path, success) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.error(`${path} 文件读取失败!`);
        return reject(err);
      }
      const fileContent = data.toString();
      // grammarCheck(path, fileContent);
      success?.(fileContent);
      return resolve(fileContent);
    });
  });   
}

function getAllFilesInDir(directoryPath, exts = []) {
  const files = fs.readdirSync(directoryPath); // 读取目录下的所有文件和文件夹
  const allFiles = [];
  files.forEach(file => {
    const filePath = path.join(directoryPath, file); // 获取文件的完整路径
    const fileStat = fs.statSync(filePath); // 获取文件的状态信息
    if (fileStat.isFile()) {
      if (exts?.length) {
        exts.includes(file.split('.')?.[1]) && allFiles.push(filePath);
      } else {
        allFiles.push(filePath); // 如果是文件，将其路径添加到结果数组中
      }
    } else if (fileStat.isDirectory()) {
      const nestedFiles = getAllFilesInDir(filePath, exts); // 如果是目录，递归获取目录下的文件
      allFiles.push(...nestedFiles); // 将递归获取的文件路径添加到结果数组中
    }
  });
  return allFiles;
}

module.exports = {
  getPathType,
  getFileContent,
  getAllFilesInDir,
};
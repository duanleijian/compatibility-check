#! /usr/bin/env node
const path = require('path');

const { PATH_TYPE, ES_NAME_MAP, MATCH_MODE, ES2015, ES2015_MATCH_RULE } = require('./constants');
const { getPathType, getAllFilesInDir, getFileContent } = require('./utils/file');
const { handleCheckExtension } = require('./utils/handle');
const { getLineCount } = require('./utils/util');
const { printCheckResult } = require('./utils/log');
const { invokeCbInPromises } = require('./utils/promise');
const { createCommand } = require('./scripts/cli');

let pathLogMap = {};

function clearPathLogMap() {
  pathLogMap = {};
}

function handleCheckPath(targetPath, exts) {
  const checkPath = path.resolve(__dirname, targetPath);
  getPathType(checkPath).then((pathType) => {
    if (pathType === PATH_TYPE.DIR) {
      const promiseList = [];
      const pathList = getAllFilesInDir(checkPath, exts);
      pathList.forEach(fullPath => {
        promiseList.push(getFileContent(fullPath, (content) => grammarCheck(fullPath, content)));
      });
      invokeCbInPromises(promiseList, () => printLogInDir(), (err) => console.log(`${targetPath}--文件内容读取异常--${err}`));
    } else if (pathType === PATH_TYPE.FILE) {
      getFileContent(checkPath, (content) => grammarCheck(targetPath, content)).then(() => printLogInDir()).catch(err => console.log(`${targetPath}--文件内容读取异常--${err}`));
    } else {
      console.log('路径异常，路径类型只包含文件、目录');
    }
  });
}

function printLogInDir() {
  Object.keys(pathLogMap).forEach(filePath => {
    console.log(path.resolve(filePath));
    pathLogMap[filePath].forEach(logCallback => {
      logCallback();
    });
  });
  clearPathLogMap();
}

function searchKeyword(keyword, content, matchRule) {
  const isDynamicRegular = matchRule.matchMode === MATCH_MODE.DYNAMIC_REGULAR;
  if (matchRule.matchMode === MATCH_MODE.REGULAR || isDynamicRegular) {
    return matchRule?.rule(isDynamicRegular ? keyword : null)?.exec(content)?.index || -1;
  }
  return content?.indexOf(keyword);
}

function grammarCheck(path, fileContent) {
  Object.keys(ES2015).forEach(key => {
    const features = ES2015[key];
    features.forEach(keyword => {
      const keywordIndex = searchKeyword(keyword, fileContent, ES2015_MATCH_RULE[key]);
      if (keywordIndex > -1)  {
        const result = new RegExp(/[\n|;]/g).exec(fileContent.substr(keywordIndex));
        const matchIndex = result?.index || -1;
        const nextLineBreakIndex = keywordIndex + matchIndex;
        const targetStr = fileContent.substr(0, keywordIndex);
        const lines = getLineCount(targetStr) + 1;
        const containKeyWordStr = fileContent.slice(keywordIndex, nextLineBreakIndex);
        if (pathLogMap[path]) {
          pathLogMap[path]?.push(function () { printCheckResult(lines, containKeyWordStr, `${ES_NAME_MAP[key]} ${keyword}`); });
        } else {
          pathLogMap[path] = [function () { printCheckResult(lines, containKeyWordStr, `${ES_NAME_MAP[key]} ${keyword}`); }]
        }
      }
    })
  });
}

createCommand(({ arg1, arg2 }) => {
  handleCheckPath(arg1, handleCheckExtension(arg2));
});
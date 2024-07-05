function getLineCount(targetStr) {
  let count = 0;
  new Array(targetStr.length).fill(0).forEach((_,index) => {
    if (targetStr[index].includes('\n')) {
      count++;
    }
  });
  return count;
}

function keyTransform(str, sepatator) {
  const reg = new RegExp(`${sepatator}(.)?`, 'g');
  const convertNum = str.split(sepatator).length;
  for (let i = 1; i <= convertNum; i++) {
    const targetChar = str[str.indexOf('-') + 1];
    str = str.replace(reg, targetChar.toUpperCase());
  }
  return str;
}

module.exports = { getLineCount, keyTransform };
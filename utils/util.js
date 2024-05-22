function getLineCount(targetStr) {
  let count = 0;
  new Array(targetStr.length).fill(0).forEach((_,index) => {
    if (targetStr[index].includes('\n')) {
      count++;
    }
  });
  return count;
}

module.exports = { getLineCount };
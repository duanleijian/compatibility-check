

function printCheckResult(lines, targetStr, keyword, prefix = ' -') {
  const colorCode = '\x1b[33m';
  const colorReplaceCode = '\x1b[0m';
  const logText = `${prefix}Line:${lines} ${keyword} feature is in "${targetStr}"`;
  console.log(`${colorCode}${logText}${colorReplaceCode}`);
}

module.exports = {
  printCheckResult,
};
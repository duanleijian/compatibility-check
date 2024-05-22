
function handleCheckExtension(exts) {
  if (!exts) {
    return;
  }
  return exts?.split(',');
}

module.exports = {
  handleCheckExtension,
}
const { program } = require('commander');

function createCommand(callback) {
  program.command('check')
  .option('-d, --dir <value>', '检测的文件路径')
  .option('-e, --ext <value>', '限制检测的文件范围，以后缀名')
  .action((cmd) => {
    callback?.({ arg1: cmd.dir, arg2: cmd.ext });
  });
  program.parse(process.argv);
}

module.exports = {
  createCommand
};
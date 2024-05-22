function invokeCbInPromises(promises = [], success = () => {}, fail = () => {}) {
  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      promise.then(res => success?.(res)).catch(err => fail?.(err)).finally(() => {
        index === promises.length - 1 && resolve();
      });
    });
  });  
}

module.exports = {
  invokeCbInPromises
};
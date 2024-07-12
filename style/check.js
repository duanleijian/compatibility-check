const { keyTransform } = require('../utils/util');

const checkStrategy = {
  cssSupport: (key, value) => window.CSS.supports(key, value),
  domStyle: (key) => !!document.createElement('div').style[keyTransform(key)],
};

function isCssName(name) {
  const base = /^[a-zA-Z-]+$/g;
  const core = /^-(webkit|moz|ms)-[a-zA-Z-]+$/g;
  const varible = /^--[\w-]+$/g;
  return !!name && (base.test(name) || core.test(name) || varible.test(name));
}

function isSupportStyle(cssConfig) {  
  Object.keys(cssConfig).forEach(key => {
    if (!checkStrategy.domStyle(key) || !checkStrategy.cssSupport(key, value)) {
      console.warn(`css property ${key} is no support in current environment ${window.navigator.userAgent}`);
    }
  })
}

function getStyleTag() {
  const styles = document.getElementsByTagName('style');
  const nodeTextArr = [];
  Array.prototype.forEach.call(styles, (styleNode) => {
    const insideText = styleNode.innerText;
    nodeTextArr.push(insideText);
  });
  return nodeTextArr;
}

function getCssConfig(text) {
  const cssConfig = {};
  const cssText = text?.match(/\{([^}]+)\}/g);
  cssText?.forEach(cssNode => {
    const scope = cssNode.replace(/[\{|\}]/g, '');
    const sentence = scope.split(';');
    sentence.forEach(entry => {
      const [key, value] = entry.split(':');
      const trimKey = key.replace(/\s/g, '');
      isCssName(trimKey) && (cssConfig[trimKey] = value);
    })
  })
  return Object.keys(cssConfig).length ? cssConfig : null;
}

function checkStyleCompatible() {
  const cssNodes = getStyleTag();
  const cssStyles = cssNodes.map(text => getCssConfig(text));
  cssStyles.forEach(style => isSupportStyle(style));
}

module.exports = {
  checkStyleCompatible,
};
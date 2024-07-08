const { keyTransform } = require('../utils/util');

const checkStrategy = {
  cssSupport: (key, value) => window.CSS.supports(key, value),
  domStyle: (key) => !!document.createElement('div').style[keyTransform(key)],
};

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
  cssText.forEach(cssNode => {
    const [key, value] = cssNode.replace('{').replace('}').split(':');
    cssConfig[key] = value;
  })
  return Object.keys(cssConfig).length ? cssConfig : null;
}

function isSupportStyle(cssConfig) {  
  Object.keys(cssConfig).forEach(key => {
    if (!checkStrategy.domStyle(key) || !checkStrategy.cssSupport(key, value)) {
      console.warn(`css property ${key} is no support in current environment ${window.navigator.userAgent}`);
    }
  })
}

function checkStyleCompatible() {
  const cssNodes = getStyleTag();
  const cssStyles = cssNodes.map(text => getCssConfig(text));
  cssStyles.forEach(style => isSupportStyle(style));
}

module.exports = {
  checkStyleCompatible,
};
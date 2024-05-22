
const PATH_TYPE = {
  FILE: 0,
  DIR: 1,
  UNKOWN: 2
};

const ES_NAME_MAP = {
  variable: '块级作用域变量声明',
  function: '箭头函数',
  template: '模板字面量',
  class: '类',
  generator: '生成器',
  promise: '异步对象',
  module: '模块化',
  objectAnalyze: '对象解构',
  arrayAnalyze: '数组解构',
  extensionOptator: '扩展运算符',
  collection: '集合',
  symbol: 'Symbol',
  proxy: '代理对象',
  reflect: '反射对象',
  asynchronous: '异步操作',
  forOf: 'forof循环'
};

const MATCH_MODE = {
  ERGODIC: 'ergodic', //遍历
  REGULAR: 'regular', //正则
  DYNAMIC_REGULAR: 'dynamicRegular' // 动态正则
};

const ES2015 = {
  variable: ['let', 'const'],
  function: ['=>'],
  template: ['`'],
  class: ['class'],
  generator: ['*'],
  promise: ['Promise'],
  module: ['import', 'export'],
  objectAnalyze: ['{...}'],
  arrayAnalyze: ['[...]'],
  extensionOptator: ['...'],
  collection: ['Map', 'Set'],
  symbol: ['Symbol'],
  proxy: ['Proxy'],
  reflect: ['Reflect'],
  asynchronous: ['async', 'await'],
  forOf: ['for...of']
};

const ES2015_MATCH_RULE = {
  variable: {
    matchMode: MATCH_MODE.DYNAMIC_REGULAR,
    rule: (val) => new RegExp(`\\b${val}\\b`, 'g')
  },
  function: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/(\([^)]*\)|[a-zA-Z_$][0-9a-zA-Z_$]*)\s*=>\s*{[^}]*}/, 'g')
  },
  template: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/\`.*\`/, 'g')
  },
  class: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(`\\bclass\\b`, 'g')
  },
  generator: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/(\*[.]*)[\s]*[a-zA-Z|0-9]*\s*\([^)]*\)/, 'g')
  },
  promise: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(`\\bPromise\\b`, 'g')
  },
  module: {
    matchMode: MATCH_MODE.ERGODIC,
  },
  objectAnalyze: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/(var|let|const)\s*\{[^}]*\}/, 'g')
  },
  arrayAnalyze: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/(var|let|const)\s*\[[^\]]*\]/, 'g')
  },
  extensionOptator: {
    matchMode: MATCH_MODE.ERGODIC,
  },
  collection: {
    matchMode: MATCH_MODE.DYNAMIC_REGULAR,
    rule: (val) => new RegExp(`\\b${val}\\b`, 'g')
  },
  symbol: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/\bSymbol\b/, 'g')
  },
  proxy: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/\Proxy\b/, 'g')
  },
  reflect: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/\Reflect\b/, 'g')
  },
  asynchronous: {
    matchMode: MATCH_MODE.DYNAMIC_REGULAR,
    rule: (val) => new RegExp(`\\b${val}\\b`, 'g')
  },
  forOf: {
    matchMode: MATCH_MODE.REGULAR,
    rule: () => new RegExp(/for\s*\(\s*.*\s*of\s*.*\s*\)\s*/, 'g')
  }
};

module.exports = {
  PATH_TYPE,
  ES_NAME_MAP,
  MATCH_MODE,
  ES2015,
  ES2015_MATCH_RULE,
};
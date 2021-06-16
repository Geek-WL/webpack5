module.exports = {
  presets: [
    // '@babel/preset-env' // babel预设 对最新的js语法解析, 以及兼容对应得浏览器版本
    [
      '@babel/preset-env',
      {
        /*
        * useBuiltIns: 表示使用什么模式进行预设构建 // 需自行安装 core-js regenerator-runtime
        * 值 -> false: 不使用polyfill; usage: 根据代码引入polyfill(需要哪些polyfill就引入哪些api); entry: 只要是浏览器版本支持的api需要的polyfill都引入
        * 注意点：当useBuiltIns: 'entry'时，需在入口文件添加 import 'core-js/stable' import 'regenerator-runtime/runtime'
        * */
        useBuiltIns: 'usage',
        corejs: 3, // 必须指定corejs版本！
      }
    ]
  ],
  plugins: []
}

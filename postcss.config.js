// postcss-loader 公共配置
module.exports = {
  // 数组写法
  // plugins: [
  //   'postcss-preset-env',
  //   // require('postcss-preset-env')
  // ]
  // 对象写法 推荐使用对象写法, 数组写法在vue脚手架中配置报错
  plugins: {
    'postcss-preset-env': {} // 可传配置 该插件包含css的 polyfill 和 autoprefixer 功能
  }
}

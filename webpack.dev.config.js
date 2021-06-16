const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: 'development',
  entry: './src/main.devServer.js',
  // 通过 webpack-dev-server 预打包
  // output: {
  //   filename: "assets/js/bundle.js",
  //   path: path.resolve(__dirname, 'dist')
  // },
  // devtool: 'source-map', // source-map选项 当mode: 'development'时devtool默认 'eval'. 当值为false, 不使用source-map选项(不生成source-map文件)。当值为'none'时也表示不需要source-map选项(什么都不设置), 但development模式下会报错(无效的配置)
  /*
  * 不生成source-map文件的选项：eval、false、none
  * */
  /*
  * devtool的值(关键字)：
  * eval -> 每个模块都使用 eval() 执行，并且都有 //@ sourceURL。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数
  * source-map -> 生成对应的source-map文件
  * eval-source-map -> 会生成source-map, 但是source-map是以DataUrl添加到eval函数的后面
  * cheap -> 只生成行映射，不生成列映射
  * module -> 对于被loader处理后的代码能更准确的映射
  * nosources -> 有错误提示，但点击不会再浏览器的sources中显示
  * */
  /*
  * 关于devtool的选择：
  * 开发环境推荐 -> source-map或cheap-module-source-map 这分别是vue和react使用的值
  * 测试阶段 -> source-map或cheap-module-source-map
  * 发布阶段 -> false或缺省(不写)
  * */
  // watch: false, // 默认false,开启后监听文件变化,并自动重新编译,配合vscode的live server插件可实现热更新 此配置与 --watch 参数对应
  // watchOptions: {
  //   aggregateTimeout: 300, // 防抖
  //   poll: 1000, // 每隔多少时间检查一次变动
  //   ignored: /node_modules/ // 排除对node_modules下的文件的监控
  // },
  // devServer: 专属于webpack-dev-server的配置
  devServer: {
    open: true, // 开启配置编译完成后自动打开浏览器 此配置与 --open 参数对应
    contentBase: './dist', // 需要为哪个文件夹提供服务
    // hot: true, // 开启HMR配置 会在控制台提示  对应参数 --hot 注意点：1.开启后需手动为某个模块(js文件)添加热替换 2.不需要手动配置webpack.HotModuleReplacementPlugin插件
    // port: 8080 // 运行端口号 默认 8080 对应参数 --port
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      },
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "hello webpack dev server",
      template: "./public/index.html"
    }),
    new DefinePlugin({
      BASE_URL: "'./'"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public", // 需要复制的目录
          // to: "", // 复制的出口 注意点: 传入的目录基于output.path, 不传默认output.path
          // 排除选项
          globOptions: {
            // dot: true,
            // gitignore: true,
            ignore: ['**/index.html'], // 需要排除的文件 注意写法
          },
        },
      ],
    })
  ]
}

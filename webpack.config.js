const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 输出打包文件前删除原来的dist
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
const { DefinePlugin } = require('webpack') // webpack内置插件 DefinePlugin 允许在 编译时 创建配置的全局常量
const CopyPlugin = require("copy-webpack-plugin"); // 将已经存在的单个文件或整个目录复制到构建目录

module.exports = {
  entry: "./src/main.js", // 单个入口  默认 ./src/index.js
  // entry: path.resolve(__dirname, 'src/main.js'), // 绝对路径也可
  // 配置多个入口
  /*
  entry: {
    main: './src/main.js'
  },
  */
  // 出口配置
  output: {
    filename: 'assets/js/bundle.js', // 输出文件名 (默认 main.js)
    path: path.resolve(__dirname, 'dist'), // 输出目录 (默认 ./dist/) 需传绝对路径
    // assetModuleFilename: 'img/[name].[hash:6][ext]' // 此属性配置通过asset module type处理的文件输出目录 注意点：此处[ext]的值带.
    // clean: true // 此配置用于输出前清理输出目录 可用于替代 clean-webpack-plugin , 需 webpack@5.20.0+
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/, // 在配置babel-loader时，排除对node_modules的文件进行处理，因为第三方库的代码有可能已经进行过babel的转换
        use: {
          loader: "babel-loader",
          // 不在options直接配置, 把相关配置提取到babel.config.js
          // options: {
          //   presets: [
          //     '@babel/preset-env',
          //     // ["@babel/preset-env", { "targets": "last 2 versions" }] // 当webpack找不到.browserslistrc时, 需指定默认的预设
          //   ]
          //   // plugins: [
          //   //   '@babel/plugin-transform-arrow-functions',
          //   //   '@babel/plugin-transform-block-scoping'
          //   // ]
          // }
        }
      },
      {
        test: /\.ttf|eot|woff2?$/i,
        type: "asset/resource", // webpack4通常使用file-loader处理字体文件 webpack5中直接使用type: "asset/resource"
        generator: {
          filename: 'assets/font/[name].[hash:6][ext]'
        }
      },
      {
        /* file-loader用于处理图片被import或require方式导入 */
        test: /\.(png|jpe?g|gif)$/i,
        // type: 'asset/resource', // 资源模块类型(asset module type) webpack5中asset/resource用于替代在use里面使用file-loader, asset/inline用于替代在use里面使用url-loader 使用这些属性不必安装额外loader
        // type: 'asset/inline', // 此配置处理的文件最终将作为 data URI 注入到 bundle 中
        // generator.filename指定输出的文件名 也可设置output.assetModuleFilename 等同效果 注意点：generator.filename属性只有type不等于'asset/inline'时有效, type: 'asset/inline'时需注释generator.filename, 不然报错。因为通过asset/inline打包的文件最终将作为 data URI 注入到 bundle 中
        type: 'asset', // 通用资源配类型，webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型
        generator: {
          filename: 'assets/img/[name].[hash:6][ext]' // type: 'asset/inline'时此配置不适用，因为inline模式会把文件打包注入到bundle文件
        },
        // 当type: 'asset'时，parser.dataUrlCondition适用
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
        // use: [
        //   {
        // loader: 'file-loader',
        // loader: 'url-loader', // url-loader 功能类似于 file-loader, 但是在文件大小（单位为字节）低于指定的限制时，可以返回一个 DataURL. 在webpack5中 url-loader/url-loader 已被弃用
        // options: {
        /*
        * [placeholder] 打包后文件的名称规则
        * [ext]: 处理文件的扩展名
        * [name]: 处理文件的名称
        * [hash]: 文件的内容, 使用MD4散列函数处理, 生成的一个128位的hash值(32个16进制)
        * [contentHash]: 在file-loader中和[hash]结果是一致的，在webpack其它一些地方不一样
        * [path]: 文件相对于webpack配置文件的路径
        * */
        //
        // name: '[name].[hash:6].[ext]', // 重命名打包之后的文件名
        // outputPath: 'img' // 打包之后文件的输出目录 dist/img
        // 上面两行可以统一用name属性处理 如下一行
        // name: 'img/[name].[hash:6].[ext]',
        // limit: 1024 * 8, // 小于 8192字节(8kb)的图片文件转换位base64字符串
        // }
        // },
        // ],
      },
      {
        test: /\.css$/i,
        /*
        * style-loader -> 把CSS以<style>标签插入到 DOM(html) 中
        * css-loader -> 对 @import、url()、import、require进行处理，就像 js 解析 import/require() 一样
        * */
        use: [
          "style-loader",
          // "css-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 此配置选项用于处理css文件中的@import 使@import的css可以被postcss-loader处理 值取决于需要后面的几个loader处理
            }
          },
          'postcss-loader' // 抽离postcss-loader公共配置至 postcss.config.js
          /*
           {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env' // require('postcss-preset-env') 简写
                  // require('autoprefixer')
                  // require('postcss-preset-env') // postcss-preset-env 本身包含 autoprefixer 功能
                ]
              }
            }
          }
          */
        ],
        // loader: 'css-loader'
        /*
        use: [
          { loader: 'style-loader', options: {} },
          { loader: 'css-loader', options: {} }
        ]
        */
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          // "css-loader",
          // 使css文件中的@import的文件重新被sass-loader和postcss-loader处理
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',// 抽离postcss-loader公共配置至 postcss.config.js
          /*
           {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                  // require('postcss-preset-env'),
                  // require('autoprefixer'),
                ]
              }
            }
          },
          */
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          'postcss-loader',// 抽离postcss-loader公共配置至 postcss.config.js
          /*
            {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                  // require('postcss-preset-env'),
                  // require('autoprefixer'),
                ]
              }
            }
          },
          */
          "less-loader",
        ],
      },
    ]
  },
  // 插件机制
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello Webpack5",
      template: "public/index.html",
    }),
    new DefinePlugin({
      // BASE_URL: path.resolve(__dirname)
      BASE_URL: "'./'" // 注意点: 双重字符串包裹
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
  ],
}

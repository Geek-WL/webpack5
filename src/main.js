import { sum, mul } from "./js/math";
// import 'core-js/stable' // babel相关
// import 'regenerator-runtime/runtime' // babel相关
const format = require('./js/utils')

import './js/createElement'
import './css/index.css'
import './css/index1.scss'
import './css/index2.less'

const total = sum(1, 2) + mul(2, 3)
const date = format('2021-06-11')
console.log(total)
console.log(date)

// 箭头函数 验证babel
const abc = () => {
  console.log('abc')
}
// promise 验证polyfill
const jPromise = new Promise((resolve, reject) => {

})

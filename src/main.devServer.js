import ab from './img/ab.png'
// import './js/math'
function createImgEl(imgSrc) {
  // let img = document.createElement('img')
  let img = new Image()
  img.src = imgSrc
  img.style.width = '200px'
  document.body.appendChild(img)
}
createImgEl(ab)

// if(module.hot) {
//   module.hot.accept('./js/math.js') // 手动为math模块添加热替换
// }

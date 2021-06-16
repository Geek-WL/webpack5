import abImg from '../img/ab.png'
import xyy from '../img/xyy.jpg'
function createElement(content) {
  let div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.innerText = content
  div.className = 'content'
  document.body.appendChild(div)
}
function createElement1(content) {
  let div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.innerText = content
  div.className = 'content1'
  document.body.appendChild(div)
}
function createElement2(content) {
  let div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.innerText = content
  div.className = 'content2'
  document.body.appendChild(div)
}
function createImgEl(imgSrc) {
  // let img = document.createElement('img')
  let img = new Image()
  img.src = imgSrc
  img.style.width = '200px'
  document.body.appendChild(img)
}
function createIconfont(icon) {
  const i = document.createElement('i')
  i.className = 'iconfont ' +  icon
  document.body.appendChild(i)
}
createElement('Hello Webpack Loader (CSS)')
createElement1('Hello Webpack Loader (SCSS)')
createElement2('Hello Webpack Loader (LESS)')
createImgEl(abImg)
createImgEl(xyy)
createIconfont('icon-ashbin')

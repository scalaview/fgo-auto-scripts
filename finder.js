// 查找助战

var servants = {
  caster: 4
}

var utils = require('./utils')
var swipe1 = utils.swipe
var click1 = utils.click
var sleep1 = utils.sleep
var readImage = utils.readImage
// autojs 这个 node 版本 const 分析的不对，没办法还是用 var 吧
var findButton = utils.findButton
var images = {}
var RefreshServant = [1420, 203]
var RefreshServantConfirm = [1420, 742]
var {
  DisableAddFriend
} = require('./variables')

var {
  addFriendImg,
  refreshServantImg,
  haveServantsImg
} = utils

function initImages () {
  for (let key in servants) {
    images[key] = []
    for (let i = 1; i <= servants[key]; i++) {
      images[key].push(readImage(getWholePath(key, i)))
    }
  }
}

function getWholePath(servant, idx) {
  return './assets/friends/' + servant + '/' + idx + '.jpg'
}

function findServant(servant) {
  const imageList = images[servant]
  let p = null
  for (let i = 0; i < imageList.length; i++) {
    // 就搜一次就够了
    p = findButton(imageList[i], {maxTimes: 1, threshold: 0.9})
    if (p) {
      return p
    }
  }
  return p
}

var SwipePoint1 = [1900, 900]
var SwipePoint2 = [1900, 500]
var SwipeInternal = 600

function findServantAndSwipe(servant) {
  let p = null
  for (let i = 0; i < 5; i++) {
    p = findServant(servant)
    sleep(300)
    if (p) {
      return p
    }
    swipe1(SwipePoint1[0], SwipePoint1[1], SwipePoint2[0], SwipePoint2[1], SwipeInternal, true)
    sleep(300)
  }
  return p
}

function disableAddFriend() {
  var p = findButton(addFriendImg, {maxTimes: 1})
  if (p) {
    toast('发现添加好友界面，不添加')
    click1(DisableAddFriend[0], DisableAddFriend[1], true)
  }
}

function find(servant) {
  toast('等待助战界面')
  //直到寻找助战的界面出来之前，循环检测
  while(!findButton(haveServantsImg, {maxTimes: 10})){
    sleep(1000)
  }
  toast('开始寻找助战')
  p = findServantAndSwipe(servant)

  while (!p) {
    while(!findButton(refreshServantImg, {maxTimes: 10})){
      sleep(1000)
    }
    click1(RefreshServant[0], RefreshServant[1], true)
    while(findButton(refreshServantImg, {maxTimes: 10})){
      sleep(1000)
    }
    click1(RefreshServantConfirm[0], RefreshServantConfirm[1], true)
    while(!findButton(refreshServantImg, {maxTimes: 10})){
      sleep(1000)
    }
    p = findServantAndSwipe(servant)
    if (p) {
        break
    }
    toast('接着找')
 }
 var y = p[1] - (165 * ( (p[1] - 500) > 0 ?  (p[1] - 500) : 0 )/ 500)
 var x = p[0] + 500
 click1(x, y, false)
 toast('找到啦 ' + x + ',' + y)
 sleep1(3000)
}

events.on('exit', function() {
  for (let key in images) {
    for (let i = 0; i <= images[key].length; i++) {
      if (images[key][i]) {
        images[key][i].recycle()
      }
    }
  }
})

// 直接初始化一波
initImages()

exports.findServant = find

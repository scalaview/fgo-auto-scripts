// console.show();
if (!requestScreenCapture(true)) {
  toast('请求截图失败')
  exit()
}
var str = ""; 

str += "屏幕宽度:" + device.width;

str += "\n屏幕高度:" + device.height;

console.log(str);
setScreenMetrics(1080, 2340)
var servants = {
  caster: 4
}
var rx = 2340
var ry = 1100
var resize = function(x, y) {
    return [Math.floor(x / rx * device.height), Math.floor(y / ry * device.width)]
}

var click1 = function(x, y, r) {
    let p = [x, y]
    if (r) {
      p = resize(x, y)
    }
    const _x = p[0] + random(-10,10)
    const _y = p[1] + random(-10,10)
    console.log('x: ' + _x + ', y: ' + _y)
    // y correct
    click(_x, _y)
  }
  var sleep1 = function(t) {
    sleep(t + random(0, 80))
  }

  var findButton = function (b, options) {
    const maxTimes = options ? options.maxTimes || 100 : 200
    const interval = options ? options.interval || 100  : 100
    const threshold = options ? options.threshold || 0.7 : 0.7

    for (let i = 0; i < maxTimes; i++) {
      const point = findImage(captureScreen(), b, { threshold: threshold })

      if (point) {
          return [
            Math.floor(point.x + b.getWidth() / 2),
            Math.floor(point.y + b.getHeight() / 2)
          ]
      }
      sleep1(interval)
    }
    return false
  }

  var readImage = function(img) {
    console.log(img)
    const b = images.read(img.toString())
    return b
  }

// const NextImage =  readImage('./assets/next.jpg')
// const ContinueImage =  readImage('./assets/continue.png')
var images = {}
// const caster = readImage('./assets/continue.png')

const NextStep = [1764, 852]
const ContinueStep = [1400, 752]
function nextTurn() {
  console.log('完成')
  let p = null
  while (!p) {
      click1(NextStep[0], NextStep[1], true)
      sleep1(300)
      p = findButton(NextImage, {maxTimes:1})
      if (p) {
        // click1(p[0], p[1], true)
          console.log('next turn poin: ' + p[0], ' ,', p[1])
      } else {
        console.log('NextImage not found')
      }
  }
  // click1(1564, 852, true)
  click1(700, 852, true)

}



function initImages () {
  images['caster'] = [caster]
  // for (let key in servants) {
  //   images[key] = []
  //   for (let i = 1; i <= servants[key]; i++) {
  //     // console.log(getWholePath(key, i))
  //     // readImage(getWholePath(key, i))
  //     readImage('./assets/friends/caster/3.jpg')
  //     // images[key].push(readImage(getWholePath(key, i)))
  //   }
  // }
}

function getWholePath(servant, idx) {
  return './assets/friends/' + servant + '/' + idx + '.jpg'
}

function find(servant) {
  p = findServantAndSwipe(servant)

  while (!p) {
    click1(1566,183, true)
    sleep1(300)
    click1(1576,842, true)
    sleep1(3000)

    p = findServantAndSwipe(servant)
    if (p) {
        break
    }
    sleep1(15000)
    toast('接着找')
 }
 click1(p[0],p[1], false)
 toast('找到啦 ' + p[0] + ',' + p[1])
 sleep1(3000)
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

  const SkillY = 750
  const MasterSkillY = 430
  const ChangeY = 536
  const AvatarY = 514

  const Avatar1 = [732, AvatarY]
  const Avatar2 = [1030, AvatarY]
  const Avatar3 = [1660, AvatarY]
  const Confirm = [1569,655]

  // 从者一号位
  const C1S1 = [150,SkillY]
  const C1S2 = [270, SkillY]
  const C1S3 = [440,SkillY]

  // 从者二号位
  const R1S1 = [632,SkillY]
  const R1S2 = [800,SkillY]
  const R1S3 = [950,SkillY]

  // 从者三号位
  const C3S1 = [1155,SkillY]
  const C3S2 = [1300,SkillY]
  const C3S3 = [1480,SkillY]

  // 御主技能
  const MasterSkillStart = [1950, MasterSkillY]
  const MasterSkill1 = [1500, MasterSkillY]
  const MasterSkill2 = [1653, MasterSkillY]
  const MasterSkill3 = [1780, MasterSkillY]

  // 换人坐标点
  // 换人是三技能
  const ChangeS1 = [255, ChangeY]
  const ChangeS2 = [595, ChangeY]
  const ChangeS3 = [896, ChangeY]
  const ChangeS4 = [1231, ChangeY]
  const ChangeS5 = [1503, ChangeY]
  const ChangeS6 = [1800, ChangeY]
  const ChangeConfirm = [1153, 800]

// console.log(C1S1)
// click1(C1S1[0], C1S1[1], true)
// click1(C1S2[0], C1S2[1], true)
// click1(Confirm[0], Confirm[1], true)
// click1(C3S2[0], C3S2[1], true)
// click1(Avatar2[0], Avatar2[1], true)
// click1(MasterSkillStart[0], MasterSkillStart[1], true)

//
// click1(MasterSkillStart[0], MasterSkillStart[1], true)
// sleep1(1000)
// click1(MasterSkill1[0], MasterSkill1[1], true)
// sleep1(1000)
// click1(Avatar2[0], Avatar2[1], true)

// 换人
// click1(MasterSkillStart[0], MasterSkillStart[1], true)
// sleep1(300)
// click1(MasterSkill3[0], MasterSkill3[1], true)
// sleep1(700)
// click1(ChangeS1[0], ChangeS1[1], true)
// sleep1(150)
// click1(ChangeS2[0], ChangeS2[1], true)
// sleep1(150)
// click1(ChangeS3[0], ChangeS3[1], true)
// sleep1(150)
// click1(ChangeS4[0], ChangeS4[1], true)
// sleep1(150)
// click1(ChangeS5[0], ChangeS5[1], true)
// sleep1(150)
// click1(ChangeS6[0], ChangeS6[1], true)
// sleep1(700)
// click1(ChangeConfirm[0], ChangeConfirm[1], true)

// const Battle = [1953,900]
// const CardSP = [1199,340]
// const Card1= [275,764]
// const Card2 = [755,764]

// click1(Battle[0], Battle[1], true)
// sleep1(1600)
// click1(CardSP[0], CardSP[1], true)
// sleep1(700)
// click1(Card1[0], Card1[1], true)
// sleep1(700)
// click1(Card2[0], Card2[1], true)


// click1(1900,800, true)

// click1(1564, 852, true)

// var i = 0
// while(i < 1) {
//   console.log(i)
//   i++
// sleep1(200)
// click1(1400, 752, true)
//   // nextTurn()
// }


// events.on('exit', function() {
  // NextImage.recycle()
  // ContinueImage.recycle()
  // GoldAppleImage.recycle()
  // Attack.recycle()
// })

// initImages()

function clickRefresh() {
  findServant('caster')
}
events.on('exit', function() {
  // caster.recycle()
})

var swipe1 = function(x1, y1, x2, y2, duration, r) {
  var p1 = [x1, y1]
  var p2 = [x2, y2]
  if (resize) {
    p1 = resize(x1, y1)
    p2 = resize(x2, y2)
  }
  const _x1 = p1[0] + random(-10, 10)
  const _x2 = p2[0] + random(-10, 10)
  const _y1 = p1[1] + random(-10, 10)
  const _y2 = p2[1] + random(-10, 10)
  const _duration = duration + random(-100, 100)
  swipe(_x1, _y1, _x2, _y2, _duration)
}

var i = 0
while(i < 3) {
  console.log(i)
  i++
  // click1(1420, 203, true)
  // swipe1(1900, 900, 1900, 500, 600, true)
  // sleep1(500)
  // click1(1420, 742, true)
  // sleep1(300)
  // nextTurn()
  // click1(1365, 471, true)
  sleep1(300)
  click1(1363,735, true)
}

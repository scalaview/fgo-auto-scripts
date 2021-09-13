// console.show();

var str = ""; 

str += "屏幕宽度:" + device.width;

str += "\n屏幕高度:" + device.height;

console.log(str);
setScreenMetrics(1080, 2340)
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

const Battle = [1953,900]
const CardSP = [1199,340]
const Card1= [275,764]
const Card2 = [755,764]

// click1(Battle[0], Battle[1], true)
// sleep1(1600)
// click1(CardSP[0], CardSP[1], true)
// sleep1(700)
// click1(Card1[0], Card1[1], true)
// sleep1(700)
// click1(Card2[0], Card2[1], true)


// click1(1900,800, true)

click1(1564, 852, true)
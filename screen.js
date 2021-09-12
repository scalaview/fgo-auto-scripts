// console.show();

var str = ""; 

str += "屏幕宽度:" + device.width;

str += "\n屏幕高度:" + device.height;

console.log(str);

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


const SkillY = 850
const MasterSkillY = 479
const ChangeY = 536
const AvatarY = 614

const Avatar1 = [732, AvatarY]
const Avatar2 = [1230, AvatarY]
const Avatar3 = [1660, AvatarY]
const Confirm = [1569,655]

const C1S1 = [150,SkillY]
const C1S2 = [270, SkillY]
const C1S3 = [480,SkillY]

// const C1S1 = [370,SkillY]
// const C1S2 = [507,SkillY]
// const C1S3 = [619,SkillY]

// 从者二号位
const R1S1 = [732,SkillY]
const R1S2 = [897,SkillY]
const R1S3 = [1050,SkillY]

// 从者三号位
const C3S1 = [1315,SkillY]
const C3S2 = [1452,SkillY]
const C3S3 = [1610,SkillY]

// 御主技能
const MasterSkillStart = [2147, MasterSkillY]
const MasterSkill1 = [1633, MasterSkillY]
const MasterSkill2 = [1810, MasterSkillY]
const MasterSkill3 = [1990, MasterSkillY]

// 换人坐标点
// 换人是三技能
const ChangeS1 = [255, ChangeY]
const ChangeS2 = [595, ChangeY]
const ChangeS3 = [996, ChangeY]
const ChangeS4 = [1371, ChangeY]
const ChangeS5 = [1603, ChangeY]
const ChangeS6 = [2108, ChangeY]
const ChangeConfirm = [1153, 918]
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
click1(MasterSkillStart[0], MasterSkillStart[1], true)
sleep1(700)
click1(MasterSkill3[0], MasterSkill3[1], true)
sleep1(700)
click1(ChangeS1[0], ChangeS1[1], true)
click1(ChangeS6[0], ChangeS6[1], true)
sleep1(700)
click1(ChangeConfirm[0], ChangeConfirm[1], true)



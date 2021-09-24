var utils = require('./utils')

var click2 = utils.click
var sleep2 = utils.sleep
var findAttack = utils.findAttack
var { Card1, Card2, Battle } = require('./variables')

const SkillY = 750
const MasterSkillY = 430
const ChangeY = 536
const AvatarY = 514

const Avatar1 = [632, AvatarY]
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


// 宝具
const CardSP1 = [799,340]
const CardSP2 = [1199,340]
const CardSP3 = [1500,340]

function useMasterSkill(i) {
  findAttack()
  click2(MasterSkillStart[0], MasterSkillStart[1], true)
  sleep2(250)
  use(i)
}

function use(t) {
  var i = t[0]
  var avatar = t[1]
  findAttack()
  click2(i[0],i[1], true)
  sleep2(200)
  // click2(Confirm[0],Confirm[1], true)
  sleep2(100)
  click2(avatar[0],avatar[1], true)
  sleep2(2500)
}

// t: [from, to]
function changeServant(t) {
  findAttack()
  click2(MasterSkillStart[0], MasterSkillStart[1], true)
  sleep2(200)
  // 换人服是三技能
  click2(MasterSkill3[0], MasterSkill3[1], true)
  sleep2(200)
  // click2(Confirm[0],Confirm[1], true)
  sleep2(100)
  click2(t[0][0], t[0][1], true)
  sleep2(100)
  click2(t[1][0], t[1][1], true)
  sleep2(100)
  click2(ChangeConfirm[0], ChangeConfirm[1], true)
  sleep2(4000)
}

function nirvana (t) {
  click2(t[0][0], t[0][1], true)
  sleep2(300)
}

function openFight() {
  findAttack()
  click2(Battle[0],Battle[1], true)
  while(!findButton(attackReturnImg, {maxTimes: 3})) {
    sleep2(1000)
  }
}

function normalFight (t) {
  click2(t[0][0], t[0][1], true)
  sleep2(t[1])
}

const CommandList = {
  s: use,
  m: useMasterSkill,
  c: changeServant,
  b: nirvana,
  o: openFight,
  a: normalFight
}

const PointList = {
  's:1,1': C1S1,
  's:1,2': C1S2,
  's:1,3': C1S3,
  's:2,1': R1S1,
  's:2,2': R1S2,
  's:2,3': R1S3,
  's:3,1': C3S1,
  's:3,2': C3S2,
  's:3,3': C3S3,
  'm:1,0': MasterSkill1,
  'm:2,0': MasterSkill2,
  'm:3,0': MasterSkill3,
  'b:1,0': CardSP1,
  'b:2,0': CardSP2,
  'b:3,0': CardSP3,
  'a:1,0': Card1,
  'a:2,0': Card2
}

const AvatarList = {
  0: Avatar2, // 默认走 2 号位
  1: Avatar1,
  2: Avatar2,
  3: Avatar3
}

const ChangeList = {
  1: ChangeS1,
  2: ChangeS2,
  3: ChangeS3,
  4: ChangeS4,
  5: ChangeS5,
  6: ChangeS6
}

const translate = function(i) {
  switch (i[1]) {
    case 's':
      return '从者 ' + i[2] + ' 技能 ' + i[3] + ' 给 ' + (i[4] === '0' ? 2 : i[4]) + ' 从者\n'
    case 'm':
      return '御主技能 ' + i[2] + '给 ' + (i[4] === '0' ? 2 : i[4]) + ' 从者\n'
    case 'b':
      return '宝具 ' + i[2] + '\n'
    case 'a':
      return '攻击指令卡 ' + i[2] + '\n'
    case 'c':
      return '换人 从者 ' + i[2] + '与 ' + i[3] + ' 交换\n'
  }
}

/**
 * 一行一条指令
 * s:1,2,2 表示 从者 1 技能 2 给 从者 2
 * m:1,0,2 表示 御主技能 1 给 二号位从者（懒得特殊处理 统一一下格式好了）
 * c:1,4,0 表示换人服 1 位换 4 位从者
 *
 * ---\n
 * 区分一面二面和三面
 *
 * @param {*} text
 * @returns resultText 翻译文本
 * @returns result 结果
 * @rawText
 */
module.exports = function (text) {
  let resultText = ''
  let result = []
  const turns = text.split('---')
  for (let i = 0; i < turns.length; i++) {
    resultText += '第' + (i + 1) + '面\n'
    result.push([])

    // 解析命令
    var attackCardCount = 0
    turns[i].split('\n').map(i => i.trim()).filter((c) => !!c).forEach(function(command) {
      const c = /^(\w):(\d),(\d),(\d)$/.exec(command)
      if (!c) {
        toast('错误的指令')
        console.log('指令错误', command)
        return resultText, result
      }
      resultText += translate(c)
      const _r = {f: CommandList[c[1]]}
      switch(c[1]) {
        case 'c':
          _r['p'] =  [ChangeList[c[2]], ChangeList[c[3]]]
          break
        case 'a':
          if (attackCardCount >= 3){
            toast('错误的指令')
            console.log('指令错误', command)
            return resultText, result
          }
          if (attackCardCount <= 0) {
            // 打开攻击界面
            result[i].push({
              f: openFight,
              p: []
            })
          }
          attackCardCount ++
          _r['p'] =  [PointList[c[0].slice(0,-2)], attackCardCount == 3 ? 20000 : 300] // 攻击指令卡，停顿时间
          break
        case 'b':
          if (attackCardCount >= 3){
            toast('错误的指令')
            console.log('指令错误', command)
            return resultText, result
          }
          if (attackCardCount <= 0) {
            // 打开攻击界面
            result[i].push({
              f: openFight,
              p: []
            })
          }
          attackCardCount ++ //宝具卡
        default:
          _r['p'] =  [PointList[c[0].slice(0,-2)], AvatarList[c[4]]]
      }
      result[i].push(_r)
    })
  }

  return {
    resultText: resultText,
    result: result,
    rawText: text
  }
}

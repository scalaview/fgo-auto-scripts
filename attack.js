auto()

if (!requestScreenCapture(true)) {
    toast('请求截图失败')
    exit()
}

sleep(300)

var utils = require('./utils')
var finder = require('./finder')
var defaults = require('./default')
var getCommands = require('./commands')
var { Card1, Card2, Card3, Battle } = require('./variables')

setScreenMetrics(1080, 2340)

var click1 = utils.click
var sleep1 = utils.sleep
var readImage = utils.readImage
var findServant = finder.findServant
// autojs 这个 node 版本 const 分析的不对，没办法还是用 var 吧
var findButton = utils.findButton

const storage = storages.create("fgo")
const apple = storage.get("apple") || false
const version = storage.get("version") || 1
const customCmd = storage.get('customCmd') || ''

toast(apple ? '吃苹果' : '不吃苹果')

const NextStep = [1764, 852]
const ContinueStep = [1400, 752]
const ApplePosition = [1365, 482]
const EatAppleConfirm = [1420, 742]

const NextImage =  readImage('./assets/next.jpg')
const GoldAppleImage = readImage('./assets/gold_apple.jpg')
var Attack = utils.Attack
var findAttack = utils.findAttack

function fight() {
    click1(Battle[0],Battle[1], true)
    sleep1(2500)
    click1(Card1[0],Card1[1], true)
    sleep1(500)
    click1(Card2[0],Card2[1], true)
    sleep1(500)
    click1(Card3[0],Card3[1], true)
    sleep1(30000)
}


function useCustom(t) {
    const result = getCommands(t).result
    result.forEach((r) => {
        findAttack(true)
        r.forEach((u) => {
            u.f(u.p)
        })
        // fight()
    })
}

// 宝石翁
function use3TInDiamond() {
    useCustom(defaults.RubyMan)
}


function use2004() {
    useCustom(defaults.Future2004)
}

// 苍玉的魔法少女
function use3TInBlue() {
    useCustom(defaults.BlueMagicGirl)
}

function eatApple() {
    if (findButton(GoldAppleImage, {maxTimes:10})) {
        if (!apple) {
            toast('体力没有了，不吃苹果，游戏结束')
            console.log('别吃啊！！！')
            return false
        }
        click1(ApplePosition[0], ApplePosition[1], true)
        sleep1(300)
        click1(EatAppleConfirm[0], EatAppleConfirm[1], true)
        console.log('吃屎啦你')
    } else {
        toast('不用吃苹果')
    }
    return true
}

function clickRefresh() {
    findServant('caster')
}

function nextTurn() {
    // 可能有第4回合，平A
    let p = null
    let ap = null
    while (!p) {
        sleep1(300)
        ap = findButton(Attack, {maxTimes:1})
        if (ap) {
          fight() //平A
        }
        click1(NextStep[0], NextStep[1], true)
        sleep1(300)
        p = findButton(NextImage, {maxTimes:1})
    }
    toast('完成')
    click1(ContinueStep[0], ContinueStep[1], true)

  }


function useVersion() {
    switch (version) {
        case 1:
            toast('苍玉的魔法少女')
            use3TInBlue()
            break
        case 2:
             toast('宝石翁')
             use3TInDiamond()
             break
        case 3:
            toast('2004')
            use2004()
            break
        case 4:
            toast('使用自定义配置')
            useCustom(customCmd)
            break
    }
}

var i = 0


events.on('exit', function() {
    toast('共刷 ' + i + ' 轮')
    NextImage.recycle()
    GoldAppleImage.recycle()
    Attack.recycle()
})


while (true) {
    i++
    useVersion()
    toast('3t end')
    nextTurn()
    sleep1(3000)
    toast('next')
    // 如果不勾选苹果，苹果用光就退出脚本
    if (!eatApple()) {
        console.log('苹果用光拉，结束战斗')
        break
    }
    sleep1(2000)
    clickRefresh()
    toast('1 turn end')
}

# FGO scripting
## 说明
FGO 自动刷图。

打手固定二号位，<del>不支持配置</del>。

auto.js 制作。（但是由于语法太 TM 难用是低版 ES 还有 bug 我哭了。）

不保证都能用，坐标偏移不修，测试设备：MI 10

安卓好难哦。

## 自定义语法
### 从者放技能
`s:1,2,3` 表示一号从者放 2 技能（单体技能给三号位从者）

> 宇宙凛的色卡选择同理，红 1 蓝 2 绿 3

### 御主技能
`m:1,0,1` 表示放衣服 1 技能（第二位是占位的别睬他）给一号位从者

### 换人服
`c:1,5,0` 代表一号位从者和五号位从者交换

## 预置
1. 满破苍玉魔法少女 + 双 Caber + 宇宙凛
2. 满破宝石翁 + 双 Caber + 宇宙凛
3. 2004 衣服 + 双 Caber + 宇宙凛

## 配置的保存与生效
1. 配置保存表示我存了，不代表生效
2. 配置生效不代表保存了
3. 暂时不支持配置修改、保存就是新增

### TODO
- UI 过丑，但是 android UI 好难哦 -^-

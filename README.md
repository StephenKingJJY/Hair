[![Hair](https://socialify.git.ci/StephenKingJJY/Hair/image?description=1&font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fibyoo-media.oss-cn-hangzhou.aliyuncs.com%2FVector.svg&owner=1&pattern=Formal%20Invitation&pulls=1&stargazers=1&theme=Light)](https://socialify.git.ci/StephenKingJJY/Hair/image?description=1&font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fibyoo-media.oss-cn-hangzhou.aliyuncs.com%2FVector.svg&owner=1&pattern=Formal%20Invitation&pulls=1&stargazers=1&theme=Light)

# Hair 框架

Hair是一个基于LOGO语言的面向对象框架,旨在简化LOGO程序的开发。

## 主要特性

- 面向对象编程支持
- GUI界面开发
- 文件操作封装 
- 资源管理
- 项目打包发布
- 多语言支持
- Web服务器支持
- Node.js集成

## 安装

1. 下载并安装 FMSLogo
2. 下载 Hair 框架文件
3. 将框架文件放入 FMSLogo 安装目录

## 快速开始

```logo
(hair "false) ; 初始化Hair框架
hairgui      ; 加载GUI支持

new "p "Project  ; 创建项目
.title.val "MyApp
.width.val 800
.height.val 600
.mode.val "fs    ; 全屏模式

new "btn "Button ; 创建按钮
.text.val "Click
.click.val [pr "Hello]
```

## 项目结构

```
Hair/
  ├── Hair.lgo        # 核心框架文件
  ├── HairGui.lgo     # GUI组件
  ├── Hair.dll        # 原生扩展
  ├── hair_res/       # 资源文件夹
  └── dist/           # 项目发布目录
```

## 主要模块

### Project 类
用于管理项目配置和打包发布:


```44:58:Hair.lgo
new "Project "Class
	;startup属性用来标记启动时调用的主入口文件，默认为main。这个文件需要在被load后自执行，比如添加startup变量。
	;filelist包含所有需要打包的文件，这些文件必须存在于主目录下
	;可能不是所有项目文件都需要在执行的时候被引用。还有个问题是拷贝的时候会丢失路径关系
	.attr [title untitle width 1000 height 1000 mode ss startup main.lgo filelist [main.lgo] needGUI false needRes false icon " style normal winCenter true]
	.before [if not empty? hair.object.select "project [hair.debug.error _e "不能重复创建project对象 cancel] if :hair_debug [hair.base.settitle "untitle\(Hair\ on\ FMSLogo\)]]
	.listen "mode [run this.mode if this.mode="fs [if not :hair_debug [windowset "Commander 0 setfocus [FMSLogo]] make "hair_gui_listenkey "true]]
	.listen "title [hair.base.settitle this.title]
	;v2.3处理无边框程序，因为没法还原，所以只在生产状态下执行，支持noMenu和noCaption、fullScreen
	.listen "style [if not :hair_debug [dllload "Hair.dll dllcall (se "V this.style "L :hair_hwnd) dllfree]]
	;v2.3处理icon
	.listen "icon [dllload "Hair.dll dllcall (se "V "setIcon "U this.icon "L :hair_hwnd) dllfree]
	;v2.3将窗口移动到屏幕中央
	.before [if not :hair_debug [if this.winCenter [hair.base.movewindow]]]
	;保存方法做几个操作：在dist下面新增项目文件夹，保存可被load的项目信息文件，创建引用入口文件，生成打包配置文件，拷贝项目文件
```


### File 类 
提供文件操作封装:


```13:20:hair_res/file.lgo
to hair.file
hook "hair_exit [closeall]
new "File "Class
  .attr [name nosuchfile matchmode open position 0 _path [] _originalpath []]
  .method "create [openwrite this.name close this.name] ;在当前目录创建一个文件
  .method "writepr [[chars][if this.matchmode = "open [if hair.file.open this.name [openappend this.name setwrite this.name pr :chars this.position.val writepos setwrite [] close this.name]]
    if this.matchmode = "find [if hair.file.find1 this.objname [openappend this.name setwrite this.name pr :chars this.position.val writepos setwrite [] close this.name hair.file.find2 this._originalpath]]]] ;在一个文件的最后开始写字符，position改变
  .method "writetype [[chars][if this.matchmode = "open [if hair.file.open this.name [openappend this.name setwrite this.name type :chars this.position.val writepos setwrite [] close this.name]]
```


### Timer 类
定时器支持:


```162:170:Hair.lgo
new "Timer "Class
	.attr [id 1 delay 100 command [] mode noyield]
	.before [make "hair_timer_temp 0 for [i 1 31][
		if and (not member? :i :hair_timer_id)(:hair_timer_temp=0) [make "hair_timer_temp :i]]
		ifelse :hair_timer_temp = 0 [hair.debug.error "计时器已被用完 cancel][this.id.value :hair_timer_temp
		queue "hair_timer_id :hair_timer_temp]]
	.method "start [settimer this.id this.delay this.command]
	.method "stop [cleartimer this.id]
	.method "restart [this.stop this.start]
```


## Web服务器

Hair 2.3+ 版本支持通过 Node.js 提供 Web 服务:


```1:12:hair_res/server.js
var fs=require('fs'); 
var net=require('net')
var express = require('express') 
var app = express() 
var HashMap = require('hashmap');
var map = new HashMap();
const { v4: uuidv4 } = require('uuid');
const iconv = require("iconv-lite")
const program = require('commander');
var Jimp = require('jimp');
var path =require('path');

```


## 国际化

支持多语言:


```1:5:2.3fantasy版本/i18n.lgo
;获取语言包数据，如果数据不存在则替换为原数据
;没有语言包数据时替换为原数据
;版本号v2.0
;_e "中文

```


## 版本历史

- v2.3: 增加 Node.js 集成,完善 Web 支持
- v2.2: 增加项目打包功能
- v2.1: 增加资源管理
- v2.0: 重构核心框架
- v1.x: 基础功能实现

## 许可证

MIT

## 作者

StephenKing

## 相关链接

- [FMSLogo](http://fmslogo.sourceforge.net/)
- [项目主页](https://github.com/StephenKingJJY/Hair)

## 贡献

欢迎提交 Issue 和 Pull Request。


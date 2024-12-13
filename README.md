# 前言

这个项目的诞生是因为网络上找不到心仪的主页，总觉得跟预期稍有偏差 (⊙x⊙;)。刚好咱有那么一点点的前端能力，嗦以决定自己写一个…… o((>ω< ))o

项目使用 Vue3 + Vite 构建，克隆下来后可以现在本地跑一下试试看

安装依赖：`npm install`

运行项目：`npm run dev`

项目构建：`npm run build`

克隆下来之后得先安装一下依赖，然后根据自己的需求改配置文件。配置文件都是在根目录下面。

# 配置文件（.env）

这里面存放的是站点的基本信息 (●'◡'●)

``` env
# 站点标题
VITE_TITLE =
# 站点logo
VITE_FAVICON =
# 站点描述
VITE_DESCRIPTION =
# 站点关键字
VITE_KEYWORDS =
```

# 配置文件（Configuration.js）

这里面存放就是展示的信息了 (￣y▽,￣)╭ ，文件里面基本都有注释，看着改就行了，下面挑一些需要说的

## 开关

在一些配置中看到存在 `enable` 的话代表这个模块是可以关闭的，比如侧边栏的座右铭。一般默认是 `true`，改成 `false` 就可以把对应的模块关了

![image-20241207233506183](.github/md.image/image-20241207233506183.png)

## 静态资源

一般所填充的静态资源都是存在于 `public` 文件夹下面，设置静态资源相对路径的时候 `/` 代表 `public` 文件夹，`/` 后面的路径是相对于 `public` 文件夹的，比如要设置的是 `public` 文件夹下面的 `img` 文件夹，那么就是 `/img`

## 社交链接

这个就谈谈 `info` 中的配置：

```javascript
{
    name: 'GitHub',
    icon: 'icon-GitHub',
    url: 'https://github.com/ximuliunian'
}
```

name：展示的名字

icon：iconfont图标库软件，[#具体点我](#图标选择)

url：这是点击按钮需要跳转的链接

## 站点内部

参考社交链接……

## 技术栈

这个是用的 skillicons 这个项目

官网：https://skillicons.dev

GitHub：https://github.com/tandpfun/skill-icons

GitCode：https://gitcode.com/gh_mirrors/sk/skill-icons

这个项目收录了很多常用的技术栈图标，具体有什么图标可以通过jin上面的链接查看一番（建议使用GitCode国内快）。具体详情什么的这里不做赘述。使用的时候进入项目找到图标对应的关键字，如下图：

![image-20241207234847615](.github/md.image/image-20241207234847615.png)

然后把关键字加入 list 配置中即可

# 配置文件（ ConfigurationTimeline.js ）

这个配置文件中存放的是时间线中的内容，数据结构如下：

```js
[
    {
        date: "日期 - 1",
        content: ["展示内容"]
    }, {
        date: "日期 - 2",
        content: ["展示内容"]
    },{
        // ...
    }
]
```

在配置文件中，对于展示内容需要使用一些简单的语法格式，项目会自动编译成 HTML 代码，目前所支持的格式有

| 格式      | 标签                                         |
| --------- | -------------------------------------------- |
| "h1:xxx"  | 一级标题                                     |
| "h2:xxx"  | 二级标题                                     |
| "h3:xxx"  | 三级标题                                     |
| "p:xxx"   | 正常文本                                     |
| "img:xxx" | 图片内容，xxx 为图片链接（也可以是相对路径） |

例子：

```js
{
    date: "9527年2月5日",
    content: [
        "p:今天是个好日子",
        "p:希望明天不要是一个坏天气",
        "img:xxxxxxx"
    ]
}
```



## 图标选择

在配置社交链接或者其他地方会看到 `icon`的配置（avatar_status里面的不算），图标可以去 [iconfont](https://www.iconfont.cn) 中进行挑选，步骤如下：

1. 进入 [iconfont](https://www.iconfont.cn) 选择需要的图标添加入库，选择完之后添加到项目中（没有就创建一个）
   - 创建项目：其他都随意，字体格式 彩色、WOFF、WOFF2、TTF 都选上然后点新建

     ![image-20241207235059229](.github/md.image/image-20241207235059229.png)

2. 添加到项目中后修改一下图标名字什么的，然后点击项目名称下面的三个选项中的 Symbol 选项，之后下面会出现一个链接

   ![image-20241207235130534](.github/md.image/image-20241207235130534.png)

3. 进入到链接内复制里面全部的内容然后找到本项目的 `public/js/icon.js` 文件，把复制的内容替换掉文件中的内容。不要替换错了 `public/system/` 目录下也有一个相同的文件

4. 最后在需要使用图标的地方的 icon 选项内使用自己的即可

``` javascript
{
    name: 'bilibili',
    url: 'https://space.bilibili.com/1304924540',
    icon: 'icon-bilibili'
}
```

## ICP 备案

这个因为我有这个需求，在对应的站点展示或者不展示对应的ICP号。`domain` 里面填写顶级域（如：`xxx.com`），后面的 `info` 填写对应的备案号

# GitHub贪吃蛇贡献图

这个脚本已经写好了（路径：`.github\workflows\main.yml`），什么都不用改。它的执行流程就是每当当前仓库有提交的时候会执行一次，然后就是会在每周一早上八点执行一次。

它执行完成后会提交一个svg文件（`github-contribution.svg`）到 `public/img/` 目录下

> 注意：使用这个得修改一下Workflow权限，不然会执行失败
> 
> 修改权限：依次点击仓库的 Settings -> Actions -> General 拉到最下面 找到 "Workflow permissions" 选择 Read and write permissions 点击保存
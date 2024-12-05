# 前言

这个项目的诞生是因为网络上找不到心仪的主页，总觉得跟预期稍有偏差 (⊙x⊙;)。刚好咱有那么一点点的前端能力，嗦以决定自己写一个…… o((>ω< ))o

项目使用 Vue3 + Vite 构建，克隆下来后可以现在本地跑一下试试看

安装依赖：`npm install`

运行项目：`npm run dev`

项目构建：`npm run build`

克隆下来之后得先安装一下依赖，然后根据自己的需求改配置文件。配置文件有两个都是在根目录下面，一个叫 `.env`，一个叫 `Configuration.js`。

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

在一些配置中看到存在 `enable` 的话代表这个模块是可以关闭的，一般默认是 `true`，改成 `false` 就可以把对应的模块关了

一般所填充的静态资源都是存在于 `public` 文件夹下面，设置静态资源相对路径的时候 `/` 代表 `public` 文件夹，`/` 后面的路径是相对于 `public` 文件夹的，比如要设置的是 `public` 文件夹下面的 `img` 文件夹，那么就是 `/img`

## 图标选择

在配置社交链接或者其他地方会看到 `icon`的配置（avatar_status里面的不算），图标可以去 [iconfont](https://www.iconfont.cn) 中进行挑选，步骤如下：

1. 进入 [iconfont](https://www.iconfont.cn) 选择需要的图标添加入库，选择完之后添加到项目中（没有就创建一个）
   - 创建项目：其他都随意，字体格式 彩色、WOFF、WOFF2、TTF 都选上然后点新建
2. 添加到项目中后修改一下图标名字什么的，然后点击项目名称下面的三个选项中的 Symbol 选项，之后下面会出现一个链接
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
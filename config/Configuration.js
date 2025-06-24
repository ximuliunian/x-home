// 配置文件
export const config = {
    // 开关
    enable: {
        // 路由
        router: {
            comments: true,  // 留言板
            gossip: true,  // 闲言碎语
            friendLinks: true,  // 友链
        },
        // 主页
        home: {
            avatar: true,  // 头像
            motto: true,  // 座右铭
            hitokoto: true,  // 一言
            tags: true,  // 标签
            dateTime: true,  // 时钟
            welcome: true,  // 欢迎语
            social: true,  // 社交链接
            githubContribution: true,  // github贡献
            siteNavs: true,  // 网站导航
            projects: true,  // 项目
            skills: true,  // 技术栈
        }
    },

    // 昵称
    name: '曦暮流年',

    // 头像
    avatar: 'img/avatar.png',

    // 介绍
    description: '懒惰往往是创新的催化剂',

    // 座右铭
    motto: {
        top: '能躺着绝不坐着,',
        bottom: '能坐着绝不站着.'
    },

    // 头像右下角的状态
    avatar_status: {
        // 表情（可以按下 win + > 快捷键打开emoji）
        icon: '✨',
        // 文本（建议三个汉字一个符号）
        text: '学习中~'
    },

    // 标签
    tags: [
        '前端', '后端', '随遇而安', 'IT', '懒癌患者', '菜鸡',
        '修猫', '修狗', 'Steam', '农药', '音乐', '我的世界',
        '吃麻麻香'
    ],

    // 背景图片（至少得有一张）
    background_image: [
        '/img/background/1.png',
        '/img/background/2.png',
        '/img/background/3.png',
        '/img/background/4.png',
        '/img/background/5.png',
        '/img/background/6.png'
    ],

    // 社交链接
    social: [
        {
            name: 'GitHub',
            icon: 'icon-GitHub',
            url: 'https://github.com/ximuliunian'
        }, {
            name: 'Gitee',
            icon: 'icon-gitee',
            url: 'https://gitee.com/ximuliunian'
        }, {
            name: '邮箱',
            icon: 'icon-youxiang',
            url: 'mailto:xmln@ximuliunian.top'
        }, {
            name: 'QQ',
            icon: 'icon-qq',
            url: 'tencent://Message/?Uin=2515550574&amp;websiteName=local.edu.com:8888=&amp;Menu=yes'
        }, {
            name: 'BiliBili',
            icon: 'icon-bzhan',
            url: 'https://space.bilibili.com/1304924540'
        },
    ],

    // 站内导航
    siteNavs: [
        {
            name: '博客',
            url: 'https://blog.ximuliunian.top',
            icon: 'icon-blog'
        }, {
            name: '笔记',
            url: 'https://notes.ximuliunian.top',
            icon: 'icon-notes'
        }, {
            name: '网页导航',
            url: 'https://nav.ximuliunian.top',
            icon: 'icon-nav'
        }, {
            name: '下载加速',
            url: 'https://xzjs.ximuliunian.top',
            icon: 'icon-xiazaijiasu'
        }, {
            name: 'GPT',
            url: 'https://gpt.ximuliunian.top',
            icon: 'icon-gpt'
        }, {
            name: '云盘资源',
            url: 'https://cloud-folder.ximuliunian.top/',
            icon: 'icon-yunpan'
        }
    ],

    // 项目
    projects: [
        {
            name: 'Xmln-Home',
            icon: 'icon-jiangbing',
            url: 'https://github.com/ximuliunian/xmln-home',
            description: '本站同款个人主页'
        }, {
            name: 'CloudExplorer',
            icon: 'icon-zhuangshi',
            url: 'https://github.com/ximuliunian/CloudExplorer',
            description: '本站同款云盘资源页面'
        },
    ],

    // 技术栈
    skills: {
        // 主题 - light:亮色 dark:暗色
        theme: 'light',
        // 技术栈图标
        list: [
            'idea', 'git', 'maven', 'java', 'spring',
            'windows', 'python', 'vue', 'vite', 'vscode',
            'mysql', 'redis', 'html', 'ubuntu', 'css',
            'linux', 'js', 'github', 'docker', 'nodejs',
            'nginx', 'markdown', 'githubactions', 'vim', 'cloudflare',
            'kafka', 'rabbitmq', "elasticsearch"
        ]
    },

    // ICP 备案展示
    icp: [
        { domain: 'xmln.top', info: '豫ICP备2024053500号' },
    ],

    // 留言板
    comment: {
        // 封面
        cover: '/img/reviewCover.png',
        // 标题
        title: '留言板',
        // 介绍
        description: '少年，江湖之路漫长且未知，今朝有幸相逢，便是缘定一线。何不借此际会，留下一语豪言，以铭此情此景？',
    },

    // 评论配置
    giscus: {
        // 仓库
        repo: 'ximuliunian/blog',
        // 仓库ID
        repoId: 'R_kgDOGuKRyg',
        // 分类
        category: 'Announcements',
        // 分类ID
        categoryId: 'DIC_kwDOGuKRys4CVf53',
        // 主题
        theme: 'light_protanopia',
    },
}
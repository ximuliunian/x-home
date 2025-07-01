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
    name: '', // 例：曦暮流年

    // 头像
    avatar: '', // 例：img/avatar.png

    // 介绍
    description: '', // 例：今天天气真不错

    // 座右铭
    motto: {
        top: '能躺着绝不坐着,', // 上半句
        bottom: '能坐着绝不站着.' // 下半句
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
    ],

    // 社交链接
    social: [
        {
            name: 'GitHub',
            icon: 'icon-GitHub',
            url: 'https://github.com/ximuliunian'
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
            url: 'https://xxx.top',
            icon: 'icon-blog'
        },
    ],

    // 项目
    projects: [
        {
            name: 'X-Home',
            icon: 'icon-jiangbing',
            url: 'https://github.com/ximuliunian/xmln-home',
            description: '本站同款个人主页'
        }
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
        { domain: 'xxx.top', info: '豫ICP备00000000001号' },
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
        repo: '',
        // 仓库ID
        repoId: '',
        // 分类
        category: '',
        // 分类ID
        categoryId: '',
        // 主题
        theme: '',
    },
}
// 配置文件
export const config = {
    // 昵称
    name: '曦暮流年',

    // 头像
    avatar: 'img/avatar.png',

    // 座右铭
    motto: {
        enable: true,
        info: {
            top: '能躺着绝不坐着,',
            bottom: '能坐着绝不站着.'
        }
    },

    // 头像右下角的状态
    avatar_status: {
        // 表情（可以按下 win + > 快捷键打开emoji）
        icon: '✨',
        // 文本（建议三个汉字一个符号）
        text: '学习中~'
    },

    // 标签
    tags: {
        enable: true,
        info: ['前端', '后端', '随遇而安', 'IT', '懒癌患者', '菜鸡']
    },

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
    social: {
        enable: true,
        info: [
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
        ]
    },

    // 站点内部
    siteNavs: {
        enable: true,
        info: [
            {
                name: '博客',
                url: 'https://blog.ximuliunian.top',
                icon: 'icon-blog'
            }, {
                name: '网页导航',
                url: 'https://nav.ximuliunian.top',
                icon: 'icon-nav'
            }, {
                name: '下载加速',
                url: 'https://xzjs.ximuliunian.top/',
                icon: 'icon-xiazaijiasu'
            }, {
                name: 'GPT',
                url: 'https://gpt.ximuliunian.top/',
                icon: 'icon-gpt'
            }
        ]
    },

    // 项目
    projects: {
        enable: true,
        info: [
            {
                name: 'Xmln-Home',
                icon: 'icon-jiangbing',
                url: 'https://github.com/ximuliunian/xmln-home',
                description: '本站同款个人主页'
            },
        ]
    },

    // 技术栈
    skills: {
        enable: true,
        info: {
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
        }
    },

    // ICP 备案展示
    icp: {
        enable: true,
        info: [
            {domain: 'xmln.top', info: '豫ICP备2024053500号'},
        ]
    },

}
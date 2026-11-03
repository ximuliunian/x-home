/**
 * 虚拟模块类型声明
 * 用于解决 Vite 虚拟模块的类型问题
 */

/**
 * yaml-config 虚拟模块类型声明
 */
declare module 'virtual:yaml-config' {
    interface Config {
        /** 昵称 */
        name: string;
        /** 头像路径 */
        avatar: string;
        /** 个人简介 */
        description: string;

        /** 头像状态标签 */
        avatar_status: {
            icon: string;
            text: string;
        };

        /** 座右铭 */
        motto: {
            top: string;
            bottom: string;
        };

        /** 个人标签 */
        tags: string[];

        /** 背景图片 */
        background_image: string[];

        /** 社交链接 */
        social: Array<{
            name: string;
            icon: string;
            url: string;
        }>;

        /** 站内导航 */
        siteNavs: Array<{
            name: string;
            icon: string;
            url: string;
        }>;

        /** 项目展示 */
        projects: Array<{
            name: string;
            icon: string;
            url: string;
            description: string;
        }>;

        /** ICP备案 */
        icp: Array<{
            domain: string;
            info: string;
        }>;

        /** Giscus 评论系统配置 */
        giscus: {
            repo: `${string}/${string}`;
            repoId: string;
            category: string;
            categoryId: string;
            theme?: string;
        };

        /** 留言板配置 */
        _comment: {
            cover: string;
            title: string;
            description: string;
        };

        /** 友链高级配置 */
        _friendLinks: {
            description: string[];
            scheme: {
                name: string;
                url: string;
                avatar: string;
                desc: string;
                bgColor: string;
            };
            require: string[];
            links: Array<{
                sort: string;
                icon: string;
            }>;
        };

        /** 闲言碎语配置 */
        _gossip: {
            settings: {
                public: 0 | 1;
                internalDisplay: 0 | 1;
            };
            links: string[];
        };

        /** 开关控制模块 */
        enable: {
            router: {
                comments: boolean;
                gossip: boolean;
                friendLinks: boolean;
            };
            home: {
                avatar: boolean;
                motto: boolean;
                hitokoto: boolean;
                tags: boolean;
                welcome: boolean;
                social: boolean;
                githubContribution: boolean;
                siteNavs: boolean;
                projects: boolean;
            };
            comments: {
                banner: boolean;
                bannerText: boolean;
            };
            friendLinks: {
                description: boolean;
            };
        };
    }

    const config: Config;
    export default config;
}
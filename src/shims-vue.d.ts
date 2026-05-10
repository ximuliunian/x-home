/**
 * Vue 文件类型声明
 * 解决 TypeScript 无法识别 .vue 文件的问题
 */
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
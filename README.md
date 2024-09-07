# vue3 + elementPlus 开发代码模板

一套基于 vue3 + elementPlus 的开发模板，包含了常用的功能，可以让您快速进行项目开发；

## 📢 版本信息

![img](https://img.shields.io/badge/nodejs-^20.10.0-339933?logo=nodedotjs) ![](https://img.shields.io/badge/vite-^5.1.6-646CFF?logo=vite) ![](https://img.shields.io/badge/vue-^3.4.21-4FC08D?logo=vuedotjs) ![](https://img.shields.io/badge/vue--router-^4.3.0-4FC08D?logo=vuedotjs) ![](https://img.shields.io/badge/pinia-^2.1.7-4FC08D?logo=vuedotjs) ![](https://img.shields.io/badge/vueuse-^10.6.1-4FC08D?logo=vuedotjs) ![](https://img.shields.io/badge/element--plus-^2.7.3-409eff?logo=element) ![](https://img.shields.io/badge/axios-^1.6.2-5a29e4?logo=axios) ![](https://img.shields.io/badge/unocss-^0.57.7-333333?logo=unocss) ![](https://img.shields.io/badge/animate.css-^4.1.1-351c75) ![](https://img.shields.io/badge/sass-^1.69.5-CC6699?logo=sass) ![](https://img.shields.io/badge/typescript-~5.4.0-3178C6?logo=typescript)

![visitors](https://visitor-badge.laobi.icu/badge?page_id=w461662596.vue3-template)

## 💡 特性

-   ⚡ [vue3](https://github.com/vuejs/),[vite5](https://github.com/vitejs/vite),[pnpm](https://github.com/pnpm/pnpm),[nodejs](https://github.com/nodejs/node) 作为开发工具，提供更快的开发体验
-   🐳 [vue3](https://github.com/vuejs/) API自动按需导入
-   🌈 [sass](https://github.com/sass/sass) 作为 css 预处理器
-   ✨ [animate.css](https://github.com/animate-css/animate.css) 作为动画库
-   🍍 [pinia](https://github.com/posva/pinia) 作为状态管理工具
-   🅰️ [axios](https://github.com/axios/axios) 作为前后端数据交互
-   💎 [VueUse](https://github.com/vueuse/vueuse) 非常实用的vue组合式函数api库
-   🙂 [iconify](https://github.com/iconify) 作为图标数据源，使用任意图标集
-   🌈 [element-plus](https://github.com/element-plus/element-plus) 作为 UI 组件库，自动按需导入
-   🧣 [无需手动注册store，自动导入](./src/stores) `src/stores` 目录下的 store
-   📦 [无需手动注册组件，自动加载](./src/components) `src/components` 目录下的组件
-   🗂 [基于文件目录自动生成的路由](./src/views) 读取 `src/views` 目录作为路由数据
-   🛺 [无需手动注册组合API，自动导入](./src/composables) `src/composables` 目录下的方法
-   🎨 [UnoCSS](https://github.com/unocss/unocss) 作为全局样式处理工具，高性能且极具灵活性的原子化css引擎
-   📑 [多 layout 布局系统](./src/layouts) 可配置多 layout 且自动导入，按需使用
-   🦾 [TypeScript](https://github.com/microsoft/TypeScript) 当然！

## 🌲 预配置

### Icons

-   [Phosphor 库](https://icones.js.org/collection/ph)，更多 icon 库请往 https://icones.js.org/ 安装使用

### 插件

-   [Vue Router](https://github.com/vuejs/router)
-   [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - 以文件系统为基础的路由
-   [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - 页面布局系统，可以指定页面使用哪个布局
-   [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - 自动按需导入组件(element-plus)
-   [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - 直接使用composables API、vue3 API、VueUse API等，无需导入

## 🐴 编码风格

-   使用 Composition API `<script lang="ts" setup></script>`
-   [ESlint](https://eslint.org/) 规范配置为：单引号、无分号、缩进空格4个等
-   [Prettier](https://prettier.io/) 代码格式化工具，查看 [配置](./.prettierrc.json)
-   [小驼峰式]()：函数（方法）命名、变量命名、文件名（目录）
-   [大驼峰式]()：公共组件名
-   [全大写式]()：环境变量名
-   [中划线式]()：html属性名、UI组件部分属性名
-   [下划线式]()：常量名、环境变量名

## 📖 项目结构

```bash
├── node_modules # 依赖
├── public # 根目录静态资源
├── src # 源码
│   ├── assets # 静态资源
│   ├── components # 公共组件
│   ├── layouts # 布局
│   ├── views # 页面
│   ├── stores # 状态管理
│   ├── composables # 组合API
│   ├── utils # 工具库
│   ├── styles # 全局样式
│   ├── main.ts # 入口文件
│   ├── types # 类型声明
├── index.html # 入口html
├──.env.development # 开发环境变量
├──.env.production # 生产环境变量
├──.eslintrc.js # eslint 配置
├──.gitignore # git 忽略文件
├──.prettierrc.json # prettier格式化配置
├── package.json # 项目依赖版本信息
├── pnpm-lock.yaml # pnpm 配置文件
├── tsconfig.json # typescript 配置
├── vite.config.ts # vite 配置
├── uno.config.ts # unocss配置
├── README.md # 项目英文描述文档
├── README.zh_CN.md # 项目中文描述文档
├── vitest.config.ts # vitest 配置
```

## 🐢 开发工具与插件推荐

-   [VSCode](https://code.visualstudio.com/)
-   [VSCode 扩展](https://marketplace.visualstudio.com/vscode)

    1. [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (请禁用Vetur)
    2. [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
    3. [Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode 格式化插件
    4. [UnoCSS for VS Code](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) UnoCSS官方提示插件

-   [WebStorm](https://www.jetbrains.com/webstorm/)
-   [WebStorm 扩展](https://plugins.jetbrains.com/webstorm)

    1. [vue.js](https://plugins.jetbrains.com/plugin/9442-vue-js)

-   **智能编码工具**：

    1. copilot
    2. codeium
    3. TONGYI Lingma
    4. iFlyCode
    5. CodeGeeX

## 项目安装

```sh
npm install
```

### 开发环境启动

```sh
npm run dev
```

### 生产环境构建

```sh
npm run build
```

### [Vitest](https://vitest.dev/) 单元测试

```sh
npm run test:unit
```

### [ESLint](https://eslint.org/) 语法检查

```sh
npm run lint
```

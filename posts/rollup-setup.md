---
title: Rollup.js 初体验
desc: Rollup.js 是一个现代 JavaScript 构建工具。今天，就让我们升级我们的项目到 Rollup ，来看看到底怎么样吧！
cover: /assets/posts/rollup-setup/cover.png
date: 2022.06.09
tags:
  - javascript
  - web
---

## 前言

Rollup 是我在重构 [TNT.js](https://github.com/Bug-Duck/tntjs/tree/dev) 这个玩具框架时忽然发现的一个构建工具。因为需要升级整个 codebase 到 ES Modules ，所以一个好的构建工具十分重要。但是，这个项目之前用的“构建工具”就是把 TypeScript 编译成 JavaScript ，可变性并不强。在尝试使用 Webpack 的时候，我无论如何也没办法让编译产物通过 HTML 的 `script` 标签导入到页面中（这个项目是一个小前端框架，要能够在浏览器中运行，就必须使用 `script` 标签倒入，没有打包 HTML）。

然后在一位大佬的指引下，我发现了 [Rollup.js](https://github.com/rollup/rollup) ，原生支持 ESM ，感觉十分不错。于是，就诞生了这篇文章！

## 安装

```bash
$ npm i -g rollup
```

## 配置 Rollup

跟 Webpack 一样，Rollup 也用一个独立的 JS 配置文件存放自己的运行设置。在 Rollup 里，配置文件的名字是 `rollup.config.js` 。

我在这个项目里使用的配置文件长这样：

```js
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";

export default {
  input: "src/index.ts",
  preserveModules: true,
  treeshake: false,
  output: {
    format: "esm",
    sourcemap: true,
    dir: "./dist",
    name: "TNT"
  },
  plugins: [
    alias({
      entries: [
        { find: "runtime", replacement: "src/runtime" },
        { find: "plugins", replacement: "src/plugins" },
      ],
    }),
    resolve(),
    typescript(),
    serve(),
  ],
};
```

Rollup 也支持许多的插件，比如我这里用的 `plugin-alias` ，就是把 Webpack 里面的 `alias` 配置项移植了过来。这里需要注意，Rollup 原生并不支持 TypeScript ，需要单独安装 `@rollup/plugin-typescript` 插件才能使用。

我还是用了 `plugin-node-resolve` ，这个插件是用来解析导入 `node_modules` 中的模块的。最后的 `rollup-plugin-serve` 的作用就是在你运行 Rollup 时，自动启动一个开发服务器，提供预览。

在这里，我选用了 ESM 的打包方式，仅仅为了让我这个项目变得好玩点。`output.dir` 指定了输出目录。还需要注意的是，我关闭了摇树优化，因为我需要把所有的东西整体打包，而不是打包特定的部分。但是这带来的坏处就是需要手动检查导入，防止导入未使用的模块。

`preserveModules` 代表保留当前的所有模块，这样我就可以在构建后的代码中使用 `import` 语句了。

配置完了 Rollup 之后，可以用 `rollup -c` 来打包。当然，这样并不会热更新，你还需要指定 `-w` 参数来启动热更新。

至此，Rollup 已经完成了基本配置。但是，为了更好的开发体验，我还需要一个东西来热加载我的 HTML 文件 —— 但是并不是使用 Rollup（当然 Rollup 也支持导入 HTML ，只不过不符合我的需求）。

## 在 HTML 中使用 ESM 并热加载

在 HTML 里导入 ESM 还是比较简单的。在 `<script></script>` 标签上加入 `type="module"` 就行啦。然后，就可以在 `script` 标签里面使用 `import` 语句了：

```html
<script type="module">
  import TNT from "./dist/src/runtime/TNT.js";
  import { Value } from "./dist/src/plugins/tntjsapi-simp/ValueState.js";
  import { Globals } from "./dist/src/runtime/GlobalEnvironment.js";
  import { NumberType } from "./dist/src/runtime/SymbolTable.js";
  import { PluginMain as TemplatePlugin } from "./dist/src/plugins/TemplateLanguage/PluginMain.js";
  import { PluginMain as DebugPlugin } from "./dist/src/plugins/debug/PluginMain.js";
  import { PluginMain as TNTScriptPlugin } from "./dist/src/plugins/tntscript/PluginMain.js";

  window.onload = () => {
    console.log(Globals.getAllPlugins())
    const t = new TNT();
    new Value("testValue", NumberType).setValue(23333)
    console.log(Globals.symbolTable);
  };
</script>
```

需要注意的是，你不需要提前使用 `<script src="dist/xxx" />` 来加载 ESM 文件。

但是，如果你现在打开配置好的 HTML 文件，会得到一个错误：

```
index.html:1 
        
Access to script at 'file:///Volumes/Data/Develop/Nodejs/tntjs/dist/src/runtime/TNT.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome-extension, edge, https, chrome-untrusted.
```

看来是直接使用文件协议传输不受 ESM 的支持。

解决方法就是启动一个热加载服务器来伺服我们的 HTML 文件。我选用了 [live-server](https://github.com/tapio/live-server) 包来解决这个问题。

首先，安装 live-server ：

```
npm install -g live-server
```

然后，就可以在项目目录里直接运行 `live-server` 启动开发服务器啦！现在到 <http://localhost:8080/> 去看看吧。

## 总结

总的来说，Rollup 是一个非常好的构建工具，它可以让我们在编写代码的时候更加简单，省去繁琐的配置过程。但是，它的社区可能还不如 Webpack 成熟，所以目前来说 Webpack 可能略占上风。

最后放一下我一直提到的小项目的 GitHub 吧：<https://github.com/Bug-Duck/tntjs/tree/dev>

欢迎 star & fork ！

---
title: 你真的会写 Git 提交信息吗?
desc: 写好，写清楚 commit message ，将会极大的提高合作开发效率。今天，我们就来深入研究 commit message 这个字符串，到底该怎么写。
cover: /assets/posts/conventional-commit/cover.png
date: 2022.05.19
tags:
  - git
  - 文字稿
---

此为我在 B 站上发布的视频 [你真的会写 Git 提交信息吗?](https://www.bilibili.com/video/BV1NU4y1U7KT) 的文字稿。

<iframe src="//player.bilibili.com/player.html?aid=684168548&bvid=BV1NU4y1U7KT&cid=724729363&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 前言

Git - 相信大家对这个工具都不陌生。作为当今最为流行的开源版本控制系统，Git 几乎是每个项目的必备工具。

Git 最主要的功能就是记录版本差异，每一次的版本更新被称作 `commit` 。每一个 `commit` 都有自己的一串 commit id 和描述此次更新内容的 commit message 。而其中对于浏览项目历史记录最重要的一项当然就是 commit message 了。写好，写清楚 commit message ，将会极大的提高合作开发效率。这期视频，我们就来深入研究 commit message 这个字符串，到底该怎么写。

## `git commit`

当你兴高采烈地重构好了你的开源项目的时候，你在终端里敲下了 `git commit` 。Git 自动打开了你最喜欢的编辑器 —— Vim。你在 Vim 中写下了：

> Refactored frontend code and updated `config` format.

随后，你按下 `esc` ，输入 `:wq` 退出了 Vim。终于，你把此次更新上传到了 GitHub 。

但是，你写的这句 commit message ，真的规范吗？

从某种意义上来讲，你写的还不错 —— 很清楚地表述了此次更新的主要内容。但是，却又不够好 —— 你并没有一套明确的规则规定如何表述每一次的 commit message ，导致你的 commit history 变得混乱不堪。

更有些时候，因为着急，你只写了一个 `fix` 就 commit 了 —— 这是不可取的。如果你之后想要知道到底你修复了哪里，还需要 checkout 那个 commit 并逐个翻阅修改的文件。

如果你是刚刚情境中的“我”，那么请继续往下看，相信你会收获很多。

## Conventional Commits

没错，前面所说的那个“规则”已经出现了，并且非常成熟 —— 大部分开源项目都会遵守这个 commit message rule 。而它，就是 Conventional Commits（约定式提交） ，一个人和机器都能读懂的 commit message 规范。

它的大致写法长这样：

```
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

其中，提交类型可以是下面的几种：

- `fix` ：修复了某个 bug
- `feat` ：新增了某个功能
- `build` ：一些影响构建系统的更新
- `chore` ：一些不重要的、不更改核心代码的更新
- `ci` ：变更了一些 CI 系统的配置
- `docs` ：对文档做出了一些修改
- `test` ：新增或修改测试文件
- `refactor` ：重构了代码（没有新增或修复任何东西）
- ……等等

更完整的提交类型列表请前往 <https://github.com/pvdlg/conventional-changelog-metahub#commit-types> 查看。

在类型后面的范围是可选的，指定了当前变更所作用的域，一般使用括号紧跟在提交类型的后面，例如：

```
build(npm): commit description
```

随后的提交描述是一小段对代码变更的简短总结，紧跟在类型（或作用范围）的后面，使用冒号 + 空格分割。

下面的提交正文也是可选的，可以写一些较长的上下文信息，与描述用一个空行隔开。紧接着的脚注用一个空行与正文分隔开来，包含着一些额外的令牌（例如 `Co-authored-by: user1, user2` 表示此提交是由提交者， `user1` 和 `user2` 共同修改的。

有一个特殊的脚注是 `BREAKING CHANGE` ，表示破坏性变更，必须使用**全部**大写的字母，后面跟着一串描述破坏性更新的文本，例如：

```
BREAKING CHANGE: environment variables now take precedence over config files
```

至此，我们一开始的提交：

```
Refactored frontend code and updated `config` format.
```

就可以变为：

```
refactor(frontend): improved structure of frontend code

Improved code quality of frontend code and removed unused imports.

BREAKING CHANGE: Format of the configuration file now changed to JSON instead of JavaScript files.
```

怎么样，是不是明了了很多？

当然，上面介绍的还只是约定式提交的冰山一角。如果你想要了解更多有关约定式提交的内容，可以去官方文档看一看：<https://www.conventionalcommits.org/zh-hans/v1.0.0/> 。视频中所有提到的链接我也都会放到视频底部的简介中。

ok，那么以上就是本期视频的全部内容了。如果你喜欢的话，不妨来个三连+关注支持一下，这对我创作都会是很大的动力。我是 Sam Zhang，我们下期再见。Bye bye！
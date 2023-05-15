---
title: 你真的会用 console.log 吗?
desc: console.log 是每一个 JavaScript 开发者都会经常用到的函数。可能很多初学者第一次使用 JS 时，就是调用的它。这，是最基础的 Hello World 。如果你现在运行，会得到一个纯正血统的 JS HelloWorld。但是，我们想要的是彩色输出！
cover: /assets/posts/console-log-101.jpeg
date: 2022.02.22
tags:
  - javascript
  - 文字稿
---

此为我在 B 站上发布的视频 [JS 花式输出 | 你真的会用 console.log 吗？](https://www.bilibili.com/video/BV1Eq4y1t7C1) 的文字稿。

<iframe src="//player.bilibili.com/player.html?aid=594140875&bvid=BV1Eq4y1t7C1&cid=514614537&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 引言

`console.log` 是每一个 JavaScript 开发者都会经常用到的函数。可能很多初学者第一次使用 JS 时，就是调用的它。

`console.log` 可能最广泛的用途就是输出调试信息了吧：

```js
console.log(current_processing);
```

当然，还有招聘信息：

![image-20220221194418180](https://s2.loli.net/2022/02/21/RiKjwpfabPA1xDu.png)

但是，你可能注意到了，百度这招聘信息写的挺花哨啊，这字还是红色的！

不知道各位会不会写，反正我第一次看见的时候是不会弄的。无论你会不会打印出这样的效果，继续往下看，一定会有所收获的。

## 彩色字？搞定！

首先，我们来看一下怎么来打印彩色字。

```js
console.log(msg)
```

这，是 JS `console.log` 的最基本形式，也可能是大部分人所熟知的形式。

但是，其实这个 msg 后面是有东西的 —— 正是那些不起眼的参数，能够让我们的 log 变得“上档次”。

根据 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console/log#syntax) 的定义，`console.log` 的定义如下：

```js
console.log(obj1 [, obj2, ..., objN]);
console.log(msg [, subst1, ..., substN]);
```

其中，`obj1 - objN` 代表的是要输出的 JS 对象。

而 `msg` 则是一个包含着各种控制字符的字符串，也是我们今天的主角。而后面跟着的 `subst1 - substN` 都是用来替换控制字符的特殊字符串。

首先，我们来看看怎么打印彩色字符吧。

```js
console.log("Hello, World")
```

这，是最基础的 Hello World 。如果你现在运行，会得到一个纯正血统的 JS HelloWorld。

但是，我们想要的是彩色输出！别急，我们先来认识一下第一个控制字符 —— `%c` 。有了它，你就可以随意往 console 里面堆积 CSS 了 —— 没错，这个 `%c` 代表着 CSS ！

只要把 `%c` 放在你要使用 CSS 的字符的前面，就能开始写 CSS 了。例如：

```js
console.log("%cHello, World")
```

下一步就是加上样式了。还记得之前的 `subst` 吗？它们现在可以派上用场了：

```js
console.log("%cHello, World", "color: red")
```

对，你没看错，就是 CSS ！一个 `%c` 对应着一个样式，而每一个 `%c` 都将会把从当前字符到下一个 `%c` 之前的一个字符渲染上对应的 CSS 样式。如果你用的是电脑端的话，可以按下 F12 试一试，就是这么简单！

![image-20220221201116931](https://s2.loli.net/2022/02/21/aAkF5poZmQNu9HJ.png)

如果你会一点 CSS 的话……你甚至可以弄成这样：

![image-20220221202058862](https://s2.loli.net/2022/02/21/inwxVNJ376uWame.png)

但是，这玩意更普遍的用途是这样的：

![image-20220221202230330](https://s2.loli.net/2022/02/21/FbGuKjq4pfmy7Tr.png)

这样的：

![image-20220221202319713](https://s2.loli.net/2022/02/21/wMCX6yHvkWcZi1r.png)

既然上面说了可以添加自定义 CSS ，那么我们应该能够完成这个挑战。

理论存在，实践开始。

先上最基础的无样式版本：

```js
console.log(
  `Powered by VueBlogger v0.1.0\n
GitHub: https://github.com/samzhangjy/VueBlogger\nPlease star & fork to support the author!`);
```

按照刚才说的方法，在 `VueBlogger` 前面加上 `%c` ，并添加相对应的样式：

```js
console.log(
  `Powered by %cVueBlogger v0.1.0\n
GitHub: https://github.com/samzhangjy/VueBlogger\nPlease star & fork to support the author!`,
  "background-color: #1A55ED; padding: 7px; color: #fff;"
);
```

但是，如果仅仅是这样，你会得到一个非常蓝的 console ：

![image-20220221202832979](https://s2.loli.net/2022/02/21/VkKgR3dUQEmotjO.png)

还记得刚才说的吗？

> 一个 `%c` 对应着一个样式，而每一个 `%c` 都将会把从当前字符到下一个 `%c` 之前的一个字符渲染上对应的 CSS 样式。

所以，我们只需要在 `v0.1.0` 前添加 `%c` 控制字符就 ok 啦：

```js
console.log(
  `Powered by %cVueBlogger%cv0.1.0\n
GitHub: https://github.com/samzhangjy/VueBlogger\nPlease star & fork to support the author!`,
  "background-color: #1A55ED; padding: 7px; color: #fff;",
  "background-color: #FCBF23; color: #000; padding: 7px;"
);
```

但是，这样还是会出现刚才的情况，只不过变黄了……

于是，我们可以再加个 `%c` ：

```js
console.log(
  `Powered by %cVueBlogger%cv0.1.0%c\n
GitHub: https://github.com/samzhangjy/VueBlogger\nPlease star & fork to support the author!`,
  "background-color: #1A55ED; padding: 7px; color: #fff;",
  "background-color: #FCBF23; color: #000; padding: 7px;",
  ""
);
```

现在我们的 console 输出正常了。是的，你可以通过把对应的 CSS 置空来消除前面的 CSS 效果！

那么第二个输出也就迎刃而解了，此处不再赘述。

哦对了，不是所有的 CSS 都能够移至到 console 里的 —— 请看 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console#outputting_text_to_the_console) 的详细说明。

当然，`console.log` 还有其他的控制字符 —— 例如 `%o, %d, %s, %f` 等，此处不再赘述，可以参见 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console#outputting_text_to_the_console) 查看更多信息。其中，`%d, %s, %f` 与其他语言中的格式化字符串很相似（例如 `C++` 的），作用也是格式化字符串、数字等信息。

## `console.assert ` —— 调试神器

如果你用过 Python 的话，你肯定会对 `unittest` 中形如 `assertXxxx` 的函数十分熟悉。现在，甚至有一部分灵魂跑到 JS 上了！没错，这就是 `console.assert` 。

按照惯例，先看定义：

```js
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]); // C-like message formatting
```

跟 `console.log` 差不多 —— 但是多了一个 `assertion` 。而它，就是要 assert 的对象。如果 `assertion` 的结果不为真，那么将会以类似 `console.error()` 的样式打印出后面的错误信息 `msg` 。

来看一个最简单的栗子：

```js
console.assert(![], "Yep, that's falsy.")
```

如果 `![]` 的值是非真的，那么我们将会收到一个自定义的报错：

![image-20220221205718474](https://s2.loli.net/2022/02/21/wb3uEgFGqW2mxJn.png)

那么，如果 assert 的结果是真的，就会正常执行，没有输出：

![image-20220221210046788](https://s2.loli.net/2022/02/21/qRXGbOc82KuiCTj.png)

同理，`console.assert` 也能使用 CSS：

```js
console.assert(0.1 + 0.2 === 0.3, "%cYou can't even can't get 0.1 + 0.2 right in js.", "font-weight: bold; font-style: italic; background-color: orange; color: #000")
```

![image-20220221210210114](https://s2.loli.net/2022/02/21/EFOWpIQVUxiykTS.png)

## `console.count` —— 计数神器

语法：

```js
console.count([label]);
```

`console.count` 函数接收一个字符串列表，列表中的元素表示一个标签。每次计数时，`console.count` 都会输出当前标签列表被计数的次数，并持续累积。如果没有给出任何标签，则会使用 `default` 默认标签。

这东西用起来也很简单，喂给它一些数据就行了：

```js
console.count("A");
console.count("B");
console.count("A");
```

![image-20220221211134769](https://s2.loli.net/2022/02/21/czUSn9j4vb8PEiL.png)

来做个示例：

```js
for (var i = 1; i <= 10; i++) {
	for (var j = 1; j <= i; j++) {
    	if (i % j == 0) console.count(i)
    }
}
```

这段代码会输出 1 - 10 这些数字的因数个数。

![image-20220221211731024](https://s2.loli.net/2022/02/21/FhHqOQtP3RS4p7J.png)

## `console.group` —— 没啥特别的，感觉会有用

`console.group` 允许你在 console 中输出层级嵌套的信息。

你可以使用 `console.group` 来创建一个新层，然后使用 `console.log` 、`console.warn` 、`console.error` 等函数在该层级下进行输出，最后使用 `console.groupEnd()` 来结束当前层。

示例：

```js
console.log("I'm here at the top level");
console.group("Level 2 group here!");
console.log("I'm in level 2!");
console.group("Level 3!");
console.log("You know what, [] is really weird in JS.")
console.error("0.1 + 0.2 !== 0.3 in JS =(");
console.groupEnd();
console.log("Back at level 2!");
console.groupEnd();
console.info("Wow, what a trip up there!");
```

![image-20220221212457244](https://s2.loli.net/2022/02/21/JiILZ9QAC4domM1.png)

函数太多，不放定义啦，大家应该参照运行结果就能看懂啦。

## 小结

这篇文章简单介绍了一下 `console` 的各种使用方法。但是，像一些过于普通的（例如 info、error、warning 等），我没有在这里一一介绍。

如果有小伙伴想要了解这方面的更多知识，可以前往 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console) 进行查阅，相信你一定会有新的收获。

我是 samzhangjy ，我们下期再见！
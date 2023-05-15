---
title: I built a terminal-like portfolio with Vue 3
desc: So I started building a cooler one. After Googling around, I decided to make a terminal-like site similar to yasfu.net with Vue 3.
cover: /assets/posts/i-built-a-terminal-like-portfolio-with-vue-3.png
date: 2022.06.04
tags:
  - vue
  - javascript
  - web
---
Hey guys, I'm Sam Zhang.

**Edit: since a lot of you are commenting about it, I would like to mention one thing though that this "portfolio" is just made for fun and not recommended to use in a real world application if you're really looking for a job.**

Recently I've updated my personal website. Originally I used [LogTure](https://github.com/samzhangjy/logture) as my primary website, but I think it's not "cool" enough.

So I started building a cooler one. After Googling around, I decided to make a terminal-like site similar to [yasfu.net](https://yasfu.net/portfolio/) with Vue 3.

Vue 3 is still new to me though. I mainly work on React projects recently and didn't explore the new features introduced in Vue 3. So this time I decided to give it a try. And after struggling with errors, I finally finished this project.

**Demo: <https://samzhangjy.com/>**

**GitHub: <https://github.com/samzhangjy/VueTerm>**

And of course, feel free to report issues to me!

However there're some downsides about this project. One is that the current bash-like command system has some trouble handling complicated paths. So for example, when you type in `cd ../folder/subfolder` will cause an inner failure of `cd`.

Recursive might be a good way to solve this problem and I'll try to implement it into this project in the near future.

And here is the end of the article. Feel free to play around with my project!
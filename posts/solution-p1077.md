---
title: "[DP] P1077 [NOIP2012 普及组] 摆花 题解"
desc: "洛谷 P1077 [NOIP2012 普及组] 摆花 题解"
cover: /assets/posts/solution-p1077.jpg
date: 2022.08.03
tags:
  - 算法
  - C++
  - OI
---

## 题目

链接：<https://www.luogu.com.cn/problem/P1077>

### 题目描述

小明的花店新开张，为了吸引顾客，他想在花店的门口摆上一排花，共 $m$ 盆。通过调查顾客的喜好，小明列出了顾客最喜欢的 $n$ 种花，从 $1$ 到 $n$ 标号。为了在门口展出更多种花，规定第 $i$ 种花不能超过 $a_i$ 盆，摆花时同一种花放在一起，且不同种类的花需按标号的从小到大的顺序依次摆列。

试编程计算，一共有多少种不同的摆花方案。

### 输入格式

第一行包含两个正整数 $n$ 和 $m$，中间用一个空格隔开。

第二行有 $n$ 个整数，每两个整数之间用一个空格隔开，依次表示 $a_1,a_2, \cdots ,a_n$。

### 输出格式

一个整数，表示有多少种方案。注意：因为方案数可能很多，请输出方案数对 $10^6+7$ 取模的结果。

### 样例 #1

#### 样例输入 #1

```
2 4
3 2
```

#### 样例输出 #1

```
2
```

### 提示

【数据范围】

对于 $20\%$ 数据，有 $0<n \le 8,0<m \le 8,0 \le a_i \le 8$。

对于 $50\%$ 数据，有 $0<n \le 20,0<m \le 20,0 \le a_i \le 20$。

对于 $100\%$ 数据，有 $0<n \le 100,0<m \le 100,0 \le a_i \le 100$。

NOIP 2012 普及组 第三题

## 题解

### 分析

第一眼看到以为是暴力 DFS ，看了一下数据范围发现自己错了（虽然记忆化好像也能做），于是容易想到动态规划的解法。

那么接下来就要考虑如何进行状态转移了。设 $dp_{i,j}$ 表示当前选了前 $i$ 种花，总计 $j$  盆。不难想到下述转移方程：
$$
dp_{i,j} = \sum_{k = 0}^{a_i} dp_{i - 1, j - k} \mod{p}
$$
其中 $k$ 表示第 $i$ 种花选多少个，那么答案显而易见，求和即可。

这道题其实还可以用滚动数组降维（毕竟只依赖 $i-1$ 的状态），甚至还有大佬直接降维，本蒟蒻 ~~太懒~~ 就不搞了。

### 代码

```cpp
// Problem: P1077 [NOIP2012 普及组] 摆花
// Contest: Luogu
// URL: https://www.luogu.com.cn/problem/P1077
// Memory Limit: 125 MB
// Time Limit: 1000 ms
//
// Powered by CP Editor (https://cpeditor.org)

#include <memory.h>

#include <algorithm>
#include <cmath>
#include <cstdio>
#include <iostream>
#include <queue>
#include <stack>
#include <string>
#include <vector>
using namespace std;
const int N = 110, MOD = 1e6 + 7;

int n, m, a[N], dp[N][N];

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    // 初始化，0盆花只有一种方案（不摆）
    dp[0][0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            for (int k = 0; k <= a[i]; k++) {
                if (k > j) break;  // 大于能选的就退出
                dp[i][j] += dp[i - 1][j - k], dp[i][j] %= MOD;
            }
        }
    }
    cout << dp[n][m] << endl;
    return 0;
}
```

AC++！
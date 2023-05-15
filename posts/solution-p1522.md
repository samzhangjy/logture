---
title: "[图论] P1522 [USACO2.4] 牛的旅行 Cow Tours 题解"
desc: "洛谷 P1522 [USACO2.4] 牛的旅行 Cow Tours 图论/最短路 题解"
cover: /assets/posts/solution-p1522.jpg
date: 2022.07.26
tags:
  - 算法
  - C++
  - OI
---

## 题目

链接：<https://www.luogu.com.cn/problem/P1522>

### 题目描述

Farmer John 的农场里有很多 **牧区**。有的路径连接一些特定的牧区。**一片所有连通的牧区** 称为一个 **牧场**。但是就目前而言，你能看到至少有两个牧区通过任何路径都不连通。这样，Farmer John 就有 **多个** 牧场了。

John 想在牧场里添加 **恰好** 一条路径。对这条路径有以下限制：

一个牧场的 **直径** 就是牧场中 **最远** 的两个牧区的距离（本题中所提到的所有距离指的都是 **最短的距离**）。考虑如下的有 5 个牧区的牧场，牧区用 `*` 表示，路径用直线表示。每一个牧区都有自己的坐标：

```plain
                (15,15) (20,15)
                 D       E
                 *-------*
                 |     _/|
                 |   _/  |
                 | _/    |
                 |/      |
        *--------*-------*
        A        B       C
     (10,10)  (15,10) (20,10)
```
这个牧场的直径大约是 $12.07106$，最远的两个牧区是 A 和 E，它们之间的最短路径是 $A \to B \to E$。

这里是 John 的另一个牧场：

```plain
                         *F(30,15)
                        / 
                      _/  
                    _/    
                   /      
                  *------* 
                  G      H
                  (25,10)   (30,10)
```

在这个例子中，他刚好有这两个牧场。John 将会在这两个牧场中各选一个牧区（即从 $\{A,B,C,D,E\}$ 中选择一个牧区，从 $\{F,G,H\}$ 中选择一个牧区），然后用一条路径将它们连起来，使得连通后这个新的更大的牧场的直径尽可能小。

注意，如果两条路径中途相交，我们不认为它们是连通的。只有两条路径在同一个牧区相交，我们才认为它们是连通的。

输入文件包括牧区、它们各自的坐标，还有一个如下的对称邻接矩阵：

```plain
　 A  B  C  D  E  F  G  H 
A  0  1  0  0  0  0  0  0
B  1  0  1  1  1  0  0  0
C  0  1  0  0  1  0  0  0
D  0  1  0  0  1  0  0  0
E  0  1  1  1  0  0  0  0
F  0  0  0  0  0  0  1  0
G  0  0  0  0  0  1  0  1
H  0  0  0  0  0  0  1  0
```

其他邻接表中可能直接使用行列而不使用字母来表示每一个牧区。输入数据中不包括牧区的名字。

输入文件 **至少** 包括两个不连通的牧区。

请编程找出一条连接属于两个 **不同牧场** 的牧区的路径，使得连上这条路径后，这个更大的新牧场的直径尽可能小。输出在所有合法的连接方案中，新牧场直径的最小值。

### 输入格式

第一行一个整数 $N$（$1 \leq N \leq 150$），表示牧区数。

接下来 $N$ 行，每行两个整数 $X,Y$（$0 \leq X ,Y \leq 10^5$），表示 $N$ 个牧区的坐标。注意每个牧区的坐标都是不一样的。

接下来 $N$ 行，每行 $N$ 个数字，代表邻接矩阵 $M$。第 $i$ 行第 $j$ 列的数字为 $1$，表示 $i$ 号牧区和 $j$ 号牧区之间存在一条道路直接相连；第 $i$ 行第 $j$ 列的数字为 $0$，表示 $i$ 号牧区和 $j$ 号牧区之间不存在直接相连的道路。

保证 $M_{i,j} = M_{j,i}$。

### 输出格式

只有一行，包括一个实数，表示所求直径。数字保留六位小数。

只需要打到小数点后六位即可，不要做任何特别的四舍五入处理。

### 样例 #1

#### 样例输入 #1

```
8
10 10
15 10
20 10
15 15
20 15
30 15
25 10
30 10
01000000
10111000
01001000
01001000
01110000
00000010
00000101
00000010
```

#### 样例输出 #1

```
22.071068
```

### 提示

样例对应题目描述中的情况。

最优解是连接 C 牧区和 G 牧区，连接后图上只有一个牧场。这个牧场的直径为 $A \to B \to C \to G \to F$，长度约为 $22.071068$。可以证明不存在更优的方案。

USACO 2.4

## 题解

### 分析

这道题，一个字 —— 绕。先解释一下这道题里各个关键词的意思吧：

- 牧区：一个点
- 牧场：由多个牧区组成的连通块
- 两个牧区之间的距离：两个牧区在图上所对应点点最短路
- 牧场的直径：设两个端点分别为 $i,j$ ，使得牧场 $i$ 和牧场 $j$ 之间的距离最大
- 答案：一条端点为 $i,j$ 的路径，使得新的连通块（牧场）的直径最小（也就是说，使这个连通块内两个最远点的最短距离最大）

那么问题就分成了四个子问题：

1. 通过给定的邻接矩阵求出不同的连通块
2. 求任意点 $i,j$ 之间的最短路
3. 求每个牧场的直径
4. 求从每个点出发所到达的最远距离

对于问题一，显然是一个染色问题，考虑使用并查集求解。

对于问题二，注意到点的数量 $N \leq 150$  ，使用复杂度为 $\Theta(n^3)$ 的 Floyd 求多源最短路完全可以满足需求，故采用 Floyd 求解。虽然可以使用 Dijkstra + 斐波那契堆优化至接近 $\Theta(n^2 \times \log n)$ ，但对于此题来说需求不大。

对于问题三、四，显然有了上述两个子问题的结果后不难实现，采用 $\Theta(n^2)$ 的朴素枚举即可。

需要注意的是，最终的答案需要分为三种情况考虑。设当前答案使用 $i \lrarr j$ 边连接连通块 $A,B$ ，则当前答案 $S$ 为：
$$
S = \max(D_{A}, D_{B}, L_{i} + L_{j} + |i,j|)
$$
其中，$D_x$ 表示连通块 $x$ 的直径；$L_x$ 表示从点 $x$ 出发所到达的最远距离，$|u,v|$ 表示边 $u \lrarr v$ 的边权（即长度）。

最后枚举 $i,j$ 求最优答案即可。

### 代码

```cpp
// Problem: P1522 [USACO2.4] 牛的旅行 Cow Tours
// Contest: Luogu
// URL: https://www.luogu.com.cn/problem/P1522
// Memory Limit: 128 MB
// Time Limit: 1000 ms
//
// Powered by CP Editor (https://cpeditor.org)

#include <memory.h>

#include <algorithm>
#include <cmath>
#include <cstdio>
#include <iomanip>
#include <iostream>
#include <queue>
#include <stack>
#include <string>
#include <vector>
using namespace std;
const int N = 200, M = 1e5 + 10, INF = 0x7f7f7f7f;

int n, bin[N];
// max_to_go[i] 表示从i出发到达的最远距离，diameter[i] 表示连通块i的直径
double g[N][N], max_to_go[N], diameter[N], ans = INF;

struct Point {
    int x, y;
} p[N];

int Find(int x) {
    if (bin[x] == x) return x;
    return bin[x] = Find(bin[x]);
}

void Union(int u, int v) {
    int fu = Find(u), fv = Find(v);
    if (fu != fv) {
        bin[fu] = fv;
    }
}

double get_dis(Point a, Point b) {
    return sqrt(pow(a.x - b.x * 1.0, 2) + pow(a.y - b.y * 1.0, 2));
}

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) bin[i] = i;
    for (int i = 1; i <= n; i++) {
        cin >> p[i].x >> p[i].y;
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            char ch;
            cin >> ch;
            if (ch == '1' || i == j) {
                g[i][j] = get_dis(p[i], p[j]);
                Union(i, j);
            } else {
                g[i][j] = INF;
            }
        }
    }
    // Floyd 板子
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                g[i][j] = min(g[i][j], g[i][k] + g[k][j]);
            }
        }
    }
    for (int i = 1; i <= n; i++) {
        int fi = Find(i);
        for (int j = 1; j <= n; j++) {
            if (Find(i) != Find(j)) continue;
            // 最远距离
            max_to_go[i] = max(max_to_go[i], g[i][j]);
        }
        // 当前连通块的最远距离就是连通块内所有点所能到达的最远距离的最大值
        diameter[fi] = max(diameter[fi], max_to_go[i]);
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (Find(i) == Find(j)) continue;
            // 求 i, j 所在连通块的最大直径
            double max_diameter = max(diameter[Find(i)], diameter[Find(j)]);
            // 求最优答案
            ans =
                min(ans, max(max_to_go[i] + max_to_go[j] + get_dis(p[i], p[j]),
                             max_diameter));
        }
    }
    // 六位精度！！
    cout << fixed << setprecision(6) << ans << endl;
    return 0;
}
```
---
title: "[最短路] P5837 Milk Pumping G 题解"
desc: "洛谷 P5837 [USACO19DEC]Milk Pumping G 题解"
cover: /assets/posts/solution-p5837.jpg
date: 2022.07.21
tags:
  - 算法
  - C++
  - OI
---

## 题目

链接：<https://www.luogu.com.cn/problem/P5837>

### 题目描述

Farmer John 最近为了扩张他的牛奶产业帝国而收购了一个新的农场。这一新的农场通过一个管道网络与附近的小镇相连，FJ 想要找出其中最合适的一组管道，将其购买并用来将牛奶从农场输送到小镇。

这个管道网络可以用 $N$ 个接合点（管道的端点）来描述，将其编号为 $1 \ldots N$。接合点 $1$ 表示 FJ 的农场，接合点 $N$ 表示小镇。有 $M$ 条双向的管道，每条连接了两个接合点。使用第 $i$ 条管道需要 FJ 花费 $c_i$ 美元购入，可以支持每秒 $f_i$ 升牛奶的流量。

FJ 想要购买一条管道组成一条单一路径，路径的两端点分别为接合点 $1$ 和 $N$。这条路径的花费等于路径上所有管道的费用之和。路径上的流量等于路径上所有管道的最小流量（因为这是沿这条路径输送牛奶的瓶颈）。FJ 想要最大化路径流量与路径花费之比。保证存在从 $1$ 到 $N$之间的路径。

### 输入格式

输入的第一行包含 $N$ 和 $M$。以下 $M$ 行每行以四个整数描述一条管道：$a$ 和 $b$（管道连接的两个不同的接合点），$c$（管道的花费），以及 $f$（管道的流量）。花费和流量均为范围 $1 \ldots 1000$ 之内的正整数。

### 输出格式

输出 $10^6$ 乘以最优解的值，并向下取整（也就是说，如果这个数本身不是整数，输出小于它的最接近它的整数）。

### 样例 #1

#### 样例输入 #1

```
3 2
2 1 2 4
2 3 5 3
```

#### 样例输出 #1

```
428571
```

### 提示

在这个例子中，仅由一条路径从 $1$ 到 $N$。 它的流量为 $\min(3,4)=3$，花费为 $2+5=7$。

### 数据范围

测试点 $2\sim 5$ 满足 $N,M\le 100$。

对于 $100\%$ 的数据，$2 \leq N \leq 1000$，$1 \leq M \leq 1000$。

供题：Brian Dean

## 题解

### 分析

第一眼看到这个题目，以为是最短路板子，心想这题也能评绿。再一看发现这个最短路有两个评价指标，花费和流量。

设 $M$ 条管道需要花费 $C = \sum c_i$ ，流量 $F = \min(f_i)$ 。那么题目所求也就是 $\frac{C}{F}$ 的最大值，即 $\frac{\sum c_i}{\min(f_i)}$ ，且至少有一条由 $1$ 通往 $n$ 的路径。

不难发现若直接使用最短路枚举两个条件的最优解极其复杂，固考虑枚举流量 $1 \leq f_i \leq 1000$ ，再用 $c_i$ 为边权跑最短路模板，最后取最大值即可。如果当前边所对应的流量 $< f_i$ ，则跳过当前边。因为答案需要保证连通性，所以最后还需要判断能否到达 $n$ 点。

考虑使用 Dijkstra 堆优化为最短路算法，则时间复杂度为 $\Theta(n^2 \times \log n)$ ，极限情况约为 $10^7$ ，可以接受。

其实这道题也可以不用枚举 $1 \leq f_i \leq 100$ ，直接枚举 $M$ 条管道的流量即可，但对最终复杂度的变化不大，~~加上本人鸽子~~ ，就不优化了。

总的来说这道题没啥坑点，只要能想到枚举 $f_i$ 就不难通过，细节地方在代码里注释了。

## 代码

```cpp
#include <algorithm>
#include <cstdio>
#include <iostream>
#include <memory.h>
#include <queue>
using namespace std;
const int N = 1e6 + 10;
const int M = 1e6;
const int INF = 0x3f3f3f3f;

int n, m, ans;
int h[N], idx = 0;
int dis[N], vis[N];

struct Edge {
    int nxt, v, w, f;

    Edge()
    {
        this->nxt = -1, this->v = -1, this->w = INF, this->f = INF;
    }

    Edge(int _nxt, int _v, int _w, int _f)
    {
        this->nxt = _nxt, this->v = _v, this->w = _w, this->f = _f;
    }
} edges[N];

struct Node {
    int dis, vtx;

    Node(int _dis, int _vtx)
    {
        this->dis = _dis, this->vtx = _vtx;
    }

    friend bool operator<(Node x, Node y)
    {
        // 注意这个符号方向，我因为这个卡了好久
        return x.dis > y.dis;
    }
};

priority_queue<Node> q;

// 邻接表存图
void addEdge(int a, int b, int c, int f)
{
    idx++;
    edges[idx].v = b, edges[idx].nxt = h[a], edges[idx].w = c, edges[idx].f = f, h[a] = idx;
}

// Dijkstra 板子
void dijkstra(int u, int lim)
{
    dis[u] = 0;
    q.push(Node(0, u));
    while (!q.empty()) {
        Node cur = q.top();
        q.pop();
        int tmp = cur.vtx;
        if (vis[tmp])
            continue;
        vis[tmp] = 1;
        int p = h[tmp];
        while (p != -1) {
            // 当前管道流量过小，忽略
            if (edges[p].f < lim) {
                // 下面这行也要注意，我一开始没加就死循环了
                p = edges[p].nxt;
                continue;
            }
            if (dis[tmp] + edges[p].w < dis[edges[p].v]) {
                dis[edges[p].v] = dis[tmp] + edges[p].w;
                if (!vis[edges[p].v])
                    q.push(Node(dis[edges[p].v], edges[p].v));
            }
            p = edges[p].nxt;
        }
    }
}

int main()
{
    memset(h, -1, sizeof(h));
    cin >> n >> m;
    for (int i = 1; i <= m; i++) {
        int a, b, c, f;
        cin >> a >> b >> c >> f;
        addEdge(a, b, c, f);
        addEdge(b, a, c, f);
    }
    for (int i = 1; i <= 1000; i++) {
        // 别忘了初始化
        memset(dis, 0x3f, sizeof(dis));
        memset(vis, 0, sizeof(vis));
        dijkstra(1, i);
        if (dis[n] != INF)  // 判断能否到达 n
            ans = max(ans, i * M / dis[n]);
    }
    cout << ans << endl;
    return 0;
}
```

AC++！
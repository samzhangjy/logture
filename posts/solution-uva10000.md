---
title: "[图论] UVA10000 Longest Paths 题解"
desc: "洛谷 UVA10000 Longest Paths 题解 图论/最长路"
cover: /assets/posts/solution-uva10000.jpg
date: 2022.08.09
tags:
  - 算法
  - C++
  - OI
---

看到各位大佬都是用的 Floyd ，让本蒟蒻来~~水~~一篇 SPFA 吧（）

## Description

给定一个边权均为 $1$ 的有向无环图，求该图的最长路。

## Solution

看到题第一反应是这题好难，但其实不然。所谓“最长路”只不过就是把边权都换成负数在新图上面跑一遍最短路而已。

于是，我们就可以开开心心地敲上 SPFA 板子然后取最值啦！

## Code

```cpp
// Problem: UVA10000 Longest Paths
// Contest: Luogu
// URL: https://www.luogu.com.cn/problem/UVA10000
// Memory Limit: 0 MB
// Time Limit: 3000 ms
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
const int N = 5010, INF = 0x3f3f3f3f;

int n, T = 1, u, v, ans, minn, s;
int h[N], w[N], vtx[N], nxt[N], idx;
long long dis[N], vis[N];
queue<int> q;

// 邻接表存图
void addEdge(int a, int b, int c) {
    vtx[idx] = b, nxt[idx] = h[a], w[idx] = c, h[a] = idx++;
}

// SPFA 板子
void spfa(int s) {
    memset(dis, 0x3f, sizeof(dis));
    memset(vis, 0, sizeof(vis));
    dis[s] = 0;
    q.push(s);
    vis[s] = 1;
    while (!q.empty()) {
        int tmp = q.front();
        vis[tmp] = 0;
        int p = h[tmp];
        while (p != -1) {
            int v = vtx[p];
            if (dis[tmp] + w[p] <= dis[v]) {
                dis[v] = dis[tmp] + w[p];
                if (!vis[v]) {
                    q.push(v);
                    vis[v] = 1;
                }
            }
            p = nxt[p];
        }
        q.pop();
    }
}

int main() {
    while (cin >> n) {
        // 输入到0结束
        if (n == 0) break;

        // 初！始！化！
        memset(h, -1, sizeof(h));
        memset(vtx, 0, sizeof(vtx));
        memset(nxt, 0, sizeof(nxt));
        memset(w, 0, sizeof(w));
        idx = 0;

        cin >> s;
        // 存边
        while (cin >> u >> v) {
            if (u == 0 && v == 0) break;
            // 存的是负边权
            addEdge(u, v, -1);
        }

        spfa(s);
        ans = -1, minn = INF;
        for (int i = 1; i <= n; i++) {
            if (dis[i] < minn) {
                ans = i, minn = dis[i];
            }
        }
        cout << "Case " << T << ": The longest path from " << s
             << " has length " << -minn << ", finishing at " << ans << "."
             << endl
             << endl;
        T++;
    }
    return 0;
}
```

## 附：为什么不能用 Dijkstra 求最长路

Dijkstra 使用贪心算法来计算最短路，依赖于最优子结构求解。与存在负边权的图同理，使用 Dijkstra 求最长路不满足最优子结构的条件：选择当前最长的边不一定代表总体最长。

在任意图上求最长路[被证明是 NP-Hard 的](https://en.wikipedia.org/wiki/Longest_path_problem#Acyclic_graphs) ，但如果在类似此题中的 DAG（有向无环图）中最长路却可以使用这篇题解中的 SPFA 之类的算法求解。

**参考：**

- <https://en.wikipedia.org/wiki/Longest_path_problem>
- <https://stackoverflow.com/questions/8027180/dijkstra-for-longest-path-in-a-dag>
- <https://blog.csdn.net/hesorchen/article/details/115370721>

如果题解中有错误还请大佬指出qwq
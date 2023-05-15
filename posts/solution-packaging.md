---
title: "[DP] 打包 题解"
desc: "信奥赛 DP 动态规划题目 打包 题解"
cover: /assets/posts/solution-packaging.jpg
date: 2022.07.12
tags:
  - 算法
  - C++
  - OI
column: OI历程
---

## 题目

链接：http://182.254.140.138:8888/p/617

### 说明

你现在拿到了许多的礼物，你要把这些礼物放进袋子里。你只有一个最多装下V 体积物品的袋子，你不能全部放进去。你也拿不动那么重的东西。你估计你能拿的最大重量为 G。现在你了解了每一个物品的完美值、重量和体积，你当然想让袋子中装的物品的完美值总和最大，你又得计划一下了。

### 输入格式

第一行：G 和 V 表示最大重量和体积。 第二行：N 表示拿到 N 件礼物。 第三到N+2行：每行3个数 Ti Gi Vi 表示各礼物的完美值、重量和体积

### 输出格式

输出共一个数，表示可能获得的最大完美值。

### 样例

#### 输入数据 1

```input1
6 5		
4		
10 2 2		
20 3 2
40 4 3
30 3 3
```

#### 输出数据 1

```output1
50
```

### 提示

对于20%的数据 N，V，G，Ti，Vi，Gi≤10
对于50%的数据 N，V，G，Ti，Vi，Gi≤100
对于80%的数据 N，V，G，Ti，Vi，Gi≤300
80%到100%的数据是N，V，G，Ti，Vi，Gi≤380 的离散随机数据。

## 题解

### 分析

第一眼看上去像 01 背包问题，但是仔细一看发现有两个条件（ 01 背包只有一个重量限制，这个有重量和体积）。01 背包的基础上多加一维体积就可以了。

$dp_{i,j}$  表示当前装的重量为 $i$ ，体积为 $j$ 。转移方程式如下：


$$
current_G = gifts_k.g, \ current_V = gifts_k.v
$$

$$
dp_{i,j} = \max(dp_{i,j}, dp_{i - current_G,j - current_V} + gifts_k.t)
$$

### 代码

```cpp
#include <iostream>
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <memory.h>
#include <string>
#include <map>
#include <set>
using namespace std;
const int N = 400;

int g, v, n, ans;
int dp[N][N];

struct Gift {
    int t, g, v;
} gifts[N];

int main() {
    cin >> g >> v >> n;

    for (int i = 1; i <= n; i++) {
        cin >> gifts[i].t >> gifts[i].g >> gifts[i].v;
    }

    for (int k = 1; k <= n; k++) {  // 当前礼物
        for (int i = g; i >= gifts[k].g; i--) {  // 当前重量
            for (int j = v; j >= gifts[k].v; j--) {  // 当前体积
                dp[i][j] = max(dp[i][j], dp[i - gifts[k].g][j - gifts[k].v] + gifts[k].t);
            }
        }
    }

    cout << dp[g][v] << endl;
    return 0;
}
```

AC++, rp++!

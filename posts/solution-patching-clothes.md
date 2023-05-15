---
title: "[DP] 补圣衣 题解"
desc: "信奥赛 DP 动态规划题目 补圣衣 题解"
cover: /assets/posts/solution-补圣衣.jpg
date: 2022.07.17
tags:
  - 算法
  - C++
  - OI
---

## 题目

链接：<http://182.254.140.138:8888/p/621>

### 说明

有四个人，每人身上的衣服分别有s1,s2,s3和s4处破损,而且每处破损程度不同,破损程度用需修好它用的时间表示(A1...As1,B1...Bs2,C1...Cs3,D1...Ds4)。不过你可以同时修补2处破损。但是这2处破损，只能是同一件衣服上的。就是说你只能同时修补一件衣服，修好了，才能修补下一件。

### 输入格式

本题包含5行数据：第1行，为s1,s2,s3,s4(1≤s1,s2,s3,s4≤20) 第2行，为A1...As1 共s1个数，表示第一件衣服上每个破损修好它所需的时间 第3行，为B1...Bs2 共s2个数，表示第二件衣服上每个破损修好它所需的时间 第4行，为C1...Cs3 共s3个数，表示第三件衣服上每个破损修好它所需的时间 第5行，为D1...Ds4 共s4个数，表示第四件衣服上每个破损修好它所需的时间 (1≤A1...As1,B1...Bs2,C1...Cs3,D1...Ds4≤60)

### 输出格式

输出一行,为修好四件衣服所要的最短时间。

### 样例

#### 输入数据 1

```input1
1 2 1 3		
5
4 3
6
2 4 3
```

#### 输出数据 1

```output1
20
```

## 题解

### 分析

一道 DP 题。

> 就是说你只能同时修补一件衣服，修好了，才能修补下一件。

这段话相当于明示了这四件衣服互不相干，可以拆分成四个子问题分别求解。

注意到可以同时修补一件衣服上的两个破洞，所以枚举情况的时候只需要枚举 $\frac{sum}{2}$ 种时间情况即可。

在进行 DP 之前需要先将 $a$ 数组升序排序，这样后面枚举状况的时候就可以直接枚举一大一小两处破损了。

转移方程式：

$$
dp_{i,j} =
\begin{cases}
dp_{i - 1, j}\hspace{5mm}& j < a_i\\
\max(dp_{i - 1, j}, dp_{i - 1, j - a_i} + a_i) & \text{otherwise}
\end{cases}
$$

注意所有的取最值操作都是 $\max$ ，必须取修复两处破损的最大时间为同时修补这两处破损的总时间。

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
const int N = 1010;

int a[N], dp[N][N], ans, s[5];

int main() {
    for (int i = 1; i <= 4; i++)
        cin >> s[i];

    for (int k = 1; k <= 4; k++) {
        int n = s[k], sum = 0, partialAns = 0;
        memset(dp, 0, sizeof(dp));

        for (int i = 1; i <= n; i++) {
            cin >> a[i];
            sum += a[i];
        }

        sort(a + 1, a + n + 1);

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j <= sum / 2; j++) {
                dp[i][j] = dp[i - 1][j];

                if (j >= a[i])
                    dp[i][j] = max(dp[i][j], dp[i - 1][j - a[i]] + a[i]);

                partialAns = max(partialAns, dp[i][j]);
            }
        }

        ans += max(partialAns, sum - partialAns);
    }

    cout << ans << endl;
    return 0;
}
```

AC++！

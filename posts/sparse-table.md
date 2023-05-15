---
title: "浅谈 ST 表"
desc: "ST 表是一种对于 RMQ 区间最值问题的一种较优解决方案，能够实现常数复杂度的查询与对数级别的构建。"
cover: /assets/posts/sparse-table.jpg
date: 2022.08.08
tags:
  - 算法
  - C++
  - OI
---

## 什么是 ST 表

ST 表，即 Sparse Table ，是一种基于倍增思想的数据结构，常用来解决静态 RMQ（**R**ange **M**inimum / **M**aximum **Q**uery，区间最值询问）问题。

一般来讲，ST 表可用于解决大部分区间可重复贡献问题。此处的**可重复贡献问题**指，对于任意的运算 $\text{opt}$ ，满足 $x\ \text{opt}\ x = x$ 的即为可重复贡献问题，例如对于最值问题有 $\max(x,x) = x$。[^1]

## 浅析 ST 表

ST 表的基本思路基于可重复贡献问题的特性，即两个重叠子问题的重复计算不会影响最终的计算答案。下面是一道 ST 表的模板题：

给定 $N$ 个数字与 $M$ 次询问，求对于任意询问 $i$ ，区间 $[l_i, r_i]$ 内的最大值。

详见 [洛谷 P3865](https://www.luogu.com.cn/problem/P3865) 。

对于这个问题，不难想到暴力的解法：对于每个询问查询最大值，但是在 $M \leq 2 \times 10^6$ 的数据范围下很明显会超时。于是我们考虑倍增的思路：用 $f(i,j)$ 表示第 $i$ 个数往后 $2^j - 1$ 个数的最大值，即区间 $[i, i + 2^j - 1]$ 的最大值。

于是，有了这样的定义，我们不难发现 $f(i,j)$ 的值取决于 $[i, i + 2^{j - 1} - 1]$ 与 $[i + 2^{j - 1}, i + 2^j - 1]$ 的值，如此往复，在实现过程中的时间复杂度约为 $O(N \times \log N)$ 。

构建部分代码如下：

```cpp
void build() {
    int lim = log2(n);
    for (int j = 1; j <= lim; j++) {
        // i + (1 << j) - 1 为当前区间右端点
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            // 当前值取决于左右两子区间的值
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
        }
    }
}
```

接下来是询问操作。对于任意区间 $[l,r]$ ，我们一定能够找到两个区间 $A,B$ ，使得 $A$ 与 $B$ 的并集完全覆盖 $[l,r]$ ，$A$ 与 $B$ 之间可以有重合部分。如果设 $A$ 为左子区间，$B$ 为右子区间，不难发现 $A = [l, l + 2^k - 1]$ ，其中 $k = \log_{2}(r - l + 1)$ 。

对于区间 $B$ ，假设需要找到的左端点为 $x$ ，即 $B = [x, r]$ 。显然需要使得 $x + 2^k - 1 = r$ ，移项，得 $x = r - 2^k + 1$ 。所以区间 $B = [r - 2^k + 1, r]$ 。这样，$A + B$ 的覆盖范围一定包含 $[l, r]$ 中的任意元素，取 $\max(A, B)$ 即为答案。

ST 表的查询操作拥有优秀的 $O(1)$ 时间复杂度，每次仅需进行一次 $\log$ 操作与取最值操作。但取对数的步骤显然可以使用预处理进行优化。查询部分代码如下：

```cpp
int query(int l, int r) {
    int k = log2(r - l + 1);
    return max(f[l][k], f[r - (1 << k) + 1][k]);
}
```

基于这样的实现方式，ST 表可以做到 $O(n \log n)$ 的预处理与 $O(1)$ 询问，但是不支持修改操作。完整版代码如下：

```cpp
// Problem: P3865 【模板】ST 表
// Contest: Luogu
// URL: https://www.luogu.com.cn/problem/P3865
// Memory Limit: 125 MB
// Time Limit: 800 ms
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
const int N = 1e5 + 10, M = 20;

int n, m, a[N], f[N][M];

inline int read() {
    int x = 0, f = 1;
    char ch = getchar();
    while (ch < '0' || ch > '9') {
        if (ch == '-') f = -1;
        ch = getchar();
    }
    while (ch >= '0' && ch <= '9') {
        x = x * 10 + ch - 48;
        ch = getchar();
    }
    return x * f;
}

void build() {
    int lim = log2(n);
    for (int j = 1; j <= lim; j++) {
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
        }
    }
}

int query(int l, int r) {
    int k = log2(r - l + 1);
    return max(f[l][k], f[r - (1 << k) + 1][k]);
}

int main() {
    // 数据过大需要优化输入输出
    n = read(), m = read();
    for (int i = 1; i <= n; i++) {
        a[i] = read();
        f[i][0] = a[i];
    }
    build();
    for (int i = 1; i <= m; i++) {
        int l = read(), r = read();
        printf("%d\n", query(l, r));
    }
    return 0;
}
```

## 习题

### P2880 [USACO07JAN] Balanced Lineup G

链接：<https://www.luogu.com.cn/problem/P2880> 。

#### 题目大意

给定 $N$ 个整数以及 $M$ 个询问，求对于每个询问 $i$ ，区间 $[l_i, r_i]$ 的最大值与最小值之差。

#### 分析

几乎是 RMQ 模板题，需要支持两种最值操作，数据范围甚至没有模板题严格，使用朴素 ST 表即可。

#### 代码

```cpp
// Problem: P2880 [USACO07JAN] Balanced Lineup G
// Contest: Luogu
// URL: https://www.luogu.com.cn/problem/P2880
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
const int N = 5 * 1e4 + 10, M = 16;

int n, m, a[N];

template <typename T, typename U = less<int>>
class SparseTable {
   private:
    T f[N][M];
    int len;
    U cmp;

   public:
    SparseTable(int _len, int data[]) {
        len = _len;
        cmp = U();
        for (int i = 1; i <= _len; i++) {
            f[i][0] = data[i];
        }
        build();
    }

    void build() {
        int lim = log2(len), a = -1, b = -1;
        for (int j = 1; j <= lim; j++) {
            for (int i = 1; i + (1 << j) - 1 <= n; i++) {
                a = f[i][j - 1], b = f[i + (1 << (j - 1))][j - 1];
                f[i][j] = cmp(a, b) ? a : b;
            }
        }
    }

    int query(int l, int r) {
        int k = log2(r - l + 1);
        int a = f[l][k], b = f[r - (1 << k) + 1][k];
        return cmp(a, b) ? a : b;
    }
};

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    SparseTable<int, less<int>> minTable(n, a);
    SparseTable<int, greater<int>> maxTable(n, a);

    for (int i = 1; i <= m; i++) {
        int l, r;
        cin >> l >> r;
        cout << maxTable.query(l, r) - minTable.query(l, r) << endl;
    }
    return 0;
}
```

更多习题补充中……

[^1]: 参见 [OI-Wiki](https://oi-wiki.org/ds/sparse-table/#_1) 。
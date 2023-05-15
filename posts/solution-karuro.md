---
title: 简单数迷 题解
desc: BZOJ 2469 JZOJ 2198. 【中山市选2010】简单数迷 题解
cover: /assets/posts/solution-karuro.jpg
date: 2022.07.11
tags:
  - 算法
  - C++
  - OI
---



## 题目

链接：<http://182.254.140.138:8888/p/216>

### 题目说明

很多人都曾经听说过数独，但你是否听说过数谜（Karuro）呢？实际上，数谜是数独的更大（且更难）的兄弟问题，而且在日本也是非常受欢迎的。

数谜问题和填字游戏类似，不过它要填的不是文字而是数字。数谜游戏的目标是用 $1 ～\ 9$ 填满所有空格，且这些数字相加的和满足相应的要求（或者称为“提示”），且在同一栏（“栏”是指一些水平或者竖直的连续的空格，用于提示的格子不算空格）不能填重复的数字。当所有格子按要求被填满后，这个数谜就看作被解决了。图 1 和图 2 是一个可能的数谜游戏示例。

![img](https://www.freesion.com/images/558/786845b3b03367143ec7327c0c169bde.JPEG)

当然，直接求解数谜问题的话会比较困难。所以现在我们需要解决的是一个更简单的数谜问题。简单数谜的形状是一个 $(n+1)$ 行乘 $(m+1)$ 列的矩形。而简单数谜也只有两种要求，就是行要求和列要求，且分别处于第一行和第一列，其他格子则是空格，而左上角是忽略不计的。coolzzz 同学爱好简单数谜，他已经给一些简单数谜填好了其中的一些空格。现在，他想寻求你的帮助，来帮他完成这些简单数谜。如图 3 所示，2 和 9 是 coolzzz 同学已经填好的空格，图 4 则是一个基于图 3 的一个可能的解答。

### 输入格式

输入包含多组测试数据。第一行包含一个正整数 $T$ ，表示测试数据数目。每组数据第一行是 $n\ (n< 10)$ 和 $m\ (m< 10)$，表示数谜的形状的大小。接下来一行有 $n$ 个整数，是相应的行要求；然后一行是 $m$ 个整数，是相应的列要求。接下来的 $n$ 行每行有 $m$ 个小于 $10$ 的非负整数，0 表示该空格还没有被填数字，其他表示 coolzzz 同学已经填好的数字。输入数据保证未填数字的空格不会超过 $16$ 个。

### 输出格式

对于每组测试数据，输出若干行。如果基于 coolzzz 已填的结果，该数谜只有一个解，则输出该解；如果不止一个解，则输出一行 `Not unique.`；如果没有解，则输出一行 `No answer.`。

### 样例

#### 输入样例 1

```
3
3 3
6 6 6
6 6 6
0 0 0
0 3 0
0 0 0
2 3
10 17
5 16 6
2 0 0
0 9 0
2 2
3 5
4 4
0 0
0 0
```

#### 输出样例 1

```
Not unique.
2 7 1
3 9 5
No answer.
```

## 题解

### 分析

空着的格子数量 $\leq 16$ ，果断考虑爆搜。基本上就是八皇后的进阶版，注意每个测试样例的初始化和 DFS 的回溯就行。

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
const int N = 15;

// ans 答案数目，solved 当前解
int n, m, mp[N][N], T, ans, solved[N][N];
// column_sum[i] 第i行的和，row_sum[i] 第i列第和，exists_on_column[i][j] 在第i行是否存在j这个数字，exists_on_row[i][j] 在第i列是否存在j这个数字
int column_sum[N], row_sum[N], exists_on_column[N][N], exists_on_row[N][N];
// column_req 存储行要求，row_req 存储列要求（分别是输入第1、2行）
int column_req[N], row_req[N];

struct Point {
    int x, y;

    Point(int _x, int _y) {
        this -> x = _x, this -> y = _y;
    }
};

void init() {
    ans = n = m = 0;
    memset(mp, 0, sizeof(mp));
    memset(column_req, 0, sizeof(column_req));
    memset(row_req, 0, sizeof(row_req));
    memset(column_sum, 0, sizeof(column_sum));
    memset(row_sum, 0, sizeof(row_sum));
    memset(solved, 0, sizeof(solved));
    memset(exists_on_column, 0, sizeof(exists_on_column));
    memset(exists_on_row, 0, sizeof(exists_on_row));
}

void dfs(Point cur) {
    // 已经有多个解了就没必要继续搜了
    if (ans >= 2)
        return;

    // 搜到头了
    if (cur.x > n) {
        bool is_valid = 1;

        // 检查当前解是否合规 
        for (int i = 1; i <= n; i++) {
            if (column_sum[i] != column_req[i]) {
                is_valid = 0;
                break;
            }
        }

        if (!is_valid)
            return;

        for (int i = 1; i <= m; i++) {
            if (row_sum[i] != row_req[i]) {
                is_valid = 0;
                break;
            }
        }

        if (!is_valid)
            return;

        // 合规
        ans++;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++)
                solved[i][j] = mp[i][j];
        }

        return;
    }

    // 一行一行地搜
    if (cur.y > m) {
        dfs(Point(cur.x + 1, 1));
        return;
    }

    // 当前数字填过了
    if (mp[cur.x][cur.y] != 0) {
        dfs(Point(cur.x, cur.y + 1));
        return;
    }

    // 没填过，现在填
    for (int i = 1; i <= 9; i++) {
        if (!exists_on_column[cur.x][i] && !exists_on_row[cur.y][i] && column_sum[cur.x] + i <= column_req[cur.x] &&
                row_sum[cur.y] + i <= row_req[cur.y]) {  // 当前值是否合法
            exists_on_column[cur.x][i] = 1;
            exists_on_row[cur.y][i] = 1;
            column_sum[cur.x] += i;
            row_sum[cur.y] += i;
            mp[cur.x][cur.y] = i;
            dfs(Point(cur.x, cur.y + 1));
            // 注意回溯
            exists_on_column[cur.x][i] = 0;
            exists_on_row[cur.y][i] = 0;
            column_sum[cur.x] -= i;
            row_sum[cur.y] -= i;
            mp[cur.x][cur.y] = 0;
        }
    }
}

int main() {
    cin >> T;

    while (T--) {
        init();  // 初始化
        cin >> n >> m;

        for (int i = 1; i <= n; i++)
            cin >> column_req[i];

        for (int i = 1; i <= m; i++)
            cin >> row_req[i];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                cin >> mp[i][j];
                column_sum[i] += mp[i][j];
                row_sum[j] += mp[i][j];
                exists_on_column[i][mp[i][j]] = 1;
                exists_on_row[j][mp[i][j]] = 1;
            }
        }

        dfs(Point(1, 1));  // 左上角开始搜

        if (ans == 0) {
            cout << "No answer." << endl;
            continue;
        }

        if (ans > 1) {
            cout << "Not unique." << endl;
            continue;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                cout << solved[i][j] << " ";
            }

            cout << endl;
        }
    }

    return 0;
}
```

AC++！
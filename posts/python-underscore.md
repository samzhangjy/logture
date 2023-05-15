---
title: 你真的会用 Python 里的下划线吗？
desc: 如果你看过一些开源项目的源码，或深入研究过 Python 基础，就会发现在 Python 中，下划线无处不在。不仅如此，它的形式还五花八门，让人摸不着头脑。今天，我们就来探讨一下 Python 下划线的那些事。
cover: /assets/posts/python-underscore.png
date: 2022.06.20
tags:
  - python
  - 文字稿
---

Hey guys, it's Sam Zhang.

如果你看过一些开源项目的源码，或深入研究过 Python 基础，就会发现在 Python 中，下划线无处不在。不仅如此，它的形式还五花八门，让人摸不着头脑。

这期视频，我们就来探讨一下 Python 下划线的那些事。

## 双下划线 —— 私有？

让我们先来讲一讲最有趣的双下划线吧。例如，下面这段代码：

```python
class SampleClass(object):
    def __init__(self):
        super().__init__()
        self.__private_method()

    def __private_method(self):
        print("I'm private!")

if __name__ == "__main__":
    obj = SampleClass()  # works!
    # obj.__private_method()  # AttributeError
    print(dir(SampleClass))
    obj._SampleClass__private_method()  # works!
```

定义了一个 SampleClass 类，并在其中定义了一个名叫 `__private_method` 的方法。

你尝试在 SampleClass 中通过 `self.__private_method` 来访问这个方法，一切正常运行。

但是，如果在已经实例化后的 SampleClass 对象中调用该方法，就会报错 AttributeError ，并不存在这样一个方法。

于是，我们可以提出一个合理猜测：双下划线开头的方法就是 Python 里的私有方法。

但是其实不然。原因很简单，如果你用 `dir(SampleClass)` 来查看这个类的所有成员函数的话，就会发现在其中有一个名叫 `_SampleClass__private_method()` 的方法：

```python
['_SampleClass__private_method', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']
```

如果你尝试从外部调用它，就会发现调用的就是之前定义的私有方法。

同样的，如果你定义了一个类继承自 SampleClass ，会发现它无法调用 `__private_method()` 。但是，如果你调用 `self._SampleClass__private_method()` ，就能够正常调用私有方法：

```python
class SampleClass(object):
    def __init__(self):
        super().__init__()
        self.__private_method()

    def __private_method(self):
        print("I'm private!")

class SampleClass2(SampleClass):
    def __init__(self):
        super().__init__()
        # self.__private_method()  # AttributeError
        self._SampleClass__private_method()  # works!

if __name__ == "__main__":
    obj = SampleClass()  # works!
    # obj.__private_method()  # AttributeError
    print(dir(SampleClass))
    obj._SampleClass__private_method()  # works!
    obj2 = SampleClass2()  # works!
```

值得一提的是，Python 中所谓的“私有方法”并不是其他语言中私有方法的概念。

在 Python 中，前置双下划线的标准说法叫做 **名称修饰** ，或 *name mangling* 。解释器会在运行过程中自动将前置双下划线的方法转换为 `_CurrentClassName__method_name` 的形式，且子类无法直接通过 `self.__method_name` 访问父类方法。但是，子类仍然可以通过上面所说的 `self._CurrentClassName__method_name` 访问父类的双下划线方法，其中 CurrentClassName 为父类名称。

所以，Python 中以双下划线开头命名的成员函数，从某种意义上讲只是被解释器替换了名字，并没有真正“私有化”。如果你想要在子类中复写、调用这些经过命名修饰后的方法的话，也是完全可行的。但是，在一般情况下来说，你可能并不想这么干 —— 如果你复写了别人写的内部方法，很可能会导致意料之外的后果。

## 单下划线 —— 只是命名规范？

讲了这么多双下划线，来看看单下划线吧。在 Python 中，单下划线更倾向于一种命名规范，指明当前方法为私有方法，不建议进行改动且随时可能进行 API 更新。它并没有像双下划线那样有着解释器自动的名称修饰，意味着子类仍然可以直接复写或调用单下划线开头的方法。

但是，单下划线与普通方法还是有区别的。如果你在一个文件顶层定义了一个单下划线开头的方法，类或变量，当其他模块使用 `from xxx import *` 这种导入方式导入该文件中的成员的时候，将不会导入单下划线开头的成员。例如：

```python
_radius = 100
PI = 3.14

def _calc():
    return PI * _radius * _radius
```

然后，你在另一个文件中尝试导入这些变量：

```python
from my_file import *

print(PI)  # 3.14
print(_radius)  # NameError
print(_calc())  # NameError
```

你无法通过 `import *` 这个语法糖导入单下划线开头的对象。

也就是说，解释器自动将单下划线开头的对象从模块的 `__all__` 中移除了。但是，如果你手动定义 `__all__` 的话，仍然可以覆盖解释器的默认操作：

```python
# 手动复写 __all__
__all__ = ["PI", "_radius", "_calc"]

_radius = 100
PI = 3.14

def _calc():
    return PI * _radius * _radius
```

再进行导入的话：

```python
from my_file import *

print(PI)  # 3.14
print(_radius)  # 100
print(_calc())  # 31400.0
```

就可以正常运行啦！

## 后缀下划线 —— 规避重名

在 Python 中，你也许还见到过类似 `variable_` 这种命名方法，以单下划线结尾。一个最常见的例子就是 BeautifulSoup 中 `find()` 方法里 `class` 参数的命名被改成了 `class_ `。

这种单下划线后缀的命名方法通常是用来规避与内置关键词重名导致语法错误。常见的还有 `float_` ，`int_` ，`str_` 等。

当然，能不用这种命名方法就不用，尽量规避内置关键词，以免造成代码可读性降低。

## 两侧双下划线 —— 魔法函数

最后，在 Python 的类中还有一种奇特的下划线命名，形式如 `__method__` 。这种双前导双末尾下划线的形式在 Python 中通常为语言内置的魔法方法，例如 `__init__` ，`__add__` 等。

通常来讲，我们不建议将自己写的函数以这种形式命名，以免造成不必要的误解。当然，在需要自定义这些方法的时候，复写还是非常有必要的。

一些常见的魔法方法如 `__init__` ，`__del__` ，`__repr__` ，`__getattr__` 等。如果你想要了解更多魔法函数相关内容，可以去看一看 [这篇文章](https://segmentfault.com/a/1190000040286979) 。

## 写在最后

说了这么多，下划线的作用其实主要就是规范代码命名。这样，当你发布的包被其他人使用时，别人就能很轻松地知道这个方法能不能复写，该不该直接调用等等。

写好 Python 代码，从遵循 PEP8 开始。

那么以上就是本期视频的全部内容了，如果你觉得还不错的话，也请三连转发关注我，这对我创作都会是很大的动力。如果你发现了本期视频中的错误，也欢迎私信或者在评论区中留言，我也会及时改正。

我是 Sam Zhang ，我们下期再见！

## 参考资料

- Aggarwal, N. (2019, November 26). Private Methods in Python. Geeks for Geeks. https://www.geeksforgeeks.org/private-methods-in-python/
- Alya. (2003, September 16). Why are Python's 'private' methods not actually private? - Stack Overflow. Stack Overflow. https://stackoverflow.com/a/70900/13266491
- (2008, December 3). 9. Classes — Python 3.10.5 documentation. Python Documentation. https://docs.python.org/3/tutorial/classes.html#private-variables
- (2021, May 18). Private Methods in Python. DelftStack. https://www.delftstack.com/howto/python/python-private-method/
- Hettinger, R. (2013, March 21). Python's Class Development Toolkit. Next Day Video. https://www.youtube.com/watch?v=HTLu2DFOdTg&t=1988s
- 清风Python. (2020, September 13). 关于Python的前后、单双下划线作用，看完这篇文章吊打面试官. 简书. https://www.jianshu.com/p/f642ab3ec614
Primitives
==========

简单类型
--------

### Number

数字，如 1, 2, 3.14

### String

字符串，如 "abc", "hello", ""

### Bool

布尔值，如 true, false

### Int

整数，如 1, 2, 42, 0, -1

### Nat

自然数，如 0, 1, 2, 3

### Any

任意类型的值（但不能为空值，即不能为null或undefined），如 1, "a", {x: 1}, [1, 2]

简单类型构造器
--------------

一个简单类型构造器是一个函数，它接受一些值作为参数，返回一个类型

### Enum

枚举类型构造器，接受一个值的列表，返回一个枚举类型

用法：Enum([x, y, z])，表示一个包含 x, y, z 三个值的类型

如 Enum(["today", "tomorrow"]) 是一个枚举类型，符合该类型的值只有 "today" 和 "tomorrow"

### Value

单值类型构造器，接受一个值，返回一个单值类型

用法：Value(x)，表示一个只包含一个值 x 的类型

如 Value("ok") 是一个单值类型，符合该类型的值只有 "ok" 这一个

组合类型构造器
--------------

一个组合类型构造器是一个函数，它接受一些类型作为参数，返回一个类型

### Optional

可选类型构造器，接受一个类型，返回一个可选类型

用法：Optional(a)，表示该值可以为a类型的值或空值（null或undefined）

如 Optional(Int)，其值有 null, 0, 1, 2 ..., -1, -2 ...

### Promise

Promise类型构造器，接受一个类型，返回一个Promise类型

用法：Promise(a)，表示一个异步结果，当结果成功返回时，将得到一个a类型的值

如 Promise(Int)，将在成功时返回一个Int值

### []

数组类型构造器，接受一个类型，返回一个数组类型

用法：[a]，表示一个数组，其中的元素的值为a类型

### Tree

树类型构造器，接受一个类型，返回一个树类型

用法：Tree(a)，表示一颗树，其中每个节点的rootLabel字段均为a类型的值

如 Tree(Int)，其值有 {rootLabel: 1, subForest: []}, {rootLabel: 2, subForest: [{rootLabel: 3, subForest: []}, {rootLabel: 4, subForest: []}]} ...

其中，rootLabel表达该节点上附着的值，而subForest表达该节点的所有孩子节点

因此 Tree 也可以递归定义为: Tree a = {rootLabel: a, subForest: [Tree a]}

### Map

映射类型构造器，接受两个类型，返回一个映射类型

用法：Map(a)(b)，表示一个从a到b的映射，该结构可以根据给定的a类型的值寻址到一个b类型的值

### TreeMap

树状映射类型构造器，接受两个类型，返回一个树状映射类型

用法：TreeMap(a)(b)，表示一个从a到b的树状映射，该结构可以根据给定的a类型的值的列表 寻址到一个b类型的值

### Fn

函数类型构造器，接受两个类型，返回一个函数类型

用法：Fn(a)(b)，表示一个从a到b的函数，该函数输入一个a类型的值，返回一个b类型的值

### Strict

严格对象类型构造器，接受一个对象，其中各个键对应的值均为类型，返回一个严格对象类型

如: Strict({x: Int, y: String})，表示一个有两个字段的对象类型，其中x字段为Int类型，y字段为String类型

### Loose

宽松对象类型构造器，接受一个对象，其中各个键对应的值均为类型，返回一个宽松对象类型

如: Loose({x: Int, y: String})，表示一个有两个或更多字段的对象类型，其中x字段为Int类型，y字段为String类型，并且还允许有额外的字段，且对额外字段的类型不作要求

### OneOf

选择类型构造器，接受一个列表，其中的值均为类型，返回一个选择类型

如：OneOf([Int, String])，表示一个有两种可能取值的选择类型，其值要么形如 123，要么形如 "abc"

该选择类型必须通过候选项的Shape判断确定的分支。若某个值能匹配多个Shape，则会判断为有岐义。如 match(OneOf(Int, Nat))(42) 返回 false，因为42能同时匹配两个Shape，有岐义。

### Choose

选择类型构造器，接受一个列表，其中的值均为类型，返回一个选择类型

如：Choose([Int, String])，表示一个有两种可能取值的选择类型，其值要么形如 123，要么形如 "abc"

该选择类型将匹配能匹配的第一个候选项。如 match(OneOf(Int, Nat))(42) 返回 true，因为42能匹配Int。

具名类型构造器
--------------

具名类型构造器只有一个，它接受若干元信息，返回一个具名类型

### NamedType

用法：NamedType({name: "UserId", spec: Nat, desc: "用户唯一标识", samples: [200, 201, 202]})，表示一个具名类型，其名称为 UserId，类型描述为 Nat，说明信息为 "用户唯一标识"，样例为 200, 201, 202 等

其中，name 和 spec 参数为必需参数


[English](README.en.md) | [日本語](README.md) | [简体中文](README.zh_hans.md) |

＃创建“ Omesys 主页”！

https://omegasisters.github.io/homepage

如果仅用 Pulllik 更新第一个 Omeshisu 的主页会怎样？规划中

我在等普利克！ ！ ！ ！

##对于那些不知道这是什么的人

###您当前的 Omesys 主页是什么样的？

单击[此处]（https://omegasisters.github.io/homepage）以查看Omesys主页的状态

###我想这样做，哦。但是我不懂程序

在上方菜单的[问题]（https://github.com/omegasisters/homepage/issues）中，您可以编写要执行的操作，要更改的内容以及要修复的内容（因为有些奇怪）。

这就像一个典型的线程公告板。
如果您写一些东西，它可能会实现。可能不是。

要创建一个新帐户，请[创建 GitHub 帐户]（https://github.com/join?source_repo=omegasisters%2Fhomepage）和[创建问题]（https://github.com/omegasisters/homepage/问题/新）。

＃技巧

##本地预览

如果要完整预览，包括 VRM 模型，请尝试以下操作：
您可以在 GitHub Pages 上发布它时对其进行开发。
如果连接到相同的本地网络，则可以使用主机的[IP 地址]：[端口号]（例如：http：//192.168.1.2：8000）从其他终端进行检查。

**移动说明**
请参阅[文档/环境](documents/environment)。

##代码格式（需要 Node.js 环境）

```
For yarn format # yarn
npm run format # For npm
```

##如何开发常规部分（Node.js）

预览时，输入以下命令之一：

```
yarn start # for yarn
npm run start # npm
```

托管在 http://localhost:8080

编辑源代码时，请在 git push 之前进行构建：

```
For yarn build # yarn
npm run build # For npm
```

##测试（Node.js）

您可以使用以下命令进行测试。

```
For yarn test # yarn
npm run test # For npm
```

`__tests__`和`preact`具有示例测试用例。

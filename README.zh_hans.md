[English](README.en.md) | [日本語](README.md) | [简体中文](README.zh_hans.md) |

# 一起来建 “Omesys 主页”！

[![](https://github.com/omegasisters/homepage/workflows/test/badge.svg)](https://github.com/omegasisters/homepage/actions)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/omegasisters/homepage.svg)](http://isitmaintained.com/project/omegasisters/homepage 'Percentage of issues still open')

第一回“只用 Pull Request 来更新欧米茄姐妹(Omesys)的主页会怎样？”企划

期待您的 Pull Request！ ！ ！ ！

https://omegasisters.github.io/homepage

[![](assets/images/ogp.png)](https://omegasisters.github.io/homepage)

## 现在欧米茄姐妹的主页是什么样的？

该站点是由 Omega Sisters 设计的站点，名为“如果仅通过 PR 更新 Ome-sis 主页会发生什么？”。

任何人都可以参加。 👏

> おめシスのホームページを Github のプルリクで更新していったらどうなるのか、こっそり検証中です。そのうち動画にします！ https://t.co/rErhv32NNR
>
> &mdash; おめがレイ@バーチャル双子 YouTuber ([@omesis_ray](https://twitter.com/omesis_ray)) [December 23, 2019](https://twitter.com/omesis_ray/status/1209057136992387072?ref_src=twsrc%5Etfw)

## 不知道这是什么的人请看这里

### 我想把这里改成这样或那样，但是我不懂编程

在上方菜单的 [Issues](https://github.com/omegasisters/homepage/issues) 中，您可以写下接下来自己要做的事情，或者想要更改的内容，以及希望得到修正的奇怪地方。

这就像一个普通的论坛留言板。您在里面的留言有可能会实现。

要创建新 Issue，请先 [创建 GitHub 帐户](https://github.com/join?source_repo=omegasisters%2Fhomepage) 再 [创建 Issue](https://github.com/omegasisters/homepage/issues/new)。

## 该项目的结果出来了！

PR acceptance has been closed
At the end of the project, Omega Sisters has posted a video of the verification result below
Thank you🎉🎉🎉

[【検証】１ヶ月間、プルリクだけでホームページ作ったらどうなるの？](https://youtu.be/5h1NoX3my0s)

※【Verification】 What happens if you make a homepage only with Pull Request for one month?

# 提示

## 本地预览

如果要预览包括 VRM 模型在内的完整页面，请尝试以下操作：
您可以基于 GitHub Pages 上发布的原始页面进行开发。
在同一本地网络，你可以从其他终端访问主机的 [IP 地址]：[端口号]（例如：http://192.168.1.2:8000 ）进行浏览。

**文档路径变更**
请参阅 [documents/environment](documents/environment)。

## 代码格式（需要 Node.js 环境）

```
For yarn format # yarn
npm run format # For npm
```

## 如何开发常规部分（Node.js）

预览时，输入以下任一命令：

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

## 测试（Node.js）

您可以使用以下命令进行测试。

```
For yarn test # yarn
npm run test # For npm
```

`__tests__`和`preact`有测试用例。

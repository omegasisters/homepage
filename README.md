[English](README.en.md) | [日本語](README.md) | [简体中文](README.zh_hans.md) |

# みんなでつくろう「おめシスホームページ」！

みんなで作るおめがシスターズのホームページです

![](assets/images/ogp.png)

## このサイトは何のためにありますか？

本サイトは、「第１回おめシスのホームページをプルリクだけで更新していったらどうなるの？」という、おめがシスターズの企画用サイトです

ユーザー参加型の企画なので、誰でも参加することができます 👏

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">おめシスのホームページをGithubのプルリクで更新していったらどうなるのか、こっそり検証中です。そのうち動画にします！<a href="https://t.co/rErhv32NNR">https://t.co/rErhv32NNR</a></p>&mdash; おめがレイ@バーチャル双子YouTuber (@omesis_ray) <a href="https://twitter.com/omesis_ray/status/1209057136992387072?ref_src=twsrc%5Etfw">December 23, 2019</a></blockquote>

## この企画に参加するにはどうすればいいですか？

大きくわけて 3 つの方法があります

- [issue(要望・不具合)](https://github.com/omegasisters/homepage/issues) を立てる・コメントする
- [PR](https://github.com/omegasisters/homepage/pulls) を投げる・レビューする
- Twitter で共有 🎉
- その他、みんなで盛り上げていきましょう 👍

## 開発のやり方

### GitHub アカウント

GitHub のアカウントは持っていますか？

なければ[ここ](https://github.com/)で作成することができます。

yarn, npm の場合それぞれ書いています

### yarn の導入方法

※OS 別、公式ドキュメントへのリンク

- [mac OS](https://yarnpkg.com/lang/ja/docs/install/#mac-stable)
- [Windows](https://yarnpkg.com/lang/ja/docs/install/#windows-stable)
- [Linux(Ubuntu/Debian)](https://yarnpkg.com/lang/ja/docs/install/#debian-stable)

### ローカルプレビュー (Node.js)

コマンドを実行すると、 http://localhost:8080 にホストされます

#### yarn

```
yarn start
```

#### npm

```
npm run start
```

### コード整形(Node.js 環境必須)

#### yarn

```
yarn format
```

#### npm

```
npm run format
```

### Push する前にすること

ソースコードを編集した後、Push する前にビルドを行ってください

#### yarn

```
yarn build
```

#### npm

```
npm run build
```

### テストコードを実行する (Node.js)

#### yarn

```
yarn test
```

#### npm

```
npm run test
```

#### Sample Test Case

`__tests__`, `preact` にサンプルテストケースがあります

### 使用されている技術にはどんなものがありますか？

[こちら](./documents/environment/README.md)を確認してください

[English](README.en.md) | [日本語](README.md) | [简体中文](README.zh_hans.md) |

# みんなでつくろう「おめシスホームページ」！

https://omegasisters.github.io/homepage

第１回おめシスのホームページをプルリクだけで更新していったらどうなるの？企画

プルリク待ってます！！！！

## ここが何かよく分からない人向け

### 今のおめシスホームページはどんな感じ？

[ここ](https://omegasisters.github.io/homepage) をクリックすると、今のおめシスホームページの状態を見に行けます

### ここをこうしたい、ああしたい。けどプログラムはよく分からない

[上部メニューの**Issues**](https://github.com/omegasisters/homepage/issues) では、これからやりたい事、変えてほしい事、（何か変なので）なおしてほしい事が書けます。

一般的なスレッド式掲示板のような場所です。
何か書いておくと、実装されるかもしれません。されないかもしれません。

新しく作成するには、[GitHub アカウントを作成](https://github.com/join?source_repo=omegasisters%2Fhomepage) して、[Issue を作成](https://github.com/omegasisters/homepage/issues/new) してください。

# Tips

## ローカルプレビュー

VRM モデルも含めて完全な状態でプレビューしたい場合は以下の方法を試してください。
GitHub Pages で公開された時と同じ状態で開発することが出来ます。
同じローカルネットワークに接続されていればホストの[IP アドレス]:[ポート番号](例: http://192.168.1.2:8000 )で他の端末からも確認できます。

**記述を移動しました**
[documents/environment](documents/environment)をご覧ください。

## コード整形(Node.js 環境必須)

```
yarn format # yarn の場合
npm run format # npm の場合
```

## preact 部分の開発方法 (Node.js)

プレビューする際には以下のコマンドのどちらかを入力してください:

```
yarn start # yarn の場合
npm run start # npm の場合
```

http://localhost:8080 にホストされます。

ソースコードを編集する際には、git push する前にビルドを行ってください:

```
yarn build # yarn の場合
npm run build # npm の場合
```

## テストする (Node.js)

以下のコマンドでテストができます。

```
yarn test # yarn の場合
npm run test # npm の場合
```

`__tests__`, `preact` にサンプルテストケースがあります。

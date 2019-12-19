# みんなでつくろう「おめシスホームページ」！

https://omegasisters.github.io/homepage

第１回おめシスのホームページをプルリクだけで更新していったらどうなるの？企画

プルリク待ってます！！！！

## Tips: ローカルプレビュー

VRM モデルも含めて完全な状態でプレビューしたい場合は以下の方法を試してください。

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
python3 -m http.server -d ..
```

エラーが出る場合は、以下を試してみてください。

```
git clone https://github.com/omegasisters/homepage.git
python3 -m http.server
```

サーバーが起動したら、次にブラウザーで http://localhost:8000/homepage/ を開いてください。これで GitHub Pages で公開された時と同じ状態で開発することが出来ます。

## Tips: ローカルプレビュー(Docker 編)

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
docker build ./ -t omegasisters-homepage
docker run -p 5000:5000 omegasisters-homepage
```

サーバーが起動したら、次にブラウザーで http://localhost:5000/ を開いてください。

## Tips: ローカルプレビュー(Node.js 編)

[こちら](https://nodejs.org/ja/download/)から Node.js をインストールします。
[yarn](https://yarnpkg.com/) を使用する場合はそちらもインストールしてください。

```
git clone https://github.com/omegasisters/homepage.git
cd homepage

# 次のいずれかを実行
yarn && yarn start # yarn の場合
npm install && npm run start # npm の場合
```

サーバーが起動したら、次にブラウザーで http://localhost:5000/ を開いてください。

次のコマンドで Browser Sync サーバーを立ち上げることも出来ます。

```
yarn dev # yarn の場合
npm run dev # npm の場合
```

## Tips: ローカルプレビュー(PHP 編)

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
php -S 0.0.0.0:8000 -t ../
```

サーバーが起動したら、次にブラウザーで http://0.0.0.0:8000/homepage を開いてください。
同じローカルネットワークであればホストの IP アドレス:8000（例: http://192.168.1.2:8000）でスマホからも確認できます。
サーバーは ctrl+c で停止できます。

## Tips: ローカルプレビュー(Elixir 編)

```
git clone https://github.com/omegasisters/homepage.git
elixir --no-halt --app inets -e ":inets.start(:httpd,[{:server_name,'localhost'},{:document_root,'.'},{:server_root,'.'},{:port,8000},{:mime_types,[{'html','text/html'},{'css','text/css'}]}])"
```

サーバーが起動したら、次にブラウザーで http://localhost:8000/homepage/ を開いてください。

## Tips: ローカルプレビュー(.NET Core 編)

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
dotnet run --project ./dotnet/
```

サーバーが起動したら、次にブラウザーで http://localhost:8000/homepage/ を開いてください。

## Tips: コード整形(Node.js 環境必須)

```
yarn format # yarn の場合
npm run format # npm の場合
```

## Tips: preact 部分の開発方法 (Node.js)

プレビューする際には以下のコマンドのどちらかを入力してください:

```
yarn start # yarn の場合
npm run start # npm の場合
```

http://localhost:5000 にホストされます。

ソースコードを編集する際には、git push する前にビルドを行ってください:

```
yarn build # yarn の場合
npm run build # npm の場合
```

## Tips: テストする (Node.js)

以下のコマンドでテストができます。

```
yarn test # yarn の場合
npm run test # npm の場合
```

`__tests__`, `preact` にサンプルテストケースがあります。

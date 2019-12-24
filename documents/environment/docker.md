### Docker 編

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
docker build ./ -t omegasisters-homepage
docker run -p 5000:5000 omegasisters-homepage
```

サーバーが起動したら、次にブラウザーで http://localhost:5000/ を開いてください。

### docker-compose 編

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
docker-compose up
```

サーバーが起動したら、次にブラウザーで http://localhost:5000/ を開いてください。

```
docker-compose down
```

で終了します。

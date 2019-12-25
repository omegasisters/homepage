### Python 編

まず、Python3 のバージョンを確認します。

```
~$ python3 -V
Python 3.7.6
~$
```

#### Python 3.7 系以降

```
git clone https://github.com/omegasisters/homepage.git
cd homepage
python3 -m http.server -d ..
```

サーバーが起動したら、次にブラウザーで http://localhost:8000/homepage/ を開いてください。

#### Python 3.6 系以前

例えば、Win10 + WSL の場合の標準は v3.5.2 (アップデート推奨) なので、こちらです
。

```
git clone https://github.com/omegasisters/homepage.git
python3 -m http.server
```

サーバーが起動したら、次にブラウザーで http://localhost:8000/homepage/ を開いてください。

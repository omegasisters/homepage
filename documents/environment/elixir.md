### Elixir 編

```
git clone https://github.com/omegasisters/homepage.git
elixir --no-halt --app inets -e ":inets.start(:httpd,[{:server_name,'localhost'},{:document_root,'.'},{:server_root,'.'},{:port,8000},{:mime_types,[{'html','text/html'},{'css','text/css'}]}])"
```

サーバーが起動したら、次にブラウザーで http://localhost:8000/homepage/ を開いてください。

# mcp_server
todoApi_JS 用の mcp サーバーです。
https://github.com/yuuki-aoyomi/todoApi_JS

# 使用方法
このリポジトリを clone 後
```
cd mcp_server
npm install
```

Claude Desktop の設定から  
開発者へ行き、設定を編集をクリック。  
claude_desktop_config.json を編集

```
"mcpServers": {
    "todo-mcp": {
        "command": "node",
        "args": [
        "mcp_server/server.jsへのフルパス"
        ]
    }
}
```
となるように追加することで、 Claude Desktop で todoApi_JS への一覧表示要求などが可能になります。

# 機能
AI が、 todoApi_JS に登録された todo の一覧表示、追加、削除、完了状態の更新を行うことができるようになります。
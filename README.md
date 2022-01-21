## 简介

ticode 是一个简单的 vscode 插件，通过 vscode 和 tick tick(滴答清单) 的提供的 url scheme，实现两者的简单交互，例如

-   在 vscode 中往 tick tick 中添加任务
-   在 tick tick 中跳转到 vscode

## 功能

ticode 目前包含的命令及说明如下表所示

| 命令                                          | 说明                                                                                     |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `add current page to ticktick`                | 跳转到 tick tick，并为当前页面在 tick tick 中创建一个任务，点击该任务标题可跳转回 vscode |
| `generate vscode url scheme for current file` | 为当前页面生成 url scheme，并写入剪切板，点击该 url 可返回当前文件                       |

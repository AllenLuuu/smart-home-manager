# 简介

这是浙江大学《B/S体系软件设计》课程的大作作业，目标为实现一个智能家居管理系统。

前端框架：React；后端框架：Nest.js

# 安装

在根目录、./frontend、./backend 目录分别运行 `npm i` 命令即可。

# 运行

## 数据库连接

*需要有 MongoDB 环境*

首先在 MongoDB 中创建一个数据库，得到一个有读写权限的uri。

在 ./backend/src 目录下创建 dbconfig.ts 文件，写入以下内容：

```ts
export default {
  uri: /** 刚刚得到的uri **/,
};
```

即可。

## 前端打包

进入 ./frontend 目录，运行 `npm run build` 命令，生成 dist 文件夹即可。

## 启动服务器

进入 ./backend 目录，运行 `npm run start` 命令，当看到控制台输出 "Nest application successfully started" 时，访问 localhost:3001 即可。

# 注意事项

本项目仅关注手机版使用体验，使用电脑浏览时打开浏览器控制台，打开手机模拟选项可获得最佳体验。

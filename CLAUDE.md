# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

AI驱动的工单管理系统 (Helpdesk)。客服接收邮件工单，AI自动分类、生成摘要和回复建议。

## 开发命令

```bash
# 启动所有服务 (server + client)
bun run dev

# 仅启动后端
bun run server:dev

# 仅启动前端
bun run client:dev

# 构建
bun run build

# 数据库 (server目录)
bun run db:generate   # 生成Prisma Client
bun run db:push       # 推送schema到数据库
bun run db:migrate    # 运行迁移
bun run db:seed       # 种子数据
```

## 技术架构

```
helpdesk/
├── client/           # React前端 (Vite + Tailwind CSS v4)
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css    # Tailwind CSS v4: @import 'tailwindcss'
└── server/           # Bun + Express后端
    └── src/
        ├── index.ts     # Express入口
        └── lib/env.ts   # 环境变量验证
```

**后端端口**: 3000 | **前端端口**: 5173 (或自动选择)

## 依赖库文档

遇到使用依赖库的情况，如果不清楚最新用法，**优先使用 Context7 获取最新文档**，再进行代码编写。

## 数据库

使用 Prisma ORM，Schema 设计在 `server/prisma/schema.prisma`。认证采用**数据库会话** (express-session + connect-pg-simple)，Session 存储在 PostgreSQL 中。

## 当前进度

Phase 0.1 已完成 (项目初始化)，正在继续 Phase 0.2 数据库设置。

## 前端注意

- Tailwind CSS v4: CSS中使用 `@import 'tailwindcss'` (非 `@import "tailwindcss"`)
- 不使用 postcss/autoprefixer，由 `@tailwindcss/vite` 插件处理
- 不使用 @tanstack/react-query，用原生 fetch + useState/useEffect

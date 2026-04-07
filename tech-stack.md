# 技术栈方案

## 概述

AI驱动的工单管理系统，采用 Bun + Express + TypeScript 后端，前端分离架构。

## 技术选型

### 后端

| 类别     | 技术                 | 版本   | 说明                      |
| -------- | -------------------- | ------ | ------------------------- |
| 运行时   | Bun                  | latest | 高性能JavaScript运行时    |
| 框架     | Express + TypeScript | 5.1.0  | 轻量、成熟、类型安全      |
| ORM      | Prisma               | 7.5.0  | 类型安全的数据库访问      |
| 数据库   | PostgreSQL           | latest | 关系型数据库              |
| 会话存储 | connect-pg-simple    | latest | PostgreSQL存储Express会话 |
| AI       | Claude API           | latest | 工单分类、摘要、回复生成  |

### 前端

| 类别     | 技术                  | 版本    | 说明               |
| -------- | --------------------- | ------- | ------------------ |
| 框架     | React + TypeScript    | 19.2.0  | 组件化开发         |
| 样式     | Tailwind CSS          | 3.4.x   | 实用优先CSS        |
| 组件库   | shadcn/ui             | latest  | 高质量可定制组件   |
| 状态管理 | React Query           | 5.90.3  | 数据获取与缓存     |
| 状态管理 | Zustand               | 5.0.12  | 轻量状态管理       |
| 路由     | React Router          | 7.9.4   | SPA路由            |
| 图标     | Lucide React          | 0.547.0 | 开源图标库         |

### 邮件集成

| 类别     | 技术       | 版本   | 说明             |
| -------- | ---------- | ------ | ---------------- |
| SMTP发送 | Nodemailer | 7.x    | 邮件发送         |
| IMAP接收 | IMAP       | latest | 接收邮件生成工单 |

### 认证

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 会话 | express-session | 1.18.x | 会话中间件 |
| 存储 | connect-pg-simple | 9.x | PostgreSQL会话存储 |

## 项目结构

```
/
├── client/                    # React前端
│   ├── src/
│   │   ├── components/       # UI组件
│   │   ├── pages/            # 页面
│   │   ├── hooks/            # 自定义Hooks
│   │   ├── api/              # API调用
│   │   └── lib/              # 工具函数
│   └── package.json
│
├── server/                   # Bun + Express后端
│   ├── src/
│   │   ├── routes/           # 路由
│   │   ├── controllers/      # 控制器
│   │   ├── services/         # 业务逻辑
│   │   ├── middleware/       # 中间件
│   │   ├── lib/              # 工具函数
│   │   └── index.ts          # 入口文件
│   ├── prisma/
│   │   └── schema.prisma     # 数据库模型
│   └── package.json
│
└── package.json              # 根目录workspace配置
```

## 核心依赖

### Server (Bun)

```json
{
  "express": "^5.1.0",
  "express-session": "^1.18",
  "connect-pg-simple": "^9",
  "prisma": "^7.5.0",
  "@prisma/client": "^7.5.0",
  "typescript": "^5.9.3"
}
```

### Client

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router": "^7.9.4",
  "@tanstack/react-query": "^5.90.3",
  "zustand": "^5.0.12",
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.547.0",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-select": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest"
}
```

### Mail

```json
{
  "nodemailer": "^7"
}
```

## 数据库模型

### User

- id, email, password, name, role (Admin/Agent)

### Ticket

- id, subject, body, status (Open/Resolved/Closed), category, summary, createdAt, updatedAt

### Session

- 由 connect-pg-simple 自动管理

## 认证方案

采用 **数据库会话（Database Sessions）** 方案：

1. 用户登录成功后，Express session 存储在 PostgreSQL 中
2. Session ID 通过 Cookie 发送给客户端
3. 后续请求携带 Cookie，后端验证 Session 有效性
4. 比 JWT 更适合服务端渲染场景，支持即时注销

## 安装命令

```bash
# 安装 Bun
curl -fsSL https://bun.sh/install | bash

# Server 依赖
cd server
bun add express@5.1.0 express-session@1.18 connect-pg-simple@9 prisma@7.5.0 @prisma/client@7.5.0
bun add -D typescript@5.9.3 @types/express @types/express-session

# Client 依赖
cd client
bun add react@19.2.0 react-dom@19.2.0 react-router@7.9.4 @tanstack/react-query@5.90.3 zustand@5.0.12
bun add -D tailwindcss@3.4.0 lucide-react@0.547.0
```

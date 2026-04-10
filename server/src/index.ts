import { toNodeHandler } from 'better-auth/node'
import cors from 'cors'
import express from 'express'
import { auth } from './lib/auth'
import { validateEnv } from './lib/env'
import { requireAuth } from './middleware/require-auth'

const app = express()
const PORT = process.env.PORT || 3000

// CORS（允许前端 5173 端口访问）
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.all('/api/auth/*splat', toNodeHandler(auth))
app.use(express.json())
app.get('/api', (_req, res) => {
  res.json({ message: 'Helpdesk API v1.0.0' })
})
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// 示例：受保护的路由
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

// Start server
validateEnv()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app

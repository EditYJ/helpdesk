import cors from 'cors'
import express from 'express'
import { validateEnv } from './lib/env'
import { prisma } from './lib/prisma'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.get('/api', (_req, res) => {
  res.json({ message: 'Helpdesk API v1.0.0' })
})

// Database test route
app.get('/api/db-test', async (_req, res) => {
  try {
    await prisma.$connect
    res.json({ status: 'ok', message: 'Database connected successfully!' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' })
  }
})

// Start server
validateEnv()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app

import express, { Application } from 'express'
import cors from 'cors'
import compression from 'compression'
import fs from 'fs'
import path from 'path'
import 'express-async-errors'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { httpLogger } from './middleware/logger'
import { systemRouter } from './modules/system'
// ============================================
// Add your domain module imports here
// ============================================
// Example: Product Module
// import { productRouter } from './modules/product.js'
import { siteRouter } from './modules/site.js'
import { adminRouter } from './modules/admin.js'

export const createApp = (): Application => {
  const app = express()

  // HTTP request logging
  app.use(httpLogger)

  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN,
      credentials: env.CORS_ORIGIN !== '*',
    })
  )

  // Body parsing and compression
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(compression())

  // API routes - System & Health
  app.use(env.API_PREFIX, systemRouter)

  // ============================================
  // Add your domain module routes here
  // ============================================
  // Example: Product Module
  // app.use(`${env.API_PREFIX}/products`, productRouter)
  app.use(`${env.API_PREFIX}`, siteRouter)
  app.use(`${env.API_PREFIX}/admin`, adminRouter)

  // 单端口部署：若前端已构建，由后端统一托管静态资源（SPA 回退到 index.html）
  const frontendDist = path.resolve(process.cwd(), '..', 'frontend', 'dist')
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist))
    app.get('*', (_req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'))
    })
  }

  // Error handling
  app.use(errorHandler)

  return app
}

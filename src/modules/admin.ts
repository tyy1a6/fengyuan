import { Router, Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import { z } from 'zod'
import {
  getSiteConfig,
  saveSiteConfig,
  getDocuments,
  upsertDocument,
  deleteDocument,
  getArticles,
  upsertArticle,
  deleteArticle,
  type SiteConfig,
  type DocumentItem,
  type ArticleItem,
} from '../data/site.js'

export const adminRouter: Router = Router()

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'fengyuan@2026'

// 服务端会话令牌（内存态，重启失效）
const sessions = new Map<string, number>()

function issueToken(): string {
  const token = crypto.randomBytes(24).toString('hex')
  sessions.set(token, Date.now() + 1000 * 60 * 60 * 8) // 8 小时有效
  return token
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-admin-token')
  if (!token || !sessions.has(token) || (sessions.get(token) ?? 0) < Date.now()) {
    res.status(401).json({ message: '未登录或登录已过期' })
    return
  }
  next()
}

/** POST /api/admin/login — 密码登录，返回会话令牌 */
adminRouter.post('/login', async (req: Request, res: Response) => {
  const password = (req.body as { password?: string })?.password
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: '密码错误' })
    return
  }
  res.json({ token: issueToken() })
})

/** GET /api/admin/site — 当前站点配置 */
adminRouter.get('/site', requireAdmin, async (_req: Request, res: Response) => {
  res.json(getSiteConfig())
})

/** PUT /api/admin/site — 全量保存站点配置 */
const siteSchema = z.object({
  village: z.object({
    name: z.string(),
    shortName: z.string(),
    slogan: z.string(),
    location: z.string(),
    established: z.string(),
    introduction: z.string(),
  }),
  project: z.object({
    name: z.string(),
    level: z.string(),
    keywords: z.array(z.string()),
  }),
  stats: z.array(z.object({ label: z.string(), value: z.string(), unit: z.string().optional() })),
  vr: z.object({ title: z.string(), url: z.string(), description: z.string() }),
  officialAccount: z.object({
    name: z.string(),
    id: z.string(),
    description: z.string(),
    qrImageUrl: z.string(),
    miniProgramAppId: z.string().optional(),
    miniProgramPath: z.string().optional(),
    link: z.string().optional(),
  }),
  videos: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      duration: z.string(),
      date: z.string(),
      link: z.string(),
      cover: z.string(),
    })
  ),
  arExperiences: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      icon: z.string(),
      link: z.string(),
      tag: z.string(),
    })
  ),
  logos: z.object({
    seal: z.string(),
    partners: z.array(
      z.object({ id: z.string(), name: z.string(), image: z.string(), url: z.string().optional() })
    ),
  }),
  contact: z.object({ address: z.string(), phone: z.string(), email: z.string() }),
  videoAccount: z.object({ name: z.string(), link: z.string() }),
  culture: z.array(z.object({ title: z.string(), desc: z.string() })),
})

adminRouter.put('/site', requireAdmin, async (req: Request, res: Response) => {
  const parsed = siteSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: '参数校验失败', errors: parsed.error.flatten() })
    return
  }
  saveSiteConfig(parsed.data as SiteConfig)
  res.json(parsed.data)
})

/** GET /api/admin/documents — 文档管理列表 */
adminRouter.get('/documents', requireAdmin, async (_req: Request, res: Response) => {
  const items = getDocuments()
  const categories = Array.from(new Set(items.map((d) => d.category)))
  res.json({ items, categories, total: items.length })
})

/** POST /api/admin/documents — 新增或更新文档 */
const docSchema = z
  .object({
    slug: z.string().min(2).max(80),
    title: z.string().min(1).max(120),
    category: z.string().min(1).max(40),
    summary: z.string().max(300).default(''),
    content: z.string().default(''),
    updatedAt: z.string().optional(),
    author: z.string().max(60).default('凤院村'),
    fileType: z.string().max(20).default('PDF'),
    size: z.string().max(20).optional(),
  })
  .transform((d) => ({
    ...d,
    updatedAt: d.updatedAt || new Date().toISOString().slice(0, 10),
  }))

adminRouter.post('/documents', requireAdmin, async (req: Request, res: Response) => {
  const parsed = docSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: '参数校验失败', errors: parsed.error.flatten() })
    return
  }
  upsertDocument(parsed.data as DocumentItem)
  res.status(201).json(parsed.data)
})

adminRouter.put('/documents/:slug', requireAdmin, async (req: Request, res: Response) => {
  const parsed = docSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: '参数校验失败', errors: parsed.error.flatten() })
    return
  }
  if (parsed.data.slug !== req.params.slug) {
    res.status(400).json({ message: 'slug 与路径不一致' })
    return
  }
  upsertDocument(parsed.data as DocumentItem)
  res.json(parsed.data)
})

/** DELETE /api/admin/documents/:slug — 删除文档 */
adminRouter.delete('/documents/:slug', requireAdmin, async (req: Request, res: Response) => {
  const ok = deleteDocument(String(req.params.slug))
  if (!ok) {
    res.status(404).json({ message: '文档不存在' })
    return
  }
  res.json({ ok: true })
})

/** GET /api/admin/articles — 文稿管理列表 */
adminRouter.get('/articles', requireAdmin, async (_req: Request, res: Response) => {
  const items = getArticles()
  const categories = Array.from(new Set(items.map((a) => a.category)))
  res.json({ items, categories, total: items.length })
})

/** POST /api/admin/articles — 新增或更新文稿 */
const articleSchema = z.object({
  slug: z.string().min(2).max(80),
  title: z.string().min(1).max(120),
  category: z.string().min(1).max(40),
  summary: z.string().max(500).default(''),
  content: z.string().default(''),
  author: z.string().max(60).default('凤院村'),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isPublished: z.boolean().default(true),
  cover: z.string().max(300).optional(),
})

adminRouter.post('/articles', requireAdmin, async (req: Request, res: Response) => {
  const parsed = articleSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: '参数校验失败', errors: parsed.error.flatten() })
    return
  }
  const today = new Date().toISOString().slice(0, 10)
  const article: ArticleItem = {
    ...parsed.data,
    publishedAt: parsed.data.publishedAt || today,
    updatedAt: parsed.data.updatedAt || today,
  }
  upsertArticle(article)
  res.status(201).json(article)
})

adminRouter.put('/articles/:slug', requireAdmin, async (req: Request, res: Response) => {
  const parsed = articleSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: '参数校验失败', errors: parsed.error.flatten() })
    return
  }
  if (parsed.data.slug !== req.params.slug) {
    res.status(400).json({ message: 'slug 与路径不一致' })
    return
  }
  const today = new Date().toISOString().slice(0, 10)
  const article: ArticleItem = {
    ...parsed.data,
    publishedAt: parsed.data.publishedAt || today,
    updatedAt: today,
  }
  upsertArticle(article)
  res.json(article)
})

/** DELETE /api/admin/articles/:slug — 删除文稿 */
adminRouter.delete('/articles/:slug', requireAdmin, async (req: Request, res: Response) => {
  const ok = deleteArticle(String(req.params.slug))
  if (!ok) {
    res.status(404).json({ message: '文稿不存在' })
    return
  }
  res.json({ ok: true })
})

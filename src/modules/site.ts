import { Router, Request, Response } from 'express'
import { z } from 'zod'
import {
  getSiteConfig,
  getDocuments,
  upsertDocument,
  getArticles,
  type DocumentItem,
} from '../data/site.js'

export const siteRouter: Router = Router()

/**
 * GET /api/site
 * 返回门户所需的全部配置（村情、链接、媒体、AR、亮点）。
 */
siteRouter.get('/site', async (_req: Request, res: Response) => {
  res.json({
    ...getSiteConfig(),
    updatedAt: new Date().toISOString(),
  })
})

/**
 * GET /api/documents
 * 文档列表，支持 ?category= 过滤。
 */
siteRouter.get('/documents', async (req: Request, res: Response) => {
  const { category } = req.query
  let list = getDocuments()
  if (typeof category === 'string' && category.trim()) {
    list = list.filter((d) => d.category === category)
  }
  const categories = Array.from(new Set(getDocuments().map((d) => d.category)))
  res.json({
    items: list,
    categories,
    total: list.length,
  })
})

/**
 * GET /api/documents/:slug
 * 单个文档详情。
 */
siteRouter.get('/documents/:slug', async (req: Request, res: Response) => {
  const doc = getDocuments().find((d) => d.slug === req.params.slug)
  if (!doc) {
    res.status(404).json({ message: '文档不存在' })
    return
  }
  res.json(doc)
})

/**
 * POST /api/documents
 * 新增文档（内容维护）。校验后写入并持久化。
 */
const createSchema = z.object({
  slug: z.string().min(2).max(80),
  title: z.string().min(1).max(120),
  category: z.string().min(1).max(40),
  summary: z.string().max(300).default(''),
  content: z.string().default(''),
  author: z.string().max(60).default('凤院村'),
  fileType: z.string().max(20).default('PDF'),
  size: z.string().max(20).optional(),
})

siteRouter.post('/documents', async (req: Request, res: Response) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ message: '参数校验失败', errors: parsed.error.flatten() })
    return
  }
  const data = parsed.data
  if (getDocuments().some((d) => d.slug === data.slug)) {
    res.status(409).json({ message: '该文档标识已存在' })
    return
  }
  const doc: DocumentItem = {
    ...data,
    updatedAt: new Date().toISOString().slice(0, 10),
  }
  upsertDocument(doc)
  res.status(201).json(doc)
})

/**
 * GET /api/articles
 * 文稿列表，支持 ?category= 过滤，仅返回已发布文稿。
 */
siteRouter.get('/articles', async (req: Request, res: Response) => {
  const { category } = req.query
  let list = getArticles().filter((a) => a.isPublished)
  if (typeof category === 'string' && category.trim()) {
    list = list.filter((a) => a.category === category)
  }
  const categories = Array.from(new Set(getArticles().map((a) => a.category)))
  res.json({
    items: list,
    categories,
    total: list.length,
  })
})

/**
 * GET /api/articles/:slug
 * 单篇文稿详情。
 */
siteRouter.get('/articles/:slug', async (req: Request, res: Response) => {
  const article = getArticles().find((a) => a.slug === req.params.slug && a.isPublished)
  if (!article) {
    res.status(404).json({ message: '文稿不存在' })
    return
  }
  res.json(article)
})

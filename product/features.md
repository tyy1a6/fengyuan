# 凤院村 · 百千万工程门户 - Product Requirements

---

## 1. Strategy (战略层) —— 骨子里是什么？

**用户诉求：** 村民、游客、上级考察与媒体。希望一站式了解村情、看全景、追新媒体、玩 AR、查政策文档。

**商业目标：** 以数字化门户支撑“百县千镇万村高质量发展工程”典型村日常宣传与治理，降低信息触达成本。

**核心定调：** 客家古韵、生态绿、中国红、丰收金。

---

## 2. Scope (范围层) —— 需要放什么料？

**必须要有：**
- 首页门户：村情速览、数据一览、四大数字入口、百千万成效。
- VR全景：内嵌 720yun 全景，支持新窗口/全屏打开。
- 新媒体：公众号改为「小程序入口」（微信扫小程序码进入小程序，不跳转浏览器）+ 视频号视频列表点击跳转。
- AR互动：多个 AR 体验卡片，点击跳转互动页面。
- 文档资料：政策/村规/服务文档分类浏览与详情查看。
- 内容管理后台：密码登录，可视化维护村情、新媒体、AR 与文档，保存即前台生效。
- 后端内容 API：站点配置与文档接口，便于日常维护。

---

## 3. Structure (结构层) —— 故事怎么讲？

**页面架构：** 单站多页（首页 + 五个功能页），顶部导航 + 底部信息。

**注意力流转：** Hero 建立印象 → 数据建立信任 → 入口引导分发 → 各页深读。

### Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| / | 首页 | 村情速览与四大数字入口 |
| /about | 村情概况 | 村史时间线、文化名片、百千万成效 |
| /vr | VR全景 | 720yun 全景内嵌与跳转 |
| /media | 新媒体 | 公众号小程序码 + 视频号列表 |
| /ar | AR互动 | AR 体验卡片跳转 |
| /documents | 文档资料 | 文档分类浏览与详情 |
| /admin | 内容管理后台 | 密码登录，可视化维护全站内容 |

### Data Model

#### DocumentItem
| Field | Type | Description |
|-------|------|-------------|
| slug | string | 文档唯一标识 |
| title | string | 标题 |
| category | string | 分类 |
| summary | string | 摘要 |
| content | string | 正文（轻量 Markdown） |
| updatedAt | string | 更新时间 |
| fileType | string | 文件类型 |

### API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/site | 站点配置（村情、链接、媒体、AR、亮点） |
| GET | /api/documents | 文档列表（支持 ?category） |
| GET | /api/documents/:slug | 文档详情 |
| POST | /api/documents | 新增文档（内容维护） |
| POST | /api/admin/login | 后台登录，返回会话令牌 |
| GET | /api/admin/site | 读取站点配置（需登录） |
| PUT | /api/admin/site | 全量保存站点配置（需登录） |
| GET | /api/admin/documents | 读取文档管理列表（需登录） |
| POST | /api/admin/documents | 新增/更新文档（需登录） |
| PUT | /api/admin/documents/:slug | 更新文档（需登录） |
| DELETE | /api/admin/documents/:slug | 删除文档（需登录） |

---

## 4. Skeleton (框架层) —— 骨架怎么搭？

**导航形态：** 顶部 sticky 导航 + 移动端抽屉菜单。

**页面布局：**
- 首页：Hero → 数据带 → 入口卡 → 成效网格 → 简介/新媒体。
- 功能页：统一页头 + 内容区块 + 卡片网格。

**标志性布局模式：** 宣纸米色背景 + 红绿金分隔纹样 + 衬线大标题。

### Component Inventory

| Component | Usage | Pages |
|-----------|-------|-------|
| Header / Footer | 导航与站点信息 | 全部 |
| SectionTitle | 区块标题 | 全部 |
| Card | 入口/成效/文档 | 首页、About、Documents |
| Dialog | 文档详情 | Documents |

---

## 5. Surface (表现层) —— 穿什么衣服？

**色彩主题：** 中国红（百千万/党建）+ 生态绿（乡村振兴）+ 丰收金（文化）+ 宣纸米色背景。

**字体排版：** Noto Serif SC 衬线标题 + Noto Sans SC 正文。

**标志性视觉细节：** 印章“凤”字徽标、红→金→绿渐变分隔线、卡片悬浮微交互。

**最终风格定调：** 端庄而有烟火气的数字化村落门户。

**Design System Query:** 百千万工程 村落门户 中国红 生态绿 丰收金 宣纸米色 衬线标题

---

## Technical Notes

- 前端：React 19 + Tailwind v4 + react-router v7 + TanStack Query + framer-motion。
- 后端：Express + 路由模块（/api/site、/api/documents、/api/admin），内容由后端数据层驱动并持久化到 src/data 下的 site.json / documents.json。
- 内容管理后台：/admin 路由，密码登录（默认见 .env.example 的 ADMIN_PASSWORD），会话令牌 8 小时有效；所有改动经后端持久化，前台实时生效。
- 外链（VR/公众号/视频号/AR）集中在后台站点配置，可随时可视化替换。

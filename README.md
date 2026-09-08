# 凤院村 · 百千万工程门户

从化凤院村「百千万工程」村级门户静态站点，包含 **村情概况、VR 全景、新媒体（视频号 / 公众号）、文化名片** 等板块。纯静态构建，可免费托管于 GitHub Pages / Vercel / Cloudflare Pages / Netlify，也由 Genie 发布环境直接上线。

线上地址：https://fengyuan-village.app.workbuddy.link/

## 技术栈

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4
- react-router-dom v7（HashRouter，适配任意静态托管子路径）
- framer-motion 动效、lucide-react 图标

> 站点内容已「烘焙」进前端（`src/data/siteData.ts`），构建时写死打包，**不依赖任何后端或数据库**。

## 目录结构

```
.
├── frontend/                # 前端站点（核心）
│   ├── src/
│   │   ├── data/siteData.ts # ★ 全部文案 / 视频 / 公众号 / VR / 文化名片 都在这
│   │   ├── pages/           # 首页 / 村情 / VR / 新媒体
│   │   ├── components/      # 公共组件（页头、页脚、UI）
│   │   └── ...
│   └── dist/                # 构建产物（已 gitignore，CI 自动生成）
├── backend/                 # 仅 Genie 发布环境用：静态文件服务（前端已不取数）
├── .github/workflows/       # GitHub Pages 自动部署
└── docs/                    # 设计稿 / 功能说明
```

## 修改内容

所有展示文案都集中在 `frontend/src/data/siteData.ts`，改对应字段后重新构建即可：

```bash
cd frontend
pnpm install
pnpm build      # 产物输出到 frontend/dist
```


## 本地预览

```bash
cd frontend
pnpm install
pnpm dev        # 默认 http://localhost:5173
```
"# -1" 

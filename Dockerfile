# syntax=docker/dockerfile:1

# ============================================================
# 阶段 1：构建前端（React + Vite -> 静态文件）
# 直接使用 Node 自带的 npm，避免额外下载 pnpm 带来的网络依赖
# ============================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ============================================================
# 阶段 2：运行镜像（Node + Express，单端口同时托管前后端与 API）
# ============================================================
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/app/backend/data

WORKDIR /app/backend

# 先装后端依赖（利用 Docker 层缓存）
COPY backend/package.json backend/package-lock.json* ./
RUN npm install

# 复制后端源码与配置
COPY backend/ ./

# 把构建好的前端静态文件放到 /app/frontend/dist（后端会托管它）
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# 内容数据持久化目录（部署时请挂载 volume，避免容器重建后后台编辑丢失）
RUN mkdir -p /app/backend/data

EXPOSE 3000
WORKDIR /app/backend
CMD ["./node_modules/.bin/tsx", "src/index.ts"]

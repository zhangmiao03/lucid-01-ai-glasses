# LUCID/01

<p align="center">
  <img src="public/lucid.svg" alt="LUCID/01 Logo" width="200">
</p>

<p align="center">
  <strong>Reality, gently annotated.</strong>
</p>

<p align="center">
  <a href="https://lucid-01-ai-glasses-dujyeh4m.edgeone.cool" target="_blank">Live Demo ↗</a>
</p>

---

## 📌 作品信息

| 字段 | 内容 |
|------|------|
| **作品名称** | LUCID/01 |
| **类型** | AI 硬件电商落地页 |
| **技术栈** | React + Vite + TypeScript + Tailwind CSS + EdgeOne Pages Edge Functions |
| **出品方** | zhangmiao03 |

---

## 📝 作品介绍

LUCID/01 是一款虚构的 AI 智能眼镜概念电商落地页，采用 React + Vite + TypeScript + Tailwind CSS 技术栈构建，部署于 EdgeOne Pages。

**设计理念**：
视觉风格追求通透、明亮的未来感美学，以深海蓝为基底（#06111f），搭配冰蓝色渐变、青色高光和银色点缀。不同于传统的暗黑赛博朋克风格，LUCID/01 呈现出一种高端时尚科技品牌应有的呼吸感与精致度。

**核心功能**：
- **动态沉浸式背景** — Canvas 实现的流动光晕、粒子、扫描线效果
- **AI HUD 演示** — 5 个生活场景（通勤、会议、旅行、运动、创作）的实时 AI 叠加层演示
- **产品配置器** — 4 种镜框颜色（月光银、石墨黑、冰钛金、沙丘金）实时切换
- **Reality Cards** — 可截图分享的诗意生活瞬间卡片
- **完整电商流程** — 购物车、结算、预约演示表单（含 localStorage 持久化）
- **隐私控制中心** — 可视化开关管理 AI 功能状态

**技术亮点**：
- Tailwind CSS v4 零配置集成
- EdgeOne Pages Edge Functions 实现访问统计和表单提交
- 玻璃拟态（Glassmorphism）设计系统
- Framer Motion 流畅动画

---

## 🚀 完整 Prompt

```
Build a premium single-page AI glasses ecommerce landing page using React + Vite + TypeScript + Tailwind CSS + shadcn/ui, and deploy it to EdgeOne Pages.

PROJECT NAME: LUCID/01
TAGLINE: Reality, gently annotated.

CORE VISUAL DIRECTION:
- luminous, airy blue-futuristic visual system
- deep navy base (#06111f), soft blue gradients, ice blue glow, cyan highlights
- transparent glass layers, soft light bloom
- NOT dark/black background, NOT cyberpunk neon

BACKGROUND SYSTEM:
Create BackgroundWallpaper.tsx with Canvas-based animated background:
- slow-moving blue gradient light
- soft glowing radial light fields
- subtle grid lines, floating digital numbers, soft particles
- 60% soft deep blue, 20% luminous blue light, 10% glass haze, 10% silver-white glow

PRODUCT DESIGN:
Rimmed AI glasses (slim frame, lightweight, wearable), 4 colors:
- Moon Silver, Graphite Black, Ice Titanium, Sand Gold

10 SECTIONS:
1. Fixed Navbar (scroll-triggered glass effect)
2. Hero ("Reality, gently annotated.", floating HUD labels, metrics)
3. See Through AI Demo (5 scenes: Commute/Meeting/Travel/Run/Create)
4. Product Selector (color picker)
5. Feature Highlights (4 glass cards)
6. Reality Cards (shareable screenshots)
7. Vision Pulse + Privacy Controls
8. Cart + Checkout (localStorage)
9. Demo Form
10. Closing CTA + Footer

EDGE FUNCTIONS:
- GET /api/health
- GET /api/vision-pulse (with KV storage LUCID_KV)
- POST /api/private-demo

TECH STACK:
React, Vite, TypeScript, Tailwind CSS v4, framer-motion, lucide-react, @fontsource fonts
```

---

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 部署到 EdgeOne Pages
npx edgeone pages deploy dist -n lucid-01-ai-glasses
```

---

## 📦 项目结构

```
.
├── edge-functions/api/          # EdgeOne Pages Edge Functions
│   ├── health.js               # GET /api/health
│   ├── vision-pulse.js         # GET /api/vision-pulse (KV 存储)
│   └── private-demo.js         # POST /api/private-demo
├── src/
│   ├── components/             # 14 个 React 组件
│   ├── data/                   # 内容数据
│   ├── lib/                    # 工具函数
│   ├── App.tsx
│   └── index.css               # Tailwind v4 + 玻璃拟态样式
├── dist/                       # 构建输出
└── index.html
```

---

## 🌐 部署地址

- **生产环境**: https://lucid-01-ai-glasses-dujyeh4m.edgeone.cool
- **EdgeOne 控制台**: https://console.cloud.tencent.com/edgeone/pages/project/pages-x4tywjkexhs9

---

## 📄 License

MIT License - 2026 LUCID/01 Concept Project

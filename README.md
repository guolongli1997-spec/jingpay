# Jingpay (জিংপে) — 多平台 AI 助理小程序

## 🚀 快速启动
1. `cd miniprogram` → 使用微信开发者工具打开
2. `cd cloud` → `npx wrangler deploy`

## 🔧 环境变量
- `BOT_API_KEY`：AI 服务认证密钥
- `WEBSOCKET_ENDPOINT`：Cloudflare Worker URL

## 📦 依赖说明
- 前端：微信小程序基础库 ≥ 2.28.0
- 后端：Node.js 18+，Wrangler 3.0+

## 🔄 更新流程
1. 修改 `miniprogram/` → 上传至微信平台
2. 修改 `cloud/` → `wrangler deploy` → 自动生效

## Jingpay 项目结构与页面流程文档（完整结构解析）
🏗️ 全局目录结构
Jingpay 项目采用前后端分离架构，前端基于 ‌WeChat Mini-program‌，后端由 ‌Cloudflare Workers‌ 实现无服务器逻辑。整体结构清晰，职责分明：

Jingpay/
├── miniprogram/             # 📱 微信小程序前端
│   ├── pages/               # 页面路由视图，每个子目录对应一个独立页面
│   ├── components/          # 可复用 UI 组件，遵循原子设计原则
│   ├── utils/               # 工具模块：API 客户端、WebSocket 类、数据格式化函数
│   ├── images/              # 静态资源：图标、背景图、品牌视觉资产
│   ├── app.js               # 全局生命周期钩子：onLaunch, onShow, onError
│   ├── app.json             # 页面路由配置、窗口样式、网络超时设置
│   ├── app.wxss             # 全局样式变量：颜色、字体、间距、主题变量
│   └── project.config.json  # 开发者工具配置：编译设置、调试选项
│
├── cloud/                   # ☁️ Cloudflare Workers 后端（无服务器）
│   ├── index.js             # 主入口：处理 HTTP API 请求、WebSocket 长连接、AI 消息路由
│   ├── package.json         # Node.js 依赖：@cloudflare/workers-types、axios、ws
│   └── wrangler.jsonc       # 部署配置：环境变量、绑定 KV、Durable Objects、域名映射
│
└── README.md                # 项目入门指南：安装、部署、调试、环境变量说明


> Multi-platform AI Chatbot Assistant — WeChat Mini-program + Cloudflare Workers

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/your-org/jingpay.git
cd jingpay

# 2. Frontend — Open in WeChat DevTools
cd miniprogram
# Open project.config.json in WeChat Developer Tools

# 3. Backend — Deploy Cloudflare Worker
cd ../cloud
npm install
npx wrangler deploy


npm init -y

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

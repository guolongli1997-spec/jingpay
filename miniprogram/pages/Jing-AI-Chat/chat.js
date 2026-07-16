// ========================================
// JINGPAY — Main Chat Page Logic
// ========================================

const app = getApp();
const api = require('../../utils/api');
const ws = require('../../utils/websocket');

Page({
  data: {
    messages: [],
    isTyping: false,
    scrollToMessage: '',
    menuOpen: false,
    features: [
      { label: '深度思考', active: false },
      { label: '文心5.1', active: false },
      { label: '2026高考', active: false }
    ]
  },

  onLoad() {
    this.initWebSocket();
    this.loadHistory();
  },

  onUnload() {
    ws.disconnect();
  },

  // ─── WebSocket Init ───

  initWebSocket() {
    ws.on('open', () => {
      console.log('✅ Chat WS Connected');
      app.globalData.wsConnected = true;
    });

    ws.on('message', (data) => {
      if (data.type === 'ai_response') {
        this.setData({ isTyping: false });
        this.addMessage(data.content, false);
      } else if (data.type === 'ai_typing') {
        this.setData({ isTyping: true });
      }
    });

    ws.on('close', () => {
      console.log('❌ Chat WS Disconnected');
      app.globalData.wsConnected = false;
    });

    ws.on('error', (err) => {
      console.error('Chat WS Error:', err);
    });

    if (app.globalData.wsUrl) {
      ws.connect(app.globalData.wsUrl);
    }
  },

  // ─── Load History ───

  async loadHistory() {
    try {
      const history = await api.getHistory(app.globalData.sessionId || 'default');
      if (history && history.messages) {
        this.setData({ messages: history.messages });
      }
    } catch (e) {
      console.warn('History load failed:', e);
      

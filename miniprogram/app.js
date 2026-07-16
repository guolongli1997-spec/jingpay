// ========================================
// JINGPAY (জিংপে) — Global App Lifecycle
// ========================================

App({
  globalData: {
    userInfo: null,
    botStatus: 'offline',       // 'online' | 'offline' | 'connecting'
    botConfig: {
      model: 'gpt-4o-mini',
      language: 'zh-CN',
      tone: 'professional',
      maxTokens: 1024
    },
    wsConnected: false,
    wsUrl: '',                   // Set after config fetch
    messages: [],                // Chat history
    apiBase: 'https://your-worker.your-subdomain.workers.dev'
  },

  onLaunch() {
    console.log('🚀 Jingpay Launched');
    this.checkBotStatus();
    this.loadBotConfig();
  },

  onShow() {
    console.log('📱 Jingpay Shown');
    this.checkBotStatus();
  },

  onError(err) {
    console.error('❌ App Error:', err);
  },

  // Check WebSocket connection to backend
  checkBotStatus() {
    const that = this;
    wx.request({
      url: `${this.globalData.apiBase}/api/status`,
      method: 'GET',
      success(res) {
        if (res.data && res.data.status === 'online') {
          that.globalData.botStatus = 'online';
          that.globalData.wsUrl = res.data.wsUrl;
        } else {
          that.globalData.botStatus = 'offline';
        }
      },
      fail() {
        that.globalData.botStatus = 'offline';
      }
    });
  },

  // Fetch dynamic bot config from backend
  loadBotConfig() {
    const that = this;
    wx.request({
      url: `${this.globalData.apiBase}/api/config`,
      method: 'GET',
      success(res) {
        if (res.data && res.data.config) {
          that.globalData.botConfig = res.data.config;
        }
      },
      fail(err) {
        console.warn('⚠️ Config fetch failed, using defaults:', err);
      }
    });
  }
});

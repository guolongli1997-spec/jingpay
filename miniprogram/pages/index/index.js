// ========================================
// JINGPAY — Home Page Logic
// ========================================

const app = getApp();

Page({
  data: {
    botStatus: 'offline',
    botConfig: {},
    menuOpen: false
  },

  onLoad() {
    this.setData({
      botConfig: app.globalData.botConfig
    });
    this.checkStatus();
  },

  onShow() {
    this.checkStatus();
  },

  checkStatus() {
    const status = app.globalData.botStatus;
    this.setData({ botStatus: status });
  },

  goToChat() {
    wx.switchTab({ url: '/pages/Jing-AI-Chat/chat' });
  },

  goToConfig() {
    wx.switchTab({ url: '/pages/config/config' });
  },

  goToHistory() {
    wx.navigateTo({ url: '/pages/history/history' });
  },

  toggleMenu() {
    this.setData({ menuOpen: !this.data.menuOpen });
  },

  closeMenu() {
    this.setData({ menuOpen: false });
  },

  onNavigate(e) {
    const page = e.detail.page;
    if (page === 'index' || page === 'chat' || page === 'config') {
      wx.switchTab({ url: `/pages/${page === 'chat' ? 'Jing-AI-Chat/chat' : page}/${page}` });
    } else {
      wx.navigateTo({ url: `/pages/${page}/${page}` });
    }
  }
});

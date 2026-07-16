// ========================================
// JINGPAY — Bot Configuration Manager
// ========================================

const app = getApp();

const DEFAULT_CONFIG = {
  model: 'gpt-4o-mini',
  language: 'zh-CN',
  tone: 'professional',
  maxTokens: 1024,
  temperature: 0.7,
  apiKey: '',
  provider: 'openai'  // 'openai' | 'baidu' | 'qwen'
};

class ConfigManager {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.load();
  }

  load() {
    try {
      const saved = wx.getStorageSync('bot_config');
      if (saved) {
        this.config = { ...DEFAULT_CONFIG, ...saved };
      }
    } catch (e) {
      console.warn('⚠️ Config load failed:', e);
    }
  }

  save() {
    try {
      wx.setStorageSync('bot_config', this.config);
    } catch (e) {
      console.warn('⚠️ Config save failed:', e);
    }
  }

  get() {
    return { ...this.config };
  }

  set(key, value) {
    this.config[key] = value;
    app.globalData.botConfig = this.config;
    this.save();
  }

  setAll(newConfig) {
    this.config = { ...DEFAULT_CONFIG, ...newConfig };
    app.globalData.botConfig = this.config;
    this.save();
  }

  reset() {
    this.config = { ...DEFAULT_CONFIG };
    this.save();
  }
}

module.exports = new ConfigManager();



// ========================================
// JINGPAY — REST API Client
// ========================================

const app = getApp();

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || app.globalData.apiBase;
    this.timeout = 10000;
  }

  // Generic request wrapper
  request(method, path, data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.baseUrl}${path}`,
        method,
        data,
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${app.globalData.botConfig.apiKey || ''}`
        },
        timeout: this.timeout,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.data?.message || 'Unknown error'}`));
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  }

  // GET
  get(path, params = {}) {
    const query = Object.keys(params).length
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request('GET', `${path}${query}`);
  }

  // POST
  post(path, data = {}) {
    return this.request('POST', path, data);
  }

  // ─── Domain APIs ───

  // Fetch bot configuration
  getConfig() {
    return this.get('/api/config');
  }

  // Update bot configuration
  updateConfig(config) {
    return this.post('/api/config', config);
  }

  // Get chat history
  getHistory(sessionId) {
    return this.get('/api/history', { sessionId });
  }

  // Send a chat message (REST fallback)
  sendMessage(message) {
    return this.post('/api/chat', {
      message: message.content,
      sessionId: message.sessionId,
      model: app.globalData.botConfig.model,
      language: app.globalData.botConfig.language
    });
  }

  // Check bot status
  getStatus() {
    return this.get('/api/status');
  }
}

module.exports = new ApiClient();

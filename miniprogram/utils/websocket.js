// ========================================
// JINGPAY — WebSocket Manager (WeChat Native)
// ========================================

const app = getApp();

class WebSocketManager {
  constructor() {
    this.socketTask = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;   // 3s
    this.heartbeatInterval = null;
    this.messageHandlers = [];
    this.heartbeatTimer = null;
  }

  // ─── Connection ───

  connect(url) {
    if (this.isConnected) {
      console.log('✅ Already connected');
      return;
    }

    console.log(`🔌 Connecting to: ${url}`);

    this.socketTask = wx.connectSocket({
      url: url,
      header: {
        'Content-Type': 'application/json'
      }
    });

    this.socketTask.onOpen(() => {
      console.log('✅ WebSocket Opened');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      app.globalData.wsConnected = true;
      this.startHeartbeat();
      this.emit('open');
    });

    this.socketTask.onMessage((res) => {
      try {
        const data = JSON.parse(res.data);
        this.emit('message', data);
      } catch (e) {
        console.error('❌ WS parse error:', e);
      }
    });

    this.socketTask.onClose(() => {
      console.log('❌ WebSocket Closed');
      this.isConnected = false;
      app.globalData.wsConnected = false;
      this.stopHeartbeat();
      this.reconnect();
      this.emit('close');
    });

    this.socketTask.onError((err) => {
      console.error('❌ WebSocket Error:', err);
      this.isConnected = false;
      this.emit('error', err);
    });
  }

  // ─── Reconnection Logic ───

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('🚫 Max reconnect attempts reached');
      this.emit('maxRetries');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      if (app.globalData.wsUrl) {
        this.connect(app.globalData.wsUrl);
      }
    }, delay);
  }

  // ─── Heartbeat ───

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        this.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // 30s
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // ─── Send / Receive ───

  send(data) {
    if (!this.isConnected) {
      console.warn('⚠️ Not connected, cannot send');
      return false;
    }
    try {
      this.socketTask.send({
        data: typeof data === 'string' ? data : JSON.stringify(data),
        success: () => console.log('📤 Sent:', data),
        fail: (err) => console.error('📤 Send failed:', err)
      });
      return true;
    } catch (e) {
      console.error('📤 Send exception:', e);
      return false;
    }
  }

  // ─── Event System ───

  on(event, handler) {
    this.messageHandlers.push({ event, handler });
  }

  emit(event, data) {
    this.messageHandlers
      .filter(h => h.event === event)
      .forEach(h => h.handler(data));
  }

  // ─── Disconnect ───

  disconnect() {
    this.stopHeartbeat();
    if (this.socketTask) {
      this.socketTask.close({ code: 1000, reason: 'User disconnect' });
      this.socketTask = null;
    }
    this.isConnected = false;
    app.globalData.wsConnected = false;
  }
}

module.exports = new WebSocketManager();

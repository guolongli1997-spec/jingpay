// ========================================
// JINGPAY — Custom Header Component
// ========================================

Component({
  properties: {
    title: {
      type: String,
      value: 'Jingpay'
    },
    bgColor: {
      type: String,
      value: '#1A73E8'
    }
  },

  methods: {
    onMenuTap() {
      this.triggerEvent('menutap');
    },
    onNewChat() {
      this.triggerEvent('newchat');
    }
  }
});

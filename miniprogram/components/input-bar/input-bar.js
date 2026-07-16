// ========================================
// JINGPAY — Input Bar Component
// ========================================

Component({
  data: {
    inputValue: ''
  },

  methods: {
    onInput(e) {
      this.setData({ inputValue: e.detail.value });
    },

    onSend() {
      if (!this.data.inputValue.trim()) return;
      this.triggerEvent('send', { content: this.data.inputValue.trim() });
      this.setData({ inputValue: '' });
    }
  }
});

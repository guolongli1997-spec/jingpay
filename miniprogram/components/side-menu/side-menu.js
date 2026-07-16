// ========================================
// JINGPAY — Side Menu Component
// ========================================

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    overlayOpacity: 0
  },

  observers: {
    'show': function(val) {
      if (val) {
        setTimeout(() => this.setData({ overlayOpacity: 1 }), 10);
      } else {
        this.setData({ overlayOpacity: 0 });
      }
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close');
    },

    onNavigate(e) {
      const page = e.currentTarget.dataset.page;
      this.triggerEvent('navigate', { page });
      this.triggerEvent('close');
    }
  }
});

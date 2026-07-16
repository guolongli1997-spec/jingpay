// ========================================
// JINGPAY — Thin Pill Button Component
// ========================================

Component({
  properties: {
    label: { type: String, value: 'Button' },
    active: { type: Boolean, value: false }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { label: this.data.label });
    }
  }
});

Component({
  properties: {
  },

  data: {
  },

  methods: {
    add(e: any) {
      const { did } = e.currentTarget.dataset;
      this.triggerEvent('addevent', {
        did,
      });
    },
  },
});

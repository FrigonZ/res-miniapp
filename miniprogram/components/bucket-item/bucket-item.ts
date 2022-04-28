Component({
  properties: {
    bucket: {
      type: Object,
    },
  },

  data: {
    price: 0,
  },

  lifetimes: {
    attached() {
      const { price = 0, options = [] } = this.properties.bucket;
      const total = options.length * price;
      this.setData({
        price: total,
      });
    },
  },

  methods: {
  },
});

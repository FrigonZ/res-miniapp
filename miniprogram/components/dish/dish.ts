import { IMAGE } from '../../constant/image';

Component({
  properties: {
    dish: {
      type: Object,
    },
  },

  data: {
    icon: IMAGE.ADD,
    hasOptions: false,
  },

  lifetimes: {
    attached() {
      const { options = [] } = this.properties.dish;
      if (options.length) this.setData({
        hasOptions: true,
      });
    },
  },

  methods: {
    add(e: any) {
      const { did } = e.currentTarget.dataset;
      this.triggerEvent('addevent', {
        did,
      });
    },
    showDetail() {
      this.triggerEvent('detailevent', {
        dish: this.properties.dish,
      });
    },
  },
});

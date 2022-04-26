import { IMAGE } from '../../constant/image';

Component({
  properties: {
    bucket: {
      type: Object,
    },
  },

  data: {
    addImage: IMAGE.ADD,
    minusImage: IMAGE.MINUS,
  },

  methods: {
    add(e: any) {
      const { did } = e.currentTarget.dataset;
      this.triggerEvent('addevent', {
        did,
      });
    },
    minus(e: any) {
      const { bid } = e.currentTarget.dataset;
      this.triggerEvent('minusevent', {
        bid,
      });
    },
  },
});

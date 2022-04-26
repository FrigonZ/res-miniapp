import { IMAGE } from '../../constant/image';

Component({
  properties: {
    dish: {
      type: Object,
    },
  },

  data: {
    icon: IMAGE.ADD,
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

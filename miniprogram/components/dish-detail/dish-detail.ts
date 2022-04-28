import { IMAGE } from '../../constant/image';

Component({
  properties: {
    dish: {
      type: Object,
    },
  },

  data: {
    icon: IMAGE.CLOSE,
  },

  methods: {
    add() {
      const { did } = this.properties.dish;
      this.triggerEvent('addevent', {
        did,
      });
    },
    close() {
      this.triggerEvent('closeevent');
    },
  },
});

import { IMAGE } from '../../constant/image';
import { stringsifyOptions } from '../../utils/dish';

const app = getApp<IAppOption>();

Component({
  properties: {
    bucket: {
      type: Object,
    },
  },

  data: {
    addImage: IMAGE.ADD,
    minusImage: IMAGE.MINUS,
    hasOptions: false,
    optionText: '',
  },

  lifetimes: {
    attached() {
      const { options = [] } = this.properties.bucket;
      if (options[0].length) {
        const text = stringsifyOptions(options[0]);
        this.setData({
          hasOptions: true,
          optionText: text,
        });
      }
    },
  },

  methods: {
    add(e: any) {
      if (this.data.hasOptions) {
        this.showDetail();
        return;
      }
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
    showDetail() {
      const { did } = this.properties.bucket;
      const dishes = app.globalData.dishes || [];
      const target = dishes.find((dish) => dish.did === did);
      if (!target) return;
      this.triggerEvent('detailevent', {
        dish: target,
      });
    },
  },
});

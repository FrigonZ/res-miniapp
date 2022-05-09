import { Discount } from '../../constant/entity';

Component({
  properties: {
    discounts: {
      type: Array,
      observer(newDiscounts) {
        const text = newDiscounts.reverse().map((discount) => `满${discount.standard}减${discount.discount}`).join(',');
        this.setData({
          text,
        });
      }
    },
  },

  data: {
    text: '',
  },

  lifetimes: {
    attached() {
      const discounts = this.properties.discounts as Discount[];
      console.log(discounts);
      const text = discounts.reverse().map((discount) => `满${discount.standard}减${discount.discount}`).join(',');
      this.setData({
        text,
      });
    },
    
  },

  methods: {
  },
});

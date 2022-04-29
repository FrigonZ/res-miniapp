import { DishOption } from "../../constant/entity";
import { stringsifyOptions } from "../../utils/dish";

Component({
  properties: {
    bucket: {
      type: Object,
    },
  },

  data: {
    price: 0,
    hasOptions: false,
    optionText: '',
  },

  lifetimes: {
    attached() {
      const { price = 0, options = [] } = this.properties.bucket;
      if (options[0].length) {
        let total = price;
        (options[0] as DishOption[]).forEach((option) => {
          const key = Object.keys(option.content)[0];
          total += option.content[key];
        });
        const text = stringsifyOptions(options[0]);
        this.setData({
          hasOptions: true,
          optionText: text,
          price: total,
        });
      } else{
        const total = options.length * price;
        this.setData({
          price: total,
        });
      }

    },
  },

  methods: {
  },
});

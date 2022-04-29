import { DishOption } from '../../constant/entity';
import { IMAGE } from '../../constant/image';

Component({
  properties: {
    dish: {
      type: Object,
    },
  },

  data: {
    icon: IMAGE.CLOSE,
    hasOptions: false,
    choices: [],
    current: [] as number[],
    price: 0,
  },

  lifetimes: {
    attached() {
      const { options = [], price = 0 } = this.properties.dish;
      if (options.length) {
        const current: number[] = [];
        const keyMatrix = options.map((option: DishOption) => {
          const { content } = option;
          if (!content) return [];

          const keys = Object.keys(content);
          current.push(0);
          return keys.map((key) => ({
            key,
            price: content[key],
          }));
        })
        this.setData({
          hasOptions: true,
          choices: keyMatrix,
          current: current,
          price,
        });
        const total = this.calcPrice();
        this.setData({
          price: total,
        });
      } else {
        this.setData({
          price,
        })
      }
    },
  },

  methods: {
    add() {
      const { did, options } = this.properties.dish;
      const { hasOptions, choices, current, price } = this.data;
      if (!hasOptions) {
        this.triggerEvent('addevent', {
          did,
        });
      } else {
        const groups = options.map((option: DishOption) => option.group);
        const final = current.map((choice, index): DishOption => ({
          group: groups[index],
          content: {
            [(choices[index][choice] as any).key]: (choices[index][choice] as any).price,
          },
        }));
        this.triggerEvent('addevent', {
          did,
          options: final,
          price: price,
        });
      }
    },
    close() {
      this.triggerEvent('closeevent');
    },
    select(e: any) {
      const { group, choice } = e.currentTarget.dataset;
      const { current } = this.data;
      current[group] = choice;
      this.setData({
        current,
      });
      const total = this.calcPrice();
      this.setData({
        price: total,
      })
    },
    calcPrice() {
      const { current, choices } = this.data;
      const { price: origon } = this.properties.dish;

      let price = origon;
      current.forEach((choice, index) => {
        price += (choices[index][choice] as any).price;
      });

      return price;
    }
  },
});

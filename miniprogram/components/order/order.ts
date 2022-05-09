import { DishBucket, DishProps, OrderDish, OrderStatus } from "../../constant/entity";
import { CGI } from "../../constant/request";
import { checkAndAdd } from "../../utils/dish";
import { requestWithPromise } from "../../utils/request";
import { formatTimeString } from "../../utils/time";

const app = getApp<IAppOption>();

Component({
  properties: {
    order: {
      type: Object,
    },
  },

  data: {
    dishes: [] as DishBucket[],
    status: ['制作中', '已完成', '已取消'],
    time: '',
    onProcess: 0,
  },

  lifetimes: {
    attached() {
      const dishes = app.globalData.dishes || [];
      const myDish = this.properties.order.dishes.map((dish: OrderDish) => {
        const { did } = dish;
        const target = dishes.find((dish) => dish.did === did);
        if (!target) return {};
        return {
          ...target,
          options: dish.option,
        };
      });
      const bucket: DishBucket[] = [];
      const opBucket: DishBucket[] = [];

      const rawDishes = myDish.filter((dish: DishProps) => !dish.options?.length);
      const opDishes = myDish.filter((dish: DishProps) => dish.options?.length);

      rawDishes.forEach((dish: DishProps) => {
        checkAndAdd(bucket, dish);
      });

      opDishes.forEach((dish: DishProps) => {
        opBucket.push({
          ...dish,
          options: [dish.options || []],
        });
      });
      const time = formatTimeString(this.properties.order.time);

      this.setData({
        dishes: [
          ...bucket,
          ...opBucket,
        ],
        time,
      });
    },
  },

  methods: {
    cancel(e: any) {
      const { status } = this.data.order;
      if (status !== OrderStatus.ON_PROCESS) return;
      wx.showModal({
        title: '确定要取消订单',
        content: '已经制作的订单不会退款',
        success: (res) => {
          if (res.confirm) {
            const { oid } = e.currentTarget.dataset;
            requestWithPromise({
              url: `${CGI.ORDER}/${oid}`,
              method: 'PUT',
              data: {},
            }).then((res) => {
              if (res) {
                wx.showToast({
                  title: '取消订单成功',
                  icon: 'none',
                });
                this.triggerEvent('refreshevent');
              } else {
                wx.showToast({
                  title: '订单取消失败',
                  icon: 'none',
                });
              }
            });
          }
        },
      })
    },

    openDetail() {
      this.triggerEvent('tapevent', {
        order: this.properties.order,
        dishes: this.data.dishes,
      });
    },
  },
});
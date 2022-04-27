import { DishBucket, DishProps, OrderStatus } from "../../constant/entity";
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
    dishes: [],
    status: ['制作中', '已完成', '已取消'],
    time: '',
    onProcess: 0,
  },

  lifetimes: {
    attached() {
      const dishes = app.globalData.dishes || [];
      const myDish = this.properties.order.dishes.map((dish: any) => {
        const { did } = dish;
        return dishes.find((dish) => dish.did === did) || {};
      });
      const bucket: DishBucket[] = [];

      myDish.forEach((dish: DishProps) => {
        checkAndAdd(bucket, dish);
      })
      const time = formatTimeString(this.properties.order.time);

      this.setData({
        dishes: bucket as any,
        time,
      });
    },
  },

  methods: {
    cancel(e: any) {
      const { status } = this.data.order;
      if (status !== OrderStatus.ON_PROCESS) return;
      const { oid } = e.currentTarget.dataset;
      requestWithPromise({
        url: `${CGI.ORDER}/${oid}`,
        method: 'PUT',
        data: {},
      }).then((res) => {
        if (res) {
          this.triggerEvent('refreshevent');
        }
      });
    }
  },
});
import { OrderStatus } from "../../constant/entity";
import { CGI } from "../../constant/request";
import { requestWithPromise } from "../../utils/request";
import { formatTimeString } from "../../utils/time";

Component({
  properties: {
    order: {
      type: Object,
    },
    dishes: {
      type: Object,
    },
  },

  data: {
    time: '',
    status: ['制作中', '已完成', '已取消'],
    canCancel: false,
  },

  lifetimes: {
    attached() {
      const time = formatTimeString(this.properties.order.time);
      const canCancel = this.properties.order.status === OrderStatus.ON_PROCESS;
      this.setData({
        time,
        canCancel,
      });
    },
  },

  methods: {
    cancel() {
      const { oid } = this.properties.order;
      if (!this.data.canCancel) return;
      wx.showModal({
        content: '确定要取消订单',
        success: (res) => {
          if(res.confirm) {
            requestWithPromise({
              url: `${CGI.ORDER}/${oid}`,
              method: 'PUT',
              data: {},
            }).then((res) => {
              if (res) {
                this.triggerEvent('refreshevent');
                this.setData({
                  canCancel: false,
                });
                wx.showToast({
                  title: '取消订单成功',
                  icon: 'none',
                });
              } else {
                wx.showToast({
                  title: '订单取消失败',
                  icon: 'none',
                });
              }
            });
          }
        }
      })
    },
  },
});

// order.ts
import { CGI } from '../../constant/request';
import { requestWithPromise } from '../../utils/request';
import { formatTime } from '../../utils/time';

const app = getApp<IAppOption>();

Page({
  data: {
    logs: [],
    dishes: [],
    orders: [],
    isRefreshing: false,
    canShowDetail: false,
    orderDetail: {},
  },
  onLoad() {
    const dishes = app.globalData.dishes || [];
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => ({
        date: formatTime(new Date(log)),
        timeStamp: log,
      })),
      dishes: dishes as any,
    });

    requestWithPromise({
      url: CGI.ORDER_LIST,
      method: 'GET',
      data: {},
    }).then((res) => {
      const { orders } = res || {};
      console.log(orders);
      this.setData({
        orders: orders?.reverse(),
      });
    });
  },

  refresh() {
    this.setData({
      isRefreshing: true,
    });

    requestWithPromise({
      url: CGI.ORDER_LIST,
      method: 'GET',
      data: {},
    }).then((res) => {
      const { orders } = res || {};
      console.log(orders);
      this.setData({
        orders: orders?.reverse(),
        isRefreshing: false,
      });
    });
  },

  openOrderDetail(e: any) {
    const { order, dishes } = e.detail;
    this.setData({
      orderDetail: {
        order,
        dishes,
      },
      canShowDetail: true,
    });
  },

  closeOrderDetail() {
    this.setData({
      canShowDetail: false,
    });
  },
});

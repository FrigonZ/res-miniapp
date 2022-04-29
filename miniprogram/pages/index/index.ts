// index.ts

import { CGI } from '../../constant/request';
import { requestWithPromise } from '../../utils/request';
import { DishProps, DishStatus } from '../../constant/entity';
import {
  calcPrice, checkAndAdd, formatBucket, removeBucket,
} from '../../utils/dish';
import { IMAGE } from '../../constant/image';

// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    dishes: [],
    groups: [],
    canScroll: false,
    seat: '1',
    buckets: [],
    optionsBuckets: [],
    price: 0,
    canShowBucket: false,
    currentGroup: 0,
    scrollTo: '',
    banner: IMAGE.BANNER,
    canShowDetail: false,
    dishDetail: {},
  },
  // 事件处理函数
  jumpToOrder() {
    wx.navigateTo({
      url: '../order/order',
    });
  },
  onLoad(query) {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }

    const { seat = '1' } = query;

    this.setData({
      seat,
    });

    requestWithPromise({
      url: CGI.GROUP,
      method: 'GET',
      data: {},
    }).then((groupRes) => {
      const { groups = [] } = groupRes || {};
      requestWithPromise({
        url: CGI.DISH,
        method: 'GET',
        data: {},
      }).then((dishRes) => {
        const { dishList = [] } = dishRes || {};
        console.log(dishList)
        groups.forEach((group: any) => {
          group.dishes =
            dishList.filter((dish: DishProps) => dish.group === group.gid && dish.status === DishStatus.NORMAL) || [];
        });
        this.setData({
          groups,
          dishes: dishList,
          currentGroup: groups[0].gid,
        });
        app.globalData.dishes = dishList;
      });
    });
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  handleDragUp() {
    this.setData({
      canScroll: false,
    });
  },
  handleDragLow() {
    this.setData({
      canScroll: true,
    });
  },
  setGroup(e: any) {
    const { gid } = e.currentTarget.dataset;
    const { canScroll } = this.data;
    this.setData({
      canScroll: true,
    });
    this.setData({
      currentGroup: gid,
      scrollTo: `g-${gid}`,
      canScroll,
    });
  },
  showDetail(e:any) {
    const { dish } = e.detail;
    this.setData({
      dishDetail: dish,
      canShowDetail: true,
    });
  },
  closeDetail() {
    this.setData({
      canShowDetail: false,
    });
  },
  addBucket(e: any) {
    const { did, options, price: finalPrice } = e.detail;
    const { buckets, optionsBuckets, dishes } = this.data;
    const dish = dishes.find((d: DishProps) => d.did === did);
    if (!dish) return;

    if (!options) {
      const bucket = checkAndAdd(buckets, dish);
      const price = calcPrice(bucket, optionsBuckets);
      this.setData({
        buckets: bucket as any,
        price,
        canShowDetail: false,
      });
    } else {
      const target = {
        ...(dish as any),
        options: [options],
        price: finalPrice,
        bid: Date.now(),
      };
      const opBucket = [
        ...optionsBuckets,
        target,
      ];
      const price = calcPrice(buckets, opBucket);
      this.setData({
        optionsBuckets: opBucket as any,
        price,
        canShowDetail: false,
      });
    }
  },
  minusBucket(e: any) {
    const { bid } = e.detail;
    const { buckets, optionsBuckets } = this.data;
    const bucket = removeBucket(buckets, bid);
    const opBucket = removeBucket(optionsBuckets, bid);
    const price = calcPrice(bucket, opBucket);
    this.setData({
      buckets: bucket as any,
      optionsBuckets: opBucket as any,
      price,
    });
    if (bucket.length === 0) {
      this.setData({
        canShowBucket: false,
      });
    }
  },
  toggleBucket() {
    const { buckets, optionsBuckets } = this.data;
    const hasBucket = buckets.length !== 0 || optionsBuckets.length !== 0;
    if (!this.data.canShowBucket && !hasBucket) return;
    this.setData({
      canShowBucket: !this.data.canShowBucket,
    });
  },
  clearBucket() {
    this.setData({
      buckets: [],
      optionsBuckets: [],
      price: 0,
      canShowBucket: false,
    });
  },
  submitOrder() {
    const { buckets, optionsBuckets } = this.data;
    const hasBucket = buckets.length !== 0 || optionsBuckets.length !== 0;
    if (!hasBucket) return;
    const formatBuckets = formatBucket(buckets);
    const formatOpBuckets = formatBucket(optionsBuckets);
    requestWithPromise({
      url: CGI.ORDER,
      method: 'POST',
      data: {
        order: {
          seat: this.data.seat,
        },
        dishes: [
          ...formatBuckets,
          ...formatOpBuckets,
        ],
      },
    }).then((res) => {
      const { order } = res || {};
      if (order) {
        this.setData({
          buckets: [],
          optionsBuckets: [],
          canShowBucket: false,
          price: 0,
        });
      }
    });
  },
});

/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    dishes: any[],
    token: string;
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    token: string;
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
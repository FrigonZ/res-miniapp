import { CGI } from './constant/request';
import { requestWithPromise } from './utils/request';
import { setToken } from './utils/token';

// app.ts
App<IAppOption>({
  globalData: {
    token: '',
    dishes: [],
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: async (res) => {
        if (res.code) {
          const resData = await requestWithPromise({
            method: 'POST',
            url: CGI.LOGIN,
            data: { code: res.code },
          });

          const { token } = resData || {};
          if (token) {
            this.globalData.token = token;
            setToken(token);
            console.log('setToken')
          }
        }
      },
    });
  },
});

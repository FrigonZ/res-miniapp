import { ResCode } from '../constant/request';

interface RequestOption {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data: Record<string, any>,
  url: string
}

export const requestWithPromise = (
  options: RequestOption,
): Promise<any> => new Promise((resolve) => {
  wx.request({
    ...options,
    success: (res) => {
      const { code, data } = res.data as Record<string, any>;
      if (code === ResCode.SUCCESS) {
        resolve(data);
      } else {
        resolve({});
      }
    },
  });
});

import { BASE_URL, ResCode } from '../constant/request';
import { getToken } from './token';

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
    url: BASE_URL + options.url,
    header: {
      authorization: getToken(),
    },
    success: (res) => {
      const { code, data } = res.data as Record<string, any>;
      if (code === ResCode.SUCCESS) {
        resolve(data);
      } else {
        console.log(res);
        resolve(null);
      }
    },
  });
});

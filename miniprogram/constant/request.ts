export const CGI = {
  LOGIN: 'http://127.0.0.1:8080/api/login',
};

/** 返回错误码 */
export const enum ResCode {
  /** 失败 */
  FAIL = -1,
  /** 成功 */
  SUCCESS = 0,
  /** 鉴权错误 */
  AUTH_FAIL = 1,
  /** 错误 */
  EXCEPTION = 999,
}
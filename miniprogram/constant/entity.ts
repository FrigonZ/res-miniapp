/** 餐品状态 */
export const enum DishStatus {
  /** 正常 */
  NORMAL,
  /** 售罄 */
  SOLD_OUT,
  /** 下架 */
  CLOSED,
}

/** 餐品自定义 */
export interface DishOption {
  /** 分组名 */
  group?: string;
  /** 选项名 */
  content: Record<string, number>;
  /** 是否多选 */
  isMulti?: boolean;
}

export interface DishProps {
  /** id */
  did?: string;
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 是否为必选品 */
  isNecessary: boolean;
  /** 餐品状态 */
  status?: DishStatus;
  /** 餐品自定义 */
  options?: DishOption[];
  /** 分组 */
  group?: number;
}

export interface DishBucket {
  bid?: number;
  /** id */
  did?: string;
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 是否为必选品 */
  isNecessary: boolean;
  /** 餐品状态 */
  status?: DishStatus;
  /** 餐品自定义 */
  options: DishOption[][];
  /** 分组 */
  group?: number;
}

export interface DishForm {
  /** id */
  did?: string;
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 是否为必选品 */
  isNecessary: 0 | 1;
  /** 餐品状态 */
  status?: DishStatus;
  /** 餐品自定义 */
  options?: DishOption[];
}

/** 订单接口行为 */
export const enum OrderAction {
  /** 获取订单列表 */
  GET,
  /** 调整订单状态 */
  SET,
  /** 确认消息 */
  CONFIRM,
  /** 心跳消息 */
  HEART_BEAT,
  /** 终止连接 */
  FINISH,
  /** 鉴权失败 */
  AUTH_FAIL,
}

/** 订单状态 */
export const enum OrderStatus {
  /** 制作中 */
  ON_PROCESS,
  /** 制作完成 */
  FINISHED,
  /** 取消 */
  CANCELED,
}

export interface DishGroup {
  gid: number,
  name: string,
}

export interface OrderDish {
  did: number;
  option?: DishOption;
}

export interface FormatDish extends OrderDish {
  num: number;
}

export interface Order {
  oid: number;
  time: Date;
  status: OrderStatus;
  seat: string;
  uid: number;
  dishes: OrderDish[];
  price: number;
}

export interface Discount {
    did?: number;
    standard: number;
    discount: number;
  }
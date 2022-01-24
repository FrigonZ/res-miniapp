/** 用户信息 */
export interface UserInfo {
    id: string;
    name: string;
};

/** 菜品 */
export interface MenuItem {
    /** 菜品id */
    id: string;
    /** 菜名 */
    name: string;
    /** 菜品描述 */
    desc: string;
    /** 菜品图片 */
    pic: string;
    /** 菜品价格 */
    price: number;
    /** 菜品状态 */
    status: MenuItemStatus;
    /** 菜品标签 */
    tags?: string[];
    /** 菜品选项 */
    options?: MenuItemOption[];
};

/** 菜品状态 */
export const enum MenuItemStatus {
    /** 正常 */
    NORMAL,
    /** 售罄 */
    SOLD_OUT,
    /** 下架 */
    TAKE_DOWN,
};

/** 菜单选项 */
export interface MenuItemOption {
    /** 选项分类 */
    name: string;
    /** 选项内容 */
    choice: MenuItemChoice[];
};

/** 选项内容 */
export interface MenuItemChoice {
    /** 选项名 */
    name: string;
    /** 价格调整 */
    price: number;
};

/** 点单项 */
export interface OrderItem extends MenuItem{
    /** 选项选择 */
    decisions?: Record<string, number>;
};

/** 订单 */
export interface Order {
    /** 订单id */
    id: string;
    /** 订单时间 */
    time: number;
    /** 订单内容 */
    items: OrderItem[];
    /** 订单总价格 */
    totalPrice: number;
    /** 座位 */
    seat: string;
    /** 订单状态 */
    status: OrderStatus;
};

/** 订单状态 */
export const enum OrderStatus {
    /** 制作中 */
    ON_PROCESS,
    /** 制作完成 */
    FINISHED,
    /** 取消 */
    CANCELED,
};

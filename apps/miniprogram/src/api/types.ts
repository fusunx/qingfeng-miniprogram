export interface configType {
  url: string;
  baseURL?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "CONNECT" | "HEAD" | "OPTIONS" | "TRACE";
  data?: object;
  dataType?: string;
  params?: object;
  timeout?: number;
  firstIpv4?: boolean;
  custom?: object;
  header?: object;
}

export interface optionsType {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  //  是否处理请求结果
  isTransformRequestResult?: boolean;
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean;
  // 是否显示提示信息
  isShowMessage?: boolean;
  // 是否显示toast信息
  isShowToast?: boolean;
  // 是否显示loading
  isShowLoading?: boolean;
  // 成功的文本信息
  successMessageText?: string;
  // 是否显示成功信息
  isShowSuccessMessage?: boolean;
  // 是否显示失败信息
  isShowErrorMessage?: boolean;
  // 错误的文本信息
  errorMessageText?: string;
  // 是否加入时间戳
  joinTime?: boolean;
  // 忽略重复请求
  ignoreCancelToken?: boolean;
  // 请求时是否 在header上传token
  withToken?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口拼接地址
  urlPrefix?: string;
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: string;
  // 是否使用配置的BASIC-URL
  isUserBasicUrl?: boolean;
  // 是否加密post 参数
  isEncryptParams?: boolean;
  // 返回的路由url
  backUrl?: string;
  // 登录失效后是否返回首页 -- 就是小程序跳到登录页的时候，左上角是否显示主页的icon
  isBackHome?: boolean;
}

export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum ResultEnum {
  SUCCESS = 0,
  USER_NO_EXIT = 1001, //用户不存在
  LOGIN_EXPIRED = 2062000, //登录会话失效
  ORDER_STATUS_70008 = 70008, // 加锁失败，这个算系统异常的一种
  ORDER_STATUS_70010 = 70010, // 订单的状态不是待支付的状态
  ORDER_STATUS_80007 = 80007, // 点击取消时，系统已经是付款成功的状态
  ORDER_STATUS_10003 = 10003, // 使用userId + orderId查询订单为空，也就是这个人没有这笔订单，一般情况下不应该出现
  ORDER_STATUS_10005 = 10005, // 获取不到登录的token，一般情况下不应该出现
  SERVICE_UNAVAILABLE = 429, // 限流
  PRIVILEGE_CODE_NOT_AVAILABLE = 70020, // 特权码不可用
  ORDER_STATUS_70002 = 70002, // 提示太火爆
  ORDER_STATUS_70016 = 70016, // 订单取消次数过多
  ORDER_STATUS_70006 = 70006, // 商品库存不足，创建订单失败
  POLLING_QUEUE_NOT_OPEN = 28887, // 排队未开启
  POLLING_QUEUE_IN_LINE = 28888, // 排队中
  POLLING_QUEUE_VALID = 28889, // 有效可购买
}

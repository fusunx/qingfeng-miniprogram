/** 实体通用状态 */
export enum EntityCommonStatus {
  /** 启用 */
  enable = 1,
  /** 未启用 */
  notEnabled = 0,
}

/** 请求状态代码 */
export enum RequestStatusCode {
  /** 成功 */
  success = 0,
  /** 失败 */
  fail = 1,
}

/** 页面配置 */
export interface IPageConfig {
  /** 首页第一屏图片 */
  homeFirstImg: string[];
  /** 首页第二屏图片 */
  homeSecondImg: string;
  /** 首页视频 */
  homeVideo: string;
  /** 体验中心顶部图片 */
  experienceTopImg: string;
  /** 政策中心顶部图片 */
  policyTopImg: string;
  /** 客服微信二维码 */
  customerServiceWechatQrCode: string;
}

/** 页面配置的key */
export type pageConfigKeys = keyof IPageConfig;

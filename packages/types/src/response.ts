export interface ICommonResponse<T> {
  /** 状态码 */
  code: number;
  /** 消息 */
  message: string;
  /** 数据 */
  data: T;
  /** 成功 */
  success: boolean;
}

export interface IUploadFileResponse {
  /** 文件路径 */
  url: string;
  /** 文件名 */
  filename: string;
  /** 文件类型 */
  mimetype: string;
}

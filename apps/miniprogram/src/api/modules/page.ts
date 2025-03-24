import { request } from "../request";
import { RequestEnum } from "../types";

/**
 * @description 页面配置
 */
export const getPageConfigApi = <T>() => {
  return request<T>({
    url: "page/get",
    method: RequestEnum.GET,
  });
};

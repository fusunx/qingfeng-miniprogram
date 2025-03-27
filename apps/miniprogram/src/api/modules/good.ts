import { EntityCommonStatus, ICommonFilterPage, IGoodFilterData } from "@qinfeng/types";
import { request } from "../request";
import { RequestEnum } from "../types";

/**
 * @description 商品分类配置
 */
export const getCategoryApi = <T>(data: ICommonFilterPage) => {
  data.status = EntityCommonStatus.enable;
  return request<T>({
    url: "category/list",
    method: RequestEnum.GET,
    params: data,
  });
};

/**
 * @description 获取商品列表
 */
export const getGoodListApi = <T>(data: IGoodFilterData) => {
  data.status = EntityCommonStatus.enable;
  return request<T>({
    url: "good/list",
    method: RequestEnum.GET,
    params: data,
  });
};

/**
 * @description 获取商品详情
 */
export const getGoodApi = <T>(id: number) => {
  return request<T>({
    url: `good/${id}`,
    method: RequestEnum.GET,
  });
};

import type {
  ICreateGood,
  ICommonFilterPage,
  IGoodDetail,
  ICommonListResult,
} from "@qinfeng/types";
import api from "../index";

/** 创建商品 */
export const createGoodApi = (data: ICreateGood) => {
  return api.post("good/create", data);
};

/** 更新商品 */
export const updateGoodApi = (id: number, data: ICreateGood) => {
  return api.post(`good/update/${id}`, data);
};

/** 获取商品列表 */
export const getGoodListApi = (data: ICommonFilterPage) => {
  return api.get<ICommonListResult<IGoodDetail>>("good/list", {
    params: data,
  });
};
/** 获取商品详情 */
export const getGoodDetailApi = (id: number) => {
  return api.get<ICreateGood>(`good/${id}`);
};

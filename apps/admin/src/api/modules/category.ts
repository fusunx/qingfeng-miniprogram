import type {
  ICreateCategory,
  ICommonFilterPage,
  ICategoryDetail,
  ICommonListResult,
} from "@qinfeng/types";
import api from "../index";

/** 创建分类 */
export const createCategoryApi = (data: ICreateCategory) => {
  return api.post("category/create", data);
};

/** 更新分类 */
export const updateCategoryApi = (id: number, data: ICreateCategory) => {
  return api.post(`category/update/${id}`, data);
};

/** 获取分类列表 */
export const getCategoryListApi = (data: ICommonFilterPage) => {
  return api.get<ICommonListResult<ICategoryDetail>>("category/list", {
    params: data,
  });
};
/** 获取分类详情 */
export const getCategoryDetailApi = (id: number) => {
  return api.get<ICreateCategory>(`category/${id}`);
};

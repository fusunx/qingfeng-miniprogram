import type {
  ICreateArticle,
  ICommonFilterPage,
  IArticleDetail,
  ICommonListResult,
} from "@qinfeng/types";
import api from "../index";

/** 创建文章 */
export const createArticleApi = (data: ICreateArticle) => {
  return api.post("article/create", data);
};

/** 更新文章 */
export const updateArticleApi = (id: number, data: ICreateArticle) => {
  return api.post(`article/update/${id}`, data);
};

/** 获取文章列表 */
export const getArticleListApi = (data: ICommonFilterPage) => {
  return api.get<ICommonListResult<IArticleDetail>>("article/list", {
    params: data,
  });
};
/** 获取文章详情 */
export const getArticleDetailApi = (id: number) => {
  return api.get<ICreateArticle>(`article/${id}`);
};

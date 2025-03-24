import { ICommonFilterPage } from "@qinfeng/types";
import { request } from "../request";
import { RequestEnum } from "../types";

/**
 * @description 获取文章列表
 */
export const getArticleListApi = <T>(data: ICommonFilterPage) => {
  return request<T>({
    url: "article/list",
    method: RequestEnum.GET,
    params: data,
  });
};

/**
 * @description 获取文章详情
 */
export const getArticleApi = <T>(id: number) => {
  return request<T>({
    url: `article/${id}`,
    method: RequestEnum.GET,
  });
};

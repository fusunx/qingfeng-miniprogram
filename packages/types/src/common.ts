import { EntityCommonStatus } from "./entity";
import { IGoodMapDataList } from "./good";

/** 通用筛选分页参数 */
export interface ICommonFilterPage {
  page: number;
  pageSize: number;
  id?: number;
  name?: string;
}

/** 弹窗操作类型 */
export type DialogOptionType = "add" | "edit";

/** 创建分类数据 */
export interface ICreateCategory {
  name: string;
  img?: string;
  status?: EntityCommonStatus; // 1: 启用, 2: 禁用, 3: 删除
  description?: string;
}

/** 分类数据详情 */
export interface ICategoryDetail extends ICreateCategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: EntityCommonStatus;
}

/** 状态下拉选择数据 */
export interface IStatusOption {
  label: string;
  value: number;
}

/**
 * 状态下拉选择数据
 */
export const statusOptions: IStatusOption[] = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 2 },
];

/** 通用列表返回数据 */
export interface ICommonListResult<T> {
  data: T[];
  total: number;
}

/** 创建商品数据 */
export interface ICreateGood {
  name: string;
  description?: string;
  img?: string;
  listImg: string;
  swiperImgs: string[];
  detailImg: string;
  detailTable?: IGoodMapDataList;
  sales: number;
  price: number;
  category: number;
  status: EntityCommonStatus;
}

/** 商品数据详情 */
export interface IGoodDetail extends ICreateGood {
  id: number;
  createdAt: string;
  updatedAt: string;
}

/** 获取商品列表数据 */
export interface IGoodFilterData extends ICommonFilterPage {
  categoryId?: number;
}

/** 创建文章数据 */
export interface ICreateArticle {
  name: string;
  img: string;
  status: EntityCommonStatus; // 1: 启用, 2: 禁用, 3: 删除
  content: string;
}

/** 更新文章数据 */
export interface IUpdateArticle extends ICreateArticle {
  id: number;
}

/** 文章数据详情 */
export interface IArticleDetail extends ICreateArticle {
  id: number;
  createdAt: string;
  updatedAt: string;
}

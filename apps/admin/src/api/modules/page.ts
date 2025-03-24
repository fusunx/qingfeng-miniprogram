import type { IPageConfig } from "@qinfeng/types";
import api from "../index";

export const setPageConfig = (data: IPageConfig) => {
  return api.post("page/config/set", data);
};

export const getPageConfig = () => {
  return api.get<IPageConfig>("page/config/get");
};

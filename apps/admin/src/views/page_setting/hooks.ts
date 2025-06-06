import type { IPageConfig } from "@qinfeng/types";
import type { UploadUserFile } from "element-plus";
export const usePageSetting = () => {
  const homeFirstImg = ref<UploadUserFile[]>([]);
  const defaultForm: Omit<IPageConfig, "homeFirstImg"> = {
    homeSecondImg: "",
    homeVideo: "",
    experienceTopImg: "",
    policyTopImg: "",
    customerServiceWechatQrCode: "",
    policyTopDetailImg: "",
  };

  const labelMap: Record<keyof Omit<IPageConfig, "homeFirstImg">, string> = {
    homeSecondImg: "首页第二屏图片",
    homeVideo: "首页视频",
    experienceTopImg: "体验中心顶部图片",
    policyTopImg: "政策法规顶部图片",
    customerServiceWechatQrCode: "客服微信二维码",
    policyTopDetailImg: "政策法规顶部图片跳转地址图片",
  };

  const formUploadItemOptions = Object.keys(defaultForm).map((key) => {
    return {
      key: key as keyof typeof labelMap,
      label: labelMap[key as keyof typeof labelMap],
    };
  });

  return {
    defaultForm,
    formUploadItemOptions,
    homeFirstImg,
  };
};

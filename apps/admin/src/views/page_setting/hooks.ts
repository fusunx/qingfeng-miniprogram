import type { IPageConfig, pageConfigKeys } from "@qinfeng/types";
export const usePageSetting = () => {
  const defaultForm: IPageConfig = {
    homeFirstImg: "",
    homeSecondImg: "",
    homeVideo: "",
    experienceTopImg: "",
    policyTopImg: "",
    customerServiceWechatQrCode: "",
  };

  const labelMap: Record<pageConfigKeys, string> = {
    homeFirstImg: "首页第一屏图片",
    homeSecondImg: "首页第二屏图片",
    homeVideo: "首页视频",
    experienceTopImg: "体验中心顶部图片",
    policyTopImg: "政策法规顶部图片",
    customerServiceWechatQrCode: "客服微信二维码",
  };

  const formUploadItemOptions = Object.keys(defaultForm).map((key) => {
    return {
      key: key as pageConfigKeys,
      label: labelMap[key as pageConfigKeys],
    };
  });

  return {
    defaultForm,
    formUploadItemOptions,
  };
};

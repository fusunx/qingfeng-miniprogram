// https://www.quanzhan.co/luch-request/guide/3.x/#request
import Request, { HttpRequestConfig } from "luch-request";
import { ResultEnum, type configType, type optionsType } from "./types";

const http = new Request();
const HTTP_URL = import.meta.env.VITE_APP_API_BASEURL;
const STATIC_URL = import.meta.env.VITE_APP_STATIC_BASEURL;

console.log("HTTP_URL", HTTP_URL);
console.log("STATIC_URL", STATIC_URL);

export const getStaticUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  return `${STATIC_URL}${url}`;
};

/**
 * @description 修改全局默认配置
 * @param {Function}
 */
http.setConfig((config) => {
  config.baseURL = HTTP_URL;
  return config;
});

/**
 * @description 请求拦截器
 * @param {Function}
 */
http.interceptors.request.use(
  async (config) => {
    config.header = {
      ...config.header,
      "Accept-Language": "zh-CN",
    };
    config.timeout = 60 * 1000;
    return config;
  },
  (config) => {
    // 可使用async await 做异步操作
    return Promise.reject(config);
  }
);

const defaultOptions: optionsType = {
  isShowLoading: false,
  isShowToast: false,
  isShowMessage: false,
  isShowErrorMessage: true,
  isShowSuccessMessage: false,
  successMessageText: "",
  errorMessageText: "",
  backUrl: "",
  isBackHome: false,
  isTransformRequestResult: true,
  isReturnNativeResponse: false,
  joinParamsToUrl: false,
  formatDate: true,
  joinTime: true,
  ignoreCancelToken: true,
  withToken: true,
  joinPrefix: true,
  urlPrefix: "/api",
  apiUrl: HTTP_URL,
  errorMessageMode: "none",
  isUserBasicUrl: false,
};

/**
 *
 * @param config
 * @param config
 * @returns
 */
export const request = async <T>(config: configType, options?: optionsType): Promise<T> => {
  const opt = Object.assign({}, defaultOptions, options);

  if (opt?.isShowLoading) {
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
  }
  return http
    .request(config as HttpRequestConfig)
    .then((res) => {
      const result = res.data;

      if (opt?.isShowToast) {
        uni.hideToast();
      }

      const { code, data, message: msg } = result;

      const hasSuccess = code === ResultEnum.SUCCESS;

      if (opt?.isShowMessage) {
        if (hasSuccess && (opt?.successMessageText || opt?.isShowSuccessMessage)) {
          uni.showToast({
            title: options?.successMessageText || msg,
            icon: "success",
          });
        } else if (!hasSuccess && (opt?.errorMessageText || opt?.isShowErrorMessage)) {
          uni.showToast({
            title: msg || options?.errorMessageText || "太火爆了，请稍后再试",
            icon: "none",
          });
        } else {
          if (msg) {
            uni.showToast({
              title: msg,
              icon: "none",
            });
          }
        }
      }

      // 根据返回的code值来做不同的处理（和后端约定）
      if (hasSuccess) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(result);
      }
    })
    .catch((result) => {
      const { code, data, msg } = result;
      if (opt?.isShowLoading) {
        uni.hideLoading();
      }

      return Promise.reject({
        code: -1,
        msg: msg || "太火爆了，请稍后再试",
      });
    });
};

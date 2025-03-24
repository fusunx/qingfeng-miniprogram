import useUserStore from "@/store/modules/user";
import axios from "axios";
// import qs from 'qs'
import { toast } from "vue-sonner";

// 格式化token
export function formatToken(token: null | string) {
  return token ? `Bearer ${token}` : null;
}

// 生成请求头，带token
export function getTokenConfig() {
  const userStore = useUserStore();
  return {
    Authorization: formatToken(userStore.token),
    Token: userStore.token,
  };
}

const api = axios.create({
  baseURL:
    import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY
      ? "/proxy/"
      : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: "json",
});

api.interceptors.request.use((request) => {
  const userStore = useUserStore();
  // 设置请求头
  if (request.headers) {
    if (userStore.isLogin) {
      request.headers.Authorization = formatToken(userStore.token);
      request.headers.Token = userStore.token;
    }
  }
  // 是否将 POST 请求参数进行字符串化处理
  if (request.method === "post") {
    // request.data = qs.stringify(request.data, {
    //   arrayFormat: 'brackets',
    // })
  }
  return request;
});

api.interceptors.response.use(
  (response) => {
    // 全局拦截请求发送后返回的数据
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.status === 401) {
      useUserStore().requestLogout();
      throw error;
    }
    let message =
      JSON.stringify(error?.response?.data?.message) ||
      JSON.stringify(error.message);
    if (message === "Network Error") {
      message = "后端网络故障";
    } else if (message.includes("timeout")) {
      message = "接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = `接口${message.substr(message.length - 3)}异常`;
    }
    toast.error("Error", {
      description: message,
    });
    return Promise.reject(error);
  },
);

export default api;

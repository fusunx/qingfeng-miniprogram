import api from "../index";
import { md5 } from "js-md5";

export default {
  // 登录
  login: (data: { account: string; password: string }) => {
    data.password = md5(data.password);
    return api.post("/login", data);
  },

  // 获取权限
  permission: () =>
    api.get("user/permission", {
      baseURL: "/mock/",
    }),

  // 修改密码
  passwordEdit: (data: { password: string; newPassword: string }) => {
    data.password = md5(data.password);
    data.newPassword = md5(data.newPassword);
    return api.post("/edit/password", data);
  },
};

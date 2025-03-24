import type { RecursiveRequired, Settings } from "#/global";
import settingsDefault from "@/settings.default";
import { merge } from "@/utils/object";
import { cloneDeep } from "es-toolkit";

const globalSettings: Settings.all = {
  // 请在此处编写或粘贴配置代码
  menu: {
    mode: "head",
  },
  toolbar: {
    /**
     * 是否开启导航搜索
     * @默认值 `true`
     */
    navSearch: true,
  },
};

export default merge(
  globalSettings,
  cloneDeep(settingsDefault),
) as RecursiveRequired<Settings.all>;

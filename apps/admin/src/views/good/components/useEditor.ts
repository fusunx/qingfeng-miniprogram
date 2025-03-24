import type { FormInstance, FormRules, UploadUserFile } from "element-plus";
import type {
  ICommonResponse,
  ICreateGood,
  IGoodMapDataList,
  IUploadFileResponse,
} from "@qinfeng/types";
import { createGoodApi, updateGoodApi } from "@/api/modules/good";
import { EntityCommonStatus } from "@qinfeng/types";
import { toast } from "vue-sonner";

export const useEditor = () => {
  const ruleFormRef = ref<FormInstance>();
  const form = ref<ICreateGood>({
    status: EntityCommonStatus.enable,
  } as ICreateGood);

  const rules = ref<FormRules<ICreateGood>>({
    name: [{ required: true, message: "请输入商品名", trigger: "blur" }],
    price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
    listImg: [
      { required: true, message: "请上传商品列表图片", trigger: "blur" },
    ],
    swiperImgs: [
      { required: true, message: "请上传商品轮播图", trigger: "blur" },
    ],
    detailImg: [
      { required: true, message: "请上传商品详情图", trigger: "blur" },
    ],
    detailTable: [
      { required: true, message: "请上传商品详情表格图", trigger: "blur" },
    ],
    sales: [{ required: true, message: "请输入商品销量", trigger: "blur" }],
    category: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
  });

  const fileList = ref<UploadUserFile[]>([]);
  const defaultGoodMapData = {
    label: "",
    value: "",
  };

  const detailTable = ref<IGoodMapDataList>([
    JSON.parse(JSON.stringify(defaultGoodMapData)),
  ]);

  const createGood = async (
    formEl: FormInstance | undefined,
    reqData: ICreateGood,
  ) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 验证通过，创建分类
        await createGoodApi(reqData);
        toast.success("创建成功");
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const updateGood = async (
    formEl: FormInstance | undefined,
    id: number,
    reqData: ICreateGood,
  ) => {
    console.log("updateGood", id, reqData);
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 验证通过，更新分类
        updateGoodApi(id, reqData);
        toast.success("更新成功");
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const handleUploadSuccess = (
    res: ICommonResponse<IUploadFileResponse>,
    _: any,
    key: keyof ICreateGood,
  ) => {
    console.log(res);
    // 上传成功后，将图片地址赋值给form.homeFirstImg、form.homeSecondImg、form.homeVide
    (form.value![key] as any) = res.data.url;
  };

  return {
    ruleFormRef,
    form,
    rules,
    detailTable,
    defaultGoodMapData,
    fileList,
    createGood,
    updateGood,
    handleUploadSuccess,
  };
};

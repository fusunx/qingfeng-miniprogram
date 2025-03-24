import type { FormInstance, FormRules } from "element-plus";
import type {
  ICommonResponse,
  ICreateArticle,
  IUploadFileResponse,
} from "@qinfeng/types";
import { createArticleApi, updateArticleApi } from "@/api/modules/article";
import { EntityCommonStatus } from "@qinfeng/types";
import { toast } from "vue-sonner";

export const useEditor = () => {
  const ruleFormRef = ref<FormInstance>();
  const form = ref<ICreateArticle>({
    status: EntityCommonStatus.enable,
  } as ICreateArticle);

  const rules = ref<FormRules<ICreateArticle>>({
    name: [{ required: true, message: "请输入文章名", trigger: "blur" }],
  });

  const createArticle = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 验证通过，创建文章
        await createArticleApi(form.value);
        toast.success("创建成功");
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const updateArticle = async (
    formEl: FormInstance | undefined,
    id: number,
  ) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 验证通过，更新文章
        updateArticleApi(id, form.value);
        toast.success("更新成功");
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const handleUploadSuccess = (
    res: ICommonResponse<IUploadFileResponse>,
    _: any,
    key: keyof ICreateArticle,
  ) => {
    console.log(res);
    // 上传成功后，将图片地址赋值给form.homeFirstImg、form.homeSecondImg、form.homeVide
    (form.value![key] as any) = res.data.url;
  };

  return {
    ruleFormRef,
    form,
    rules,
    createArticle,
    updateArticle,
    handleUploadSuccess,
  };
};

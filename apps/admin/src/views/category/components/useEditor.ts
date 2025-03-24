import type { FormInstance, FormRules } from "element-plus";
import type { ICreateCategory } from "@qinfeng/types";
import { createCategoryApi, updateCategoryApi } from "@/api/modules/category";
import { EntityCommonStatus } from "@qinfeng/types";
import { toast } from "vue-sonner";

export const useEditor = () => {
  const ruleFormRef = ref<FormInstance>();
  const form = ref<ICreateCategory>({
    status: EntityCommonStatus.enable,
  } as ICreateCategory);

  const rules = ref<FormRules<ICreateCategory>>({
    name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
  });

  const createCategory = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 验证通过，创建分类
        await createCategoryApi(form.value);
        toast.success("创建成功");
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  const updateCategory = async (
    formEl: FormInstance | undefined,
    id: number,
  ) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 验证通过，更新分类
        updateCategoryApi(id, form.value);
        toast.success("更新成功");
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  return {
    ruleFormRef,
    form,
    rules,
    createCategory,
    updateCategory,
  };
};

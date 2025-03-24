<template>
  <el-dialog v-model="dialogVisible" :title="title" width="60%">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item label="分类名" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名" />
      </el-form-item>
      <el-form-item label="分类描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入分类描述" />
      </el-form-item>
      <el-form-item label="分类状态" prop="status">
        <el-select
          v-model="form.status"
          placeholder="Select"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button @click="handleConfirm">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { DialogOptionType } from "@qinfeng/types";
import { statusOptions } from "@qinfeng/types";
import { useEditor } from "./useEditor";
import { getCategoryDetailApi } from "@/api/modules/category";

const { form, rules, ruleFormRef, createCategory, updateCategory } =
  useEditor();

const emits = defineEmits<{
  (e: "createSuccess"): void;
  (e: "updateSuccess"): void;
}>();

const dialogVisible = ref(false);

const optionType = ref<DialogOptionType>("add");
let categoryId: number | undefined;

const title = computed(() => {
  if (optionType.value === "add") {
    return "新增分类";
  } else {
    return "编辑分类";
  }
});

const getCategoryInfo = async (id: number) => {
  const { data: res } = await getCategoryDetailApi(id);
  if (res) {
    form.value = res;
  }
};

const handleClose = () => {
  dialogVisible.value = false;
};

const handleConfirm = async () => {
  if (optionType.value === "edit" && categoryId) {
    await updateCategory(ruleFormRef.value, categoryId);
    emits("updateSuccess");
  } else {
    await createCategory(ruleFormRef.value);
    emits("createSuccess");
  }
  handleClose();
};

const resetForm = async (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};

defineExpose({
  show(newOptionType: DialogOptionType, id?: number) {
    if (newOptionType === "edit") {
      categoryId = id;
      getCategoryInfo(id!);
    }
    optionType.value = newOptionType;
    dialogVisible.value = true;
  },
});
</script>

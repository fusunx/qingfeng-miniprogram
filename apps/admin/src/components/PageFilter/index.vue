<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    label-width="auto"
    class="demo-ruleForm"
    size="default"
    status-icon
    :inline="true"
  >
    <el-form-item label="分类id" prop="id">
      <el-input-number v-model="form.id" placeholder="请输入分类id" />
    </el-form-item>
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入分类名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        搜索
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button @click="create">创建</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import type { ICommonFilterPage } from "@qinfeng/types";
const ruleFormRef = ref<FormInstance>();
const form = ref<ICommonFilterPage>({} as ICommonFilterPage);

const emits = defineEmits(["create", "submit"]);

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits("submit", form.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 创建
const create = () => {
  emits("create");
};
</script>

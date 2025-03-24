<template>
  <el-dialog
    body-class="max-h-70vh overflow-y-scroll"
    v-model="dialogVisible"
    :title="title"
    width="60%"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item label="文章名" prop="name">
        <el-input v-model="form.name" placeholder="请输入文章名" />
      </el-form-item>
      <el-form-item label="文章图片" prop="listImg">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="uploadHeaders"
          :on-success="(res, file) => handleUploadSuccess(res, file, 'img')"
        >
          <img v-if="form.img" :src="form.img" class="w-20 h-20 mr-4" />
          <el-button type="primary"> 上传商品列表图片 </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="description">
        <div class="min-h-50vh w-full">
          <QuillEditor
            v-model:content="form.content"
            contentType="html"
            theme="snow"
            :options="editorOptions"
            style="height: 50vh; width: 100%"
          />
        </div>
      </el-form-item>
      <el-form-item label="文章状态" prop="status">
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
import { getArticleDetailApi } from "@/api/modules/article";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getTokenConfig } from "@/api";

// 上传请求头
const uploadHeaders = getTokenConfig();
// 上传地址
const uploadUrl = "/api/admin/upload";

const {
  form,
  rules,
  ruleFormRef,
  createArticle,
  updateArticle,
  handleUploadSuccess,
} = useEditor();

const emits = defineEmits<{
  (e: "createSuccess"): void;
  (e: "updateSuccess"): void;
}>();

const dialogVisible = ref(false);

const optionType = ref<DialogOptionType>("add");
let categoryId: number | undefined;

const editorOptions = {
  modules: {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  },
  placeholder: "开始编辑...",
};

const title = computed(() => {
  if (optionType.value === "add") {
    return "新增文章";
  } else {
    return "编辑文章";
  }
});

const getArticleInfo = async (id: number) => {
  const { data: res } = await getArticleDetailApi(id);
  if (res) {
    form.value = res;
  }
};

const handleClose = () => {
  dialogVisible.value = false;
};

const handleConfirm = async () => {
  if (optionType.value === "edit" && categoryId) {
    await updateArticle(ruleFormRef.value, categoryId);
    emits("updateSuccess");
  } else {
    await createArticle(ruleFormRef.value);
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
      getArticleInfo(id!);
    }
    optionType.value = newOptionType;
    dialogVisible.value = true;
  },
});
</script>

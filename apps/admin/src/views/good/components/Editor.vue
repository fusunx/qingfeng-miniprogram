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
      <el-form-item label="商品名" prop="name">
        <el-input v-model="form.name" placeholder="请输入商品名" />
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入商品描述" />
      </el-form-item>
      <el-form-item label="商品状态" prop="status">
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
      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model="form.price" placeholder="请输入商品价格" />
      </el-form-item>
      <el-form-item label="商品销量" prop="sales">
        <el-input-number v-model="form.sales" placeholder="请输入商品销量" />
      </el-form-item>
      <el-form-item label="商品列表图片" prop="listImg">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="uploadHeaders"
          :on-success="(res, file) => handleUploadSuccess(res, file, 'listImg')"
        >
          <img v-if="form.listImg" :src="form.listImg" class="w-20 h-20 mr-4" />
          <el-button type="primary"> 上传商品列表图片 </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情图片" prop="detailImg">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="uploadHeaders"
          :on-success="
            (res, file) => handleUploadSuccess(res, file, 'detailImg')
          "
        >
          <img
            v-if="form.detailImg"
            :src="form.detailImg"
            class="w-20 h-20 mr-4"
          />
          <el-button type="primary"> 上传商品详情图片 </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-select
          v-model="form.category"
          placeholder="输入商品分类名搜索"
          filterable
          remote
          size="large"
          style="width: 240px"
          :remote-method="remoteMethod"
          :loading="selectLoading"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品轮播图">
        <el-upload
          v-model:file-list="fileList"
          multiple
          :action="uploadUrl"
          :headers="uploadHeaders"
          :limit="7"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品表格数据">
        <div v-for="(_, index) in detailTable" :key="index" class="flex mt-2">
          <el-input
            class="mr-2"
            v-model="detailTable[index].label"
            placeholder="请输入表格名"
          />
          <el-input
            class="mr-2"
            v-model="detailTable[index].value"
            placeholder="请输入表格值"
          />
        </div>
        <el-button
          type="primary"
          @click="
            detailTable.push(JSON.parse(JSON.stringify(defaultGoodMapData)))
          "
        >
          添加一行
        </el-button>
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
import { getTokenConfig } from "@/api";
import type { DialogOptionType, IStatusOption } from "@qinfeng/types";
import { statusOptions } from "@qinfeng/types";
import { useEditor } from "./useEditor";
import { getGoodDetailApi } from "@/api/modules/good";
import { getCategoryListApi } from "@/api/modules/category";

// 上传请求头
const uploadHeaders = getTokenConfig();
// 上传地址
const uploadUrl = "/api/admin/upload";

const selectLoading = ref(false);

const {
  form,
  rules,
  ruleFormRef,
  detailTable,
  defaultGoodMapData,
  fileList,
  createGood,
  updateGood,
  handleUploadSuccess,
} = useEditor();

const emits = defineEmits<{
  (e: "createSuccess"): void;
  (e: "updateSuccess"): void;
}>();

const dialogVisible = ref(false);

const optionType = ref<DialogOptionType>("add");
let categoryId: number | undefined;

const title = computed(() => {
  if (optionType.value === "add") {
    return "新增商品";
  } else {
    return "编辑商品";
  }
});

const getGoodInfo = async (id: number) => {
  const { data: res } = await getGoodDetailApi(id);
  if (res) {
    form.value = res;
  }
};

const handleClose = () => {
  dialogVisible.value = false;
};

const handleConfirm = async () => {
  const swiperImgs = fileList.value.map((item) => item.url!);
  const reqData = {
    ...form.value,
    swiperImgs: swiperImgs,
    detailTable: detailTable.value,
  };
  if (optionType.value === "edit" && categoryId) {
    await updateGood(ruleFormRef.value, categoryId, reqData);
    emits("updateSuccess");
  } else {
    await createGood(ruleFormRef.value, reqData);
    emits("createSuccess");
  }
  handleClose();
};

const resetForm = async (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};

const categoryList = ref<IStatusOption[]>([]);
const remoteMethod = async (query: string) => {
  if (query) {
    selectLoading.value = true;
    const { data: res } = await getCategoryListApi({
      page: 1,
      pageSize: 100,
      name: query,
    });
    selectLoading.value = false;
    categoryList.value = res.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }
};

defineExpose({
  show(newOptionType: DialogOptionType, id?: number) {
    if (newOptionType === "edit") {
      categoryId = id;
      getGoodInfo(id!);
    }
    optionType.value = newOptionType;
    dialogVisible.value = true;
  },
});
</script>

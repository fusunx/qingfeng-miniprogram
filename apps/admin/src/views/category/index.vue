<template>
  <div>
    <el-container>
      <el-header class="bg-white !pt-4">
        <PageFilter @create="createCategory" @submit="onSubmit" />
      </el-header>
      <el-main class="bg-white mt-4 min-h-50vh">
        <el-table :data="tableData" class="min-h-50vh w-full">
          <el-table-column prop="id" label="id" width="180" />
          <el-table-column prop="name" label="分类名" width="180" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="createdAt" label="创建时间" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="handleUpdate(scope.row.id)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="tableTotal"
            v-model:current-page="page"
          />
        </div>
      </el-main>
    </el-container>
    <Editor
      ref="editorRef"
      @create-success="handleCreateSuccess"
      @update-success="getCategoryList"
    />
  </div>
</template>
<script setup lang="ts">
import PageFilter from "@/components/PageFilter/index.vue";
import Editor from "./components/Editor.vue";
import type { ICommonFilterPage, ICategoryDetail } from "@qinfeng/types";
import { getCategoryListApi } from "@/api/modules/category";
import dayjs from "dayjs";

const editorRef = ref<InstanceType<typeof Editor>>();

const tableData = ref<ICategoryDetail[]>([]);
const tableTotal = ref(0);
const page = ref(1);
let pageSize = 10;

// 获取分类列表
const getCategoryList = async (form?: ICommonFilterPage) => {
  form = form || ({} as ICommonFilterPage);
  form.page = page.value;
  form.pageSize = pageSize;
  const { data: res } = await getCategoryListApi(form);

  tableTotal.value = res.total;
  tableData.value = res.data.map((item) => {
    return {
      ...item,
      createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
};

// 提交表单
const onSubmit = async (form: ICommonFilterPage) => {
  form.page = page.value;
  form.pageSize = pageSize;
  await getCategoryList(form);
};

// 创建成功
const handleCreateSuccess = () => {
  page.value = 1;
  getCategoryList();
};

// 创建分类
const createCategory = () => {
  editorRef.value?.show("add");
};

// 编辑分类
const handleUpdate = (id: number) => {
  editorRef.value?.show("edit", id);
};

// 监听分页参数变化（可选方式1：使用 watch）
watch([page], ([newPage]) => {
  page.value = newPage;
  getCategoryList();
});

getCategoryList();
</script>

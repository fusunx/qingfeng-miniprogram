<template>
  <div>
    <el-container>
      <el-header class="bg-white !pt-4">
        <PageFilter @create="createArticle" @submit="onSubmit" />
      </el-header>
      <el-main class="bg-white mt-4 min-h-50vh">
        <el-table :data="tableData" class="min-h-50vh w-full">
          <el-table-column prop="id" label="id" width="180" />
          <el-table-column prop="name" label="文章名" width="180" />
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
      @update-success="getArticleList"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import PageFilter from "@/components/PageFilter/index.vue";
import Editor from "./components/Editor.vue";
import type { ICommonFilterPage, IArticleDetail } from "@qinfeng/types";
import { getArticleListApi } from "@/api/modules/article";
import dayjs from "dayjs";

const editorRef = ref<InstanceType<typeof Editor>>();

const tableData = ref<IArticleDetail[]>([]);
const tableTotal = ref(0);
const page = ref(1);
let pageSize = 10;

// 获取文章列表
const getArticleList = async (form?: ICommonFilterPage) => {
  form = form || ({} as ICommonFilterPage);
  form.page = page.value;
  form.pageSize = pageSize;
  const { data: res } = await getArticleListApi(form);

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
  await getArticleList(form);
};

// 创建成功
const handleCreateSuccess = () => {
  page.value = 1;
  getArticleList();
};

// 创建文章
const createArticle = () => {
  editorRef.value?.show("add");
};

// 编辑文章
const handleUpdate = (id: number) => {
  editorRef.value?.show("edit", id);
};

// 监听分页参数变化（可选方式1：使用 watch）
watch([page], ([newPage]) => {
  page.value = newPage;
  getArticleList();
});

getArticleList();
</script>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import type {
  IPageConfig,
  ICommonResponse,
  IUploadFileResponse,
} from "@qinfeng/types";
import { getTokenConfig } from "@/api";
import { setPageConfig, getPageConfig } from "@/api/modules/page";
import { usePageSetting } from "./hooks";
import { toast } from "vue-sonner";

const { defaultForm, formUploadItemOptions, homeFirstImg } = usePageSetting();

const ruleFormRef = ref<FormInstance>();
const form = ref<Omit<IPageConfig, "homeFirstImg">>(defaultForm);

// 上传请求头
const uploadHeaders = getTokenConfig();
// 上传地址
const uploadUrl = "/api/admin/upload";

const rules = ref<FormRules<IPageConfig>>({
  homeSecondImg: [
    { required: true, message: "请上传首页第二张图片", trigger: "blur" },
  ],
  homeVideo: [{ required: true, message: "请上传首页视频", trigger: "blur" }],
  experienceTopImg: [
    { required: true, message: "请上传体验顶部图片", trigger: "blur" },
  ],
  policyTopImg: [
    { required: true, message: "请上传政策顶部图片", trigger: "blur" },
  ],
});

const handleUploadSuccess = (
  res: ICommonResponse<IUploadFileResponse>,
  _: any,
  key: keyof Omit<IPageConfig, "homeFirstImg">,
) => {
  console.log(res);

  // 上传成功后，将图片地址赋值给form.homeFirstImg、form.homeSecondImg、form.homeVide
  form.value![key] = res.data.url;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const swiperImgs = homeFirstImg.value.map(
        (item) => (item?.response as any)?.data?.url,
      );

      console.log(swiperImgs);
      setPageConfig({ ...form.value!, homeFirstImg: swiperImgs }).then(() => {
        toast.success("修改成功");
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const init = () => {
  getPageConfig().then((res) => {
    form.value = res.data;
    homeFirstImg.value = res.data.homeFirstImg.map((item) => ({
      name: item,
      url: item,
    }));
  });
};
init();
</script>

<template>
  <div class="min-h-500px w-full p-4">
    <el-card class="w-full flex justify-center items-center py-8">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <el-form-item label="首页第一张图片" prop="homeFirstImg" required>
          <el-upload
            v-model:file-list="homeFirstImg"
            multiple
            :action="uploadUrl"
            :headers="uploadHeaders"
            :limit="7"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in formUploadItemOptions"
          :key="index"
          :label="item.label"
          :prop="item.key"
          required
        >
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-success="
              (res, file) => handleUploadSuccess(res, file, item.key)
            "
          >
            <video
              v-if="item.key === 'homeVideo' && form[item.key]"
              :src="form[item.key]"
              class="w-20 h-20 mr-4"
            />
            <img
              v-if="
                item.key !== 'homeVideo' && form[item.key as keyof typeof form]
              "
              :src="form[item.key] as string"
              class="w-20 h-20 mr-4"
            />
            <el-button type="primary"> 上传 </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            确认
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/shadcn/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

defineOptions({
  name: "LoginForm",
});

const props = defineProps<{
  account?: string;
}>();

const emits = defineEmits<{
  onLogin: [account?: string];
  onRegister: [account?: string];
  onResetPassword: [account?: string];
}>();

const userStore = useUserStore();

const title = import.meta.env.VITE_APP_TITLE;
const loading = ref(false);

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      account: z.string().min(1, "请输入用户名"),
      password: z.string().min(1, "请输入密码"),
      remember: z.boolean(),
    }),
  ),
  initialValues: {
    account: props.account ?? localStorage.getItem("login_account") ?? "",
    password: "",
    remember: !!localStorage.getItem("login_account"),
  },
});
const onSubmit = form.handleSubmit((values) => {
  loading.value = true;
  userStore
    .login(values)
    .then(() => {
      if (values.remember) {
        localStorage.setItem("login_account", values.account);
      } else {
        localStorage.removeItem("login_account");
      }
      emits("onLogin", values.account);
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <div class="min-h-500px w-full flex-col-stretch-center p-12">
    <div class="mb-6 space-y-2">
      <h3 class="text-4xl color-[var(--el-text-color-primary)] font-bold">
        欢迎使用 👋🏻
      </h3>
      <p class="text-sm text-muted-foreground lg:text-base">
        {{ title }}
      </p>
    </div>
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField, errors }" name="account">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput
              type="text"
              placeholder="请输入用户名"
              class="w-full"
              :class="errors.length && 'border-destructive'"
              v-bind="componentField"
            />
          </FormControl>
          <Transition
            enter-active-class="transition-opacity"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity"
            leave-to-class="opacity-0"
          >
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, errors }" name="password">
        <FormItem class="relative pb-6 space-y-0">
          <FormControl>
            <FaInput
              type="password"
              placeholder="请输入密码"
              class="w-full"
              :class="errors.length && 'border-destructive'"
              v-bind="componentField"
            />
          </FormControl>
          <Transition
            enter-active-class="transition-opacity"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity"
            leave-to-class="opacity-0"
          >
            <FormMessage class="absolute bottom-1 text-xs" />
          </Transition>
        </FormItem>
      </FormField>
      <div class="mb-4 flex-center-between">
        <div class="flex-center-start">
          <FormField
            v-slot="{ componentField }"
            type="checkbox"
            name="remember"
          >
            <FormItem>
              <FormControl>
                <FaCheckbox v-bind="componentField"> 记住我 </FaCheckbox>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>
      <FaButton :loading="loading" size="lg" class="w-full" type="submit">
        登录
      </FaButton>
    </form>
  </div>
</template>

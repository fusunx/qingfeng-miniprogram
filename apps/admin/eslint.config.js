import antfu from "@antfu/eslint-config";

export default {
  extends: [
    antfu(
      {
        unocss: true,
        ignores: ["public", "dist*", "src/ui/shadcn/ui"],
      },
      {
        rules: {
          "eslint-comments/no-unlimited-disable": "off",
          curly: ["error", "all"],
          "ts/no-unused-expressions": [
            "error",
            {
              allowShortCircuit: true,
              allowTernary: true,
            },
          ],
        },
      },
      {
        files: ["src/**/*.vue"],
        rules: {
          "vue/block-order": [
            "error",
            {
              order: ["route", "script", "template", "style"],
            },
          ],
        },
      },
    ), // 或者 '@antfu/eslint-config'
  ],
  rules: {
    // 在这里覆盖你想改的规则
    "no-console": "off",
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};

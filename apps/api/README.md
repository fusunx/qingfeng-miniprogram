## 生成 migration 命令

npx ts-node --project ./tsconfig.json -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate ./src/migrations/init -d ./src/data-source.ts

## 执行 migration 命令

需要确保项目已编译为 JavaScript 文件

```
npx typeorm migration:run -d dist/data-source.js

```

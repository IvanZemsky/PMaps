import pluginVitest from "@vitest/eslint-plugin"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"
import pluginVue from "eslint-plugin-vue"
import { globalIgnores } from "eslint/config"

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
   {
      name: "app/files-to-lint",
      files: ["**/*.{ts,mts,tsx,vue}"],
      //  globalIgnores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],  // moved to defineConfigWithVueTs
   },
   globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]), //Игнорирование для глобальных файлов

   pluginVue.configs["flat/essential"],
   vueTsConfigs.recommended,

   {
      ...pluginVitest.configs.recommended,
      files: ["src/**/__tests__/*"],
   },

   {
      rules: {
         "@typescript-eslint/no-unused-vars": [
            "warn",
            {
               args: "all",
               argsIgnorePattern: "^_",
               caughtErrorsIgnorePattern: "^_",
               destructuredArrayIgnorePattern: "^_",
               varsIgnorePattern: "^_",
               ignoreRestSiblings: true,
            },
         ],
      },
   },
   skipFormatting,
)

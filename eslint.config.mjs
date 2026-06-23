import pluginVue from "eslint-plugin-vue"
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript"
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting"

// Flat config (ESLint 9). Replaces the legacy .eslintrc.cjs and wires up
// vue-eslint-parser + typescript-eslint so <script setup lang="ts"> is
// actually type-aware linted (the old config never enabled this).
export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{ts,mts,tsx,vue}"],
    },

    {
        name: "app/files-to-ignore",
        ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**", "public/**"],
    },

    pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended,
    skipFormatting,

    {
        rules: {
            "vue/multi-word-component-names": "off",
        },
    },
)

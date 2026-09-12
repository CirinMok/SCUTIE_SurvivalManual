<script setup lang="ts">
import { withBase } from 'vitepress'

/**
 * 首页「前提」卡片。
 * 用 Vue 组件而不是裸 HTML <a>，是因为 VitePress 只会给 markdown 链接
 * 自动加部署前缀（base），裸 HTML 的 href 不会——写成组件才能跟随
 * config.mts 里的 base 自动变化，换仓库名或绑自定义域名时不会全站 404。
 */
defineProps<{
  href: string
  index?: string
  title: string
}>()
</script>

<template>
  <a class="scut-card" :href="withBase(href)">
    <span v-if="index" class="card-index">{{ index }}</span>
    <div class="card-title">{{ title }}</div>
    <div class="card-desc"><slot /></div>
  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

/**
 * 首页校训条外壳。传 href 时整条变成内部链接。
 * 裸 HTML <a> 的 href 不会自动加部署前缀（理由见 ScutCard 注释），
 * 所以跳转链接必须经 withBase 包一层。
 */
defineProps<{ href?: string }>()
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    class="scut-motto-inner"
    :class="{ 'is-link': !!href }"
    :href="href ? withBase(href) : undefined"
  >
    <slot />
  </component>
</template>

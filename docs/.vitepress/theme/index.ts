import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ScutCard from './components/ScutCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册，这样 index.md 里可以直接写 <ScutCard ... />
    app.component('ScutCard', ScutCard)
  },
} satisfies Theme

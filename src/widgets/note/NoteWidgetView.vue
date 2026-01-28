<script lang="ts" setup>
import { useWidget, useWidgetStorage } from '@widget-js/vue3'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

useWidget()
const { t } = useI18n()
// initialize default content from i18n so it respects current locale
const note = useWidgetStorage('note-1', t('note.instructions'))
// Persist font size so it is remembered across sessions
const fontSize = useWidgetStorage('fontSize-1', 20)

// ref for the page element so we can attach a non-passive wheel listener
const pageRef = ref<HTMLElement | null>(null)

function onWheel(e: WheelEvent) {
  // When Ctrl is held, use wheel to change font size instead of scrolling/zooming
  if (e.ctrlKey) {
    // Prevent browser zoom / default behavior
    e.preventDefault()
    e.stopPropagation()

    // Simple step change: wheel up (deltaY < 0) -> increase, wheel down -> decrease
    const change = e.deltaY < 0 ? 1 : -1
    const current = Number(fontSize.value) || 20
    const next = Math.min(120, Math.max(10, current + change))
    fontSize.value = next
  }
}

onMounted(() => {
  if (pageRef.value) {
    // ensure listener is non-passive so preventDefault works
    pageRef.value.addEventListener('wheel', onWheel as EventListener, { passive: false })
  }
})

onUnmounted(() => {
  if (pageRef.value) {
    pageRef.value.removeEventListener('wheel', onWheel as EventListener)
  }
})
</script>

<template>
  <widget-wrapper>
    <!-- attach wheel handler to the page container via non-passive listener -->
    <div ref="pageRef" class="page">
      <span class="margin" />
      <!-- bind font size to textarea via inline style -->
      <textarea v-model="note" :style="{ fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.1}px` }" />
    </div>
  </widget-wrapper>
</template>

<style scoped>
.content {
  padding: 1rem;
  color: var(--widget-color);
}

.page {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  background-image: linear-gradient(#f5f5f0 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;
  line-height: 1.2rem;
  padding: 1.4rem 0.5rem 0.3rem 3.5rem;
}

.page:hover::before,
.page:hover::after {
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.4);
}

.margin {
  position: absolute;
  border-left: 1px solid #d88;
  height: 100%;
  left: 2rem;
  top: 0;
}

.page textarea {
  margin: 0;
  font-family: cursive;
  padding-bottom: 1.2rem;
  /* font-size is controlled via inline style bound to `fontSize` */
  color: black;
  line-height: 20px;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  height: 100%;
  overflow: auto; /* ensure scrolling when content overflows */
  padding-right: 0.6rem; /* give space for the custom scrollbar */
}

/* WebKit-based browsers (Chrome, Edge, Safari) */
.page textarea::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.page textarea::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}

.page textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.12));
  border-radius: 10px;
  border: 2px solid rgba(255,255,255,0.35);
  backdrop-filter: blur(4px);
  transition: background 0.18s ease, opacity 0.18s ease;
  opacity: 0.9;
}

.page textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(0,0,0,0.34), rgba(0,0,0,0.18));
}

/* Slightly more visible when hovering the page */
.page:hover textarea::-webkit-scrollbar-thumb {
  opacity: 1;
}
</style>

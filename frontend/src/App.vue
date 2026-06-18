<script setup lang="ts">
/**
 * Interactive File Tree Demo Application
 * Showcases the FileTreeView component with sample data
 */
import { computed } from 'vue';
import { Monitor, Sun, Moon } from 'lucide-vue-next';
import FileTreeView from './components/FileTreeView.vue';
import { useTheme } from './composables/useTheme';

const { preference, cycleTheme } = useTheme();

const themeIcon = computed(() => {
  if (preference.value === 'light') return Sun;
  if (preference.value === 'dark') return Moon;
  return Monitor;
});

const themeLabel = computed(() => {
  if (preference.value === 'light') return 'Light theme';
  if (preference.value === 'dark') return 'Dark theme';
  return 'System theme';
});
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <button
        class="theme-toggle"
        type="button"
        :title="`${themeLabel} (click to change)`"
        :aria-label="`${themeLabel}, click to change`"
        @click="cycleTheme"
      >
        <component :is="themeIcon" :size="18" />
        <span>{{ themeLabel }}</span>
      </button>
      <h1>Interactive File Tree</h1>
      <p>A drag-and-drop enabled file browser component built with Vue 3 + TypeScript</p>
    </header>
    <main class="app-main">
      <FileTreeView />
    </main>
    <footer class="app-footer">
      <p>
        <strong>Features:</strong>
        Click to select | Double-click to expand folders | Drag and drop to reorganize |
        Use toolbar buttons to create files/folders
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
}

.app-header {
  position: relative;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.theme-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.25);
}

@media (max-width: 480px) {
  .theme-toggle span {
    display: none;
  }
}

.app-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
}

.app-header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.app-main > :deep(.file-tree-view) {
  flex: 1;
  min-height: 400px;
}

.app-footer {
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  color: #6b7280;
  font-size: 13px;
}

.app-footer p {
  margin: 0;
}

.app-footer strong {
  color: #374151;
}
</style>

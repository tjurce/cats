<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :title="isDark ? 'Svjetla tema' : 'Tamna tema'"
  >
    <span class="icon">{{ isDark ? "☀️" : "🌙" }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStore } from "@/stores/themeStore";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style lang="scss" scoped>
.theme-toggle {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  &:hover {
    transform: scale(1.1) rotate(15deg);
    border-color: var(--blue-primary);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  .icon {
    font-size: 20px;
    transition: transform 0.3s ease;

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
}
</style>

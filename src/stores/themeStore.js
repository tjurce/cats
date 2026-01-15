import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    isDark: false,
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },

    initTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.isDark = savedTheme === "dark";
      } else {
        // Check system preference
        this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      this.applyTheme();
    },

    applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.add("dark-theme");
      } else {
        document.documentElement.classList.remove("dark-theme");
      }
    },
  },
});

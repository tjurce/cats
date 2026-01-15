<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo-icon">🐱</div>
        <div class="logo-text">
          <h1>Mačji Azil</h1>
          <p class="tagline">Pronađi svog savršenog mačića</p>
        </div>
      </div>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<style lang="scss" scoped>
.app-header {
  background: var(--card-bg);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    position: relative;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
      padding: 12px 20px;
    }

    @media (max-width: 480px) {
      padding: 10px 16px;
    }
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 480px) {
      gap: 10px;
    }

    .logo-icon {
      font-size: 32px;

      @media (max-width: 480px) {
        font-size: 28px;
      }
    }

    .logo-text {
      h1 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        color: var(--text-primary);
        letter-spacing: -0.3px;
        transition: color 0.3s ease;

        @media (max-width: 768px) {
          font-size: 20px;
        }

        @media (max-width: 480px) {
          font-size: 18px;
        }
      }

      .tagline {
        margin: 2px 0 0;
        font-size: 12px;
        color: var(--text-secondary);
        font-weight: 400;
        transition: color 0.3s ease;

        @media (max-width: 480px) {
          font-size: 11px;
        }
      }
    }
  }
}
</style>

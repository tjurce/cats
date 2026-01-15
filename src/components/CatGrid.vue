<template>
  <main class="grid-section">
    <div class="kitten-grid">
      <CatCard
        v-for="cat in cats"
        :key="cat.id"
        :cat="cat"
        @adopt="$emit('adopt', cat)"
      />
    </div>

    <button v-if="hasMore" @click="$emit('loadMore')" class="load-more">
      Prikaži više
    </button>
  </main>
</template>

<script setup>
import CatCard from "@/components/CatCard.vue";

defineProps({
  cats: {
    type: Array,
    required: true,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["adopt", "loadMore"]);
</script>

<style lang="scss" scoped>
.grid-section {
  flex-grow: 1;

  .kitten-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
    margin-bottom: 32px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    @media (max-width: 640px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    @media (max-width: 360px) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 28px;
    }
  }

  .load-more {
    display: block;
    margin: 32px auto 40px;
    padding: 14px 40px;
    background: linear-gradient(
      135deg,
      var(--blue-primary) 0%,
      var(--blue-hover) 100%
    );
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      margin: 24px auto 32px;
      padding: 12px 32px;
      font-size: 15px;
    }

    @media (max-width: 480px) {
      width: 100%;
      padding: 12px 24px;
      font-size: 14px;
      margin: 20px 0 24px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);

      @media (max-width: 768px) {
        transform: translateY(-1px);
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
    }
  }
}
</style>

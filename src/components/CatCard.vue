<template>
  <div class="card">
    <div class="card-img">
      <img :src="`/img/${cat.name}.jpg`" :alt="cat.name" loading="lazy" />
    </div>
    <div class="card-info">
      <h4>{{ cat.name }}</h4>
      <p>{{ cat.months }} mj. | {{ cat.color }}</p>
      <button @click="$emit('adopt', cat)">Udomi</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cat: {
    type: Object,
    required: true,
  },
});

defineEmits(["adopt"]);
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.3s;
  background: var(--card-bg);

  @media (max-width: 480px) {
    border-radius: 6px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      transform: translateY(-2px);
    }
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;

    @media (max-width: 1024px) {
      height: 180px;
    }

    @media (max-width: 768px) {
      height: 160px;
    }

    @media (max-width: 480px) {
      height: 140px;
    }
  }

  .card-info {
    padding: 10px;

    @media (max-width: 768px) {
      padding: 8px;
    }

    @media (max-width: 480px) {
      padding: 6px;
    }

    h4 {
      margin: 0 0 8px 0;
      font-size: 16px;
      color: var(--text-primary);
      transition: color 0.3s ease;

      @media (max-width: 768px) {
        font-size: 15px;
        margin-bottom: 6px;
      }

      @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 4px;
      }
    }

    p {
      margin: 0 0 10px 0;
      color: var(--text-secondary);
      font-size: 14px;
      transition: color 0.3s ease;

      @media (max-width: 768px) {
        font-size: 13px;
        margin-bottom: 8px;
      }

      @media (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 6px;
      }
    }

    button {
      width: 100%;
      padding: 8px;
      background-color: var(--blue-primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;

      @media (max-width: 480px) {
        padding: 6px;
        font-size: 13px;
      }

      &:hover {
        background-color: var(--blue-hover);
      }
    }
  }
}
</style>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>{{ cat?.name }}</h2>
        <p>Boja: {{ cat?.color }}</p>
        <p>Starost: {{ cat?.months }} mjeseci</p>
        <button @click="$emit('adopt', cat)">Udomi me!</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  cat: {
    type: Object,
    default: null,
  },
});

defineEmits(["close", "adopt"]);
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  transition: background-color 0.3s ease;

  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: var(--text-secondary);
    transition: color 0.3s ease;

    &:hover {
      color: var(--text-primary);
    }
  }

  h2 {
    margin-top: 0;
    color: var(--text-primary);
    transition: color 0.3s ease;
  }

  p {
    color: var(--text-secondary);
    transition: color 0.3s ease;
  }

  button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: var(--blue-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: var(--blue-hover);
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

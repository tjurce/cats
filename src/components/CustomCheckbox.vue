<template>
  <label class="custom-checkbox">
    <span class="label-text">{{ label }}</span>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.custom-checkbox {
  display: block;
  position: relative;
  padding: 12px 12px 12px 42px;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 15px;
  border: 2px solid transparent;

  @media (max-width: 480px) {
    padding: 10px 10px 10px 38px;
    font-size: 14px;
  }

  &:hover {
    background-color: var(--hover-bg-alt);
    border-color: var(--blue-light);

    .checkmark {
      background: linear-gradient(
        135deg,
        var(--blue-light) 0%,
        var(--blue-lighter) 100%
      );
      border-color: var(--blue-primary);
      transform: translateY(-50%) scale(1.05);
    }
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      background: linear-gradient(
        135deg,
        var(--blue-primary) 0%,
        var(--blue-dark) 100%
      );
      border-color: var(--blue-primary);
      box-shadow: 0 2px 8px rgba(33, 150, 243, 0.4);

      &:before {
        transform: translateY(-50%) rotate(180deg);
        opacity: 1;
      }

      &:after {
        transform: translate(-50%, -50%) scale(1) rotate(45deg);
        opacity: 1;
      }
    }

    &:checked ~ .label-text {
      color: var(--blue-primary);
      font-weight: 600;
    }
  }

  .checkmark {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    height: 24px;
    width: 24px;
    background: linear-gradient(
      135deg,
      var(--card-bg) 0%,
      var(--hover-bg) 100%
    );
    border: 2.5px solid #ddd;
    border-radius: 6px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    @media (max-width: 480px) {
      left: 10px;
      height: 22px;
      width: 22px;
      border-width: 2px;
    }

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      width: 10px;
      height: 10px;
      background: radial-gradient(
        circle,
        var(--blue-primary) 0%,
        transparent 70%
      );
      border-radius: 50%;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0) rotate(45deg);
      width: 6px;
      height: 11px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform-origin: center;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      opacity: 0;

      @media (max-width: 480px) {
        width: 5px;
        height: 10px;
        border-width: 0 2.5px 2.5px 0;
      }
    }
  }

  .label-text {
    transition: all 0.3s ease;
  }
}
</style>

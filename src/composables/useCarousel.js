import { ref, computed, onMounted, onUnmounted } from "vue";

export function useCarousel(items) {
  const activeIndex = ref(0);
  let intervalId = null;

  const activeSlideData = computed(
    () => items.value[activeIndex.value] || null
  );

  const leftSlideData = computed(() => {
    const leftIndex =
      (activeIndex.value - 1 + items.value.length) % items.value.length;
    return items.value[leftIndex] || null;
  });

  const rightSlideData = computed(() => {
    const rightIndex = (activeIndex.value + 1) % items.value.length;
    return items.value[rightIndex] || null;
  });

  const nextSlide = () => {
    activeIndex.value = (activeIndex.value + 1) % items.value.length;
  };

  const prevSlide = () => {
    activeIndex.value =
      (activeIndex.value - 1 + items.value.length) % items.value.length;
  };

  const startCarousel = () => {
    intervalId = setInterval(nextSlide, 3000);
  };

  const pauseCarousel = () => {
    clearInterval(intervalId);
  };

  onMounted(() => {
    startCarousel();
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return {
    activeSlideData,
    leftSlideData,
    rightSlideData,
    nextSlide,
    prevSlide,
    startCarousel,
    pauseCarousel,
  };
}

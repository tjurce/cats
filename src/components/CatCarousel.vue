<template>
  <section class="carousel-section">
    <div
      class="carousel-wrapper"
      @mouseenter="pauseCarousel"
      @mouseleave="startCarousel"
    >
      <button class="nav-btn prev" @click="prevSlide">&lt;</button>

      <div class="slide side" v-if="leftSlideData" @click="prevSlide">
        <img
          :src="`/img/${leftSlideData.name}.jpg`"
          :alt="leftSlideData.name"
        />
      </div>

      <Transition name="slide-fade" mode="out-in">
        <div
          class="slide center"
          :key="activeSlideData?.id"
          v-if="activeSlideData"
          @click="$emit('slideClick', activeSlideData)"
        >
          <img
            :src="`/img/${activeSlideData.name}.jpg`"
            :alt="activeSlideData.name"
          />
          <h1 class="hero-name">{{ activeSlideData.name }}</h1>
        </div>
      </Transition>

      <div class="slide side" v-if="rightSlideData" @click="nextSlide">
        <img
          :src="`/img/${rightSlideData.name}.jpg`"
          :alt="rightSlideData.name"
        />
      </div>

      <button class="nav-btn next" @click="nextSlide">&gt;</button>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCarousel } from "@/composables/useCarousel";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

defineEmits(["slideClick"]);

const carouselItems = computed(() => props.items);

const {
  activeSlideData,
  leftSlideData,
  rightSlideData,
  nextSlide,
  prevSlide,
  startCarousel,
  pauseCarousel,
} = useCarousel(carouselItems);
</script>

<style lang="scss" scoped>
.carousel-section {
  overflow: hidden;
  padding: 40px 0;
  background: var(--bg-secondary);
  transition: background-color 0.3s ease;

  @media (max-width: 1024px) {
    padding: 30px 0;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
  }
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px;

  @media (max-width: 1024px) {
    gap: 15px;
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    padding: 0 40px;
  }

  @media (max-width: 640px) {
    padding: 0 30px;
  }

  .slide {
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &.side {
      flex: 0 0 300px;
      height: 250px;
      opacity: 0.6;
      filter: brightness(0.7);

      @media (max-width: 1024px) {
        flex: 0 0 220px;
        height: 200px;
      }

      @media (max-width: 768px) {
        flex: 0 0 150px;
        height: 150px;
      }

      @media (max-width: 640px) {
        display: none;
      }

      &:hover {
        opacity: 0.8;
        transform: scale(1.05);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    &.center {
      flex: 0 0 500px;
      height: 400px;
      z-index: 2;

      @media (max-width: 1024px) {
        flex: 0 0 400px;
        height: 320px;
      }

      @media (max-width: 768px) {
        flex: 0 0 300px;
        height: 250px;
      }

      @media (max-width: 640px) {
        flex: 0 0 calc(100vw - 100px);
        height: 280px;
      }

      @media (max-width: 480px) {
        flex: 0 0 calc(100vw - 80px);
        height: 220px;
      }

      &:hover {
        transform: scale(1.02);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .hero-name {
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: white;
        font-size: 4rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

        @media (max-width: 1024px) {
          font-size: 3rem;
          bottom: 15px;
          left: 15px;
        }

        @media (max-width: 768px) {
          font-size: 2.5rem;
          bottom: 12px;
          left: 12px;
        }

        @media (max-width: 480px) {
          font-size: 1.8rem;
          bottom: 10px;
          left: 10px;
        }
      }
    }
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(
      135deg,
      var(--blue-primary) 0%,
      var(--blue-dark) 100%
    );
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    z-index: 3;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    @media (max-width: 480px) {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }

    &:hover {
      background: linear-gradient(
        135deg,
        var(--blue-dark) 0%,
        var(--blue-darker) 100%
      );
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 16px rgba(33, 150, 243, 0.5);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    &.prev {
      left: -25px;

      @media (max-width: 1024px) {
        left: -20px;
      }

      @media (max-width: 768px) {
        left: -15px;
      }

      @media (max-width: 640px) {
        left: 0;
      }
    }

    &.next {
      right: -25px;

      @media (max-width: 1024px) {
        right: -20px;
      }

      @media (max-width: 768px) {
        right: -15px;
      }

      @media (max-width: 640px) {
        right: 0;
      }
    }
  }
}

/* Transition animations for center slide */
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.6, 1);
}

.slide-fade-enter-from {
  transform: scale(0.8) translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: scale(0.9) translateY(-10px);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: scale(1) translateY(0);
  opacity: 1;
}
</style>

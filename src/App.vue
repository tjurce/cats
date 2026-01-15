<template>
  <div class="app-container">
    <AppHeader />
    <CatCarousel :items="store.carouselKittens" @slide-click="openModal" />

    <div class="content-wrapper">
      <CatFilters
        v-model:search-query="searchText"
        v-model:sort-by="store.sortBy"
        v-model:sort-dir="store.sortDir"
        v-model:filters="store.filters"
        @update:search-query="updateSearch"
      />

      <CatGrid
        :cats="store.paginatedKittens"
        :has-more="store.hasMore"
        @adopt="confirmAdopt"
        @load-more="store.loadMore"
      />
    </div>

    <CatModal
      :show="showModal"
      :cat="selectedKitten"
      @close="closeModal"
      @adopt="confirmAdopt"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCatsStore } from "./stores/catsStore";
import { useThemeStore } from "./stores/themeStore";
import AppHeader from "./components/AppHeader.vue";
import CatCarousel from "./components/CatCarousel.vue";
import CatFilters from "./components/CatFilters.vue";
import CatGrid from "./components/CatGrid.vue";
import CatModal from "./components/CatModal.vue";

const store = useCatsStore();
const themeStore = useThemeStore();
const searchText = ref("");
const showModal = ref(false);
const selectedKitten = ref(null);

const updateSearch = () => store.setSearch(searchText.value);

const openModal = (cat) => {
  selectedKitten.value = cat;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const confirmAdopt = (cat) => {
  if (confirm(`Želite li udomiti mačića ${cat.name}?`)) {
    store.adoptKitten(cat.id);
    closeModal();
  }
};

onMounted(() => {
  store.fetchKittens();
  themeStore.initTheme();
});
</script>

<style lang="scss">
@import "@/assets/styles.scss";
</style>

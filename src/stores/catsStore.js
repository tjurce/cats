import { defineStore } from "pinia";

export const useCatsStore = defineStore("catsStore", {
  state: () => ({
    allKittens: [],
    visibleCount: 20,
    searchQuery: "",
    filters: {
      under6Months: false,
      under12Months: false,
      isBlack: false,
    },
    sortBy: "age",
    sortDir: "asc",
    adoptedIds: [],
  }),

  getters: {
    processedKittens(state) {
      let result = state.allKittens.filter(
        (k) => !state.adoptedIds.includes(k.id)
      );

      if (state.searchQuery) {
        result = result.filter((k) =>
          k.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      if (state.filters.under6Months)
        result = result.filter((k) => k.months < 6);
      if (state.filters.under12Months)
        result = result.filter((k) => k.months < 12);
      if (state.filters.isBlack)
        result = result.filter((k) => k.color.toLowerCase() === "crna");

      result.sort((a, b) => {
        let valA = state.sortBy === "age" ? a.months : a.name.toLowerCase();
        let valB = state.sortBy === "age" ? b.months : b.name.toLowerCase();

        if (valA < valB) return state.sortDir === "asc" ? -1 : 1;
        if (valA > valB) return state.sortDir === "asc" ? 1 : -1;
        return 0;
      });

      return result;
    },

    paginatedKittens(state) {
      return this.processedKittens.slice(0, state.visibleCount);
    },

    carouselKittens(state) {
      return [...state.allKittens]
        .filter((k) => !state.adoptedIds.includes(k.id))
        .sort((a, b) => a.months - b.months)
        .slice(0, 4);
    },

    hasMore(state) {
      return state.visibleCount < this.processedKittens.length;
    },

    adoptedCount(state) {
      return state.adoptedIds.length;
    },
  },

  actions: {
    async fetchKittens() {
      const res = await fetch("/kittens.json");
      this.allKittens = await res.json();
    },

    loadMore() {
      this.visibleCount += 20;
      this.sortBy = "age";
      this.sortDir = "asc";
    },

    adoptKitten(id) {
      this.adoptedIds.push(id);
    },

    setSearch(query) {
      this.searchQuery = query;
    },
  },
});

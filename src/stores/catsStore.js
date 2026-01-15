import { defineStore } from "pinia";

export const useCatsStore = defineStore("catsStore", {
  state: () => ({
    allKittens: [],
    visibleCount: 20, // Inicijalno 20 [cite: 14]
    searchQuery: "",
    filters: {
      under6Months: false,
      under12Months: false,
      isBlack: false,
    },
    sortBy: "age", // 'age' ili 'name'
    sortDir: "asc", // 'asc' ili 'desc'
    adoptedIds: [], // Za skrivanje udomljenih [cite: 31]
  }),

  getters: {
    // 1. Prvo filtriramo i sortiramo sve dostupne mačiće
    processedKittens(state) {
      let result = state.allKittens.filter(
        (k) => !state.adoptedIds.includes(k.id)
      );

      // Filter: Pretraga [cite: 22]
      if (state.searchQuery) {
        result = result.filter((k) =>
          k.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Filter: Checkboxi [cite: 20, 23]
      if (state.filters.under6Months)
        result = result.filter((k) => k.months < 6);
      if (state.filters.under12Months)
        result = result.filter((k) => k.months < 12);
      if (state.filters.isBlack)
        result = result.filter((k) => k.color.toLowerCase() === "crna");

      // Sortiranje [cite: 15]
      result.sort((a, b) => {
        let valA = state.sortBy === "age" ? a.months : a.name.toLowerCase();
        let valB = state.sortBy === "age" ? b.months : b.name.toLowerCase();

        if (valA < valB) return state.sortDir === "asc" ? -1 : 1;
        if (valA > valB) return state.sortDir === "asc" ? 1 : -1;
        return 0;
      });

      return result;
    },

    // 2. Onda uzimamo samo one koji se trebaju prikazati (Pagination)
    paginatedKittens(state) {
      return this.processedKittens.slice(0, state.visibleCount);
    },

    // 3. Carousel: 4 najmlađa [cite: 5]
    carouselKittens(state) {
      // Kopiramo array da ne poremetimo glavni poredak
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
      const res = await fetch("/kittens.json"); // Učitavanje JSON-a [cite: 3]
      this.allKittens = await res.json();
    },

    loadMore() {
      this.visibleCount += 20;
      // Reset sortiranja na default pri 'load more' [cite: 17]
      this.sortBy = "age";
      this.sortDir = "asc";
    },

    adoptKitten(id) {
      this.adoptedIds.push(id); // Mačić nestaje bez refresha [cite: 31]
    },

    setSearch(query) {
      this.searchQuery = query;
      // NAPOMENA: Ne resetiramo visibleCount ovdje, kako bi se poštovalo pravilo [cite: 28]
      // da se nakon brisanja pojma vidi isti broj mačića kao prije.
    },
  },
});

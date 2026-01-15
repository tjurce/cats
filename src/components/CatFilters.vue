<template>
  <aside class="filters">
    <h3>Tražilica</h3>
    <input
      :value="searchQuery"
      placeholder="Traži po imenu..."
      @input="$emit('update:searchQuery', $event.target.value)"
    />

    <h3>Sortiranje</h3>
    <div class="sort-group">
      <label>
        <input
          type="radio"
          value="age"
          :checked="sortBy === 'age'"
          @change="$emit('update:sortBy', 'age')"
        />
        Po dobi
      </label>
      <label>
        <input
          type="radio"
          value="name"
          :checked="sortBy === 'name'"
          @change="$emit('update:sortBy', 'name')"
        />
        Po imenu
      </label>
      <hr />
      <label>
        <input
          type="radio"
          value="asc"
          :checked="sortDir === 'asc'"
          @change="$emit('update:sortDir', 'asc')"
        />
        Uzlazno
      </label>
      <label>
        <input
          type="radio"
          value="desc"
          :checked="sortDir === 'desc'"
          @change="$emit('update:sortDir', 'desc')"
        />
        Silazno
      </label>
    </div>

    <h3>Filteri</h3>
    <CustomCheckbox
      label="Mlađi od 6 mj."
      :model-value="filters.under6Months"
      @update:model-value="
        $emit('update:filters', { ...filters, under6Months: $event })
      "
    />
    <CustomCheckbox
      label="Mlađi od 12 mj."
      :model-value="filters.under12Months"
      @update:model-value="
        $emit('update:filters', { ...filters, under12Months: $event })
      "
    />
    <CustomCheckbox
      label="Crna boja"
      :model-value="filters.isBlack"
      @update:model-value="
        $emit('update:filters', { ...filters, isBlack: $event })
      "
    />
  </aside>
</template>

<script setup>
import CustomCheckbox from "@/components/CustomCheckbox.vue";

defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
  sortBy: {
    type: String,
    default: "age",
  },
  sortDir: {
    type: String,
    default: "asc",
  },
  filters: {
    type: Object,
    required: true,
  },
});

defineEmits([
  "update:searchQuery",
  "update:sortBy",
  "update:sortDir",
  "update:filters",
]);
</script>

<style lang="scss" scoped>
.filters {
  min-width: 280px;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 1024px) {
    min-width: 240px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    position: static;
    min-width: 100%;
    max-height: none;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
  }

  h3 {
    color: var(--text-primary);
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--border-light);
    transition: color 0.3s ease, border-color 0.3s ease;

    @media (max-width: 480px) {
      font-size: 16px;
      margin-bottom: 12px;
    }

    &:not(:first-child) {
      margin-top: 28px;

      @media (max-width: 480px) {
        margin-top: 20px;
      }
    }
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.3s ease;
    outline: none;
    background-color: var(--bg-tertiary);
    color: var(--text-primary);

    @media (max-width: 480px) {
      padding: 10px 14px;
      font-size: 14px;
    }

    &:hover {
      border-color: var(--text-tertiary);
      background-color: var(--card-bg);
    }

    &:focus {
      border-color: var(--blue-primary);
      background-color: var(--card-bg);
      box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }

    &::placeholder {
      color: var(--text-tertiary);
      font-style: italic;
    }
  }

  .sort-group {
    label {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      margin-bottom: 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 15px;

      @media (max-width: 480px) {
        padding: 8px 10px;
        font-size: 14px;
      }

      &:hover {
        background-color: var(--hover-bg);
      }

      input[type="radio"] {
        margin-right: 10px;
        cursor: pointer;
        width: 18px;
        height: 18px;
        accent-color: var(--blue-primary);

        @media (max-width: 480px) {
          width: 16px;
          height: 16px;
        }
      }
    }

    hr {
      margin: 16px 0;
      border: none;
      border-top: 1px solid var(--border-color);

      @media (max-width: 480px) {
        margin: 12px 0;
      }
    }
  }
}

/* Scrollbar styling */
.filters::-webkit-scrollbar {
  width: 6px;
}

.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.filters::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;

  &:hover {
    background: #999;
  }
}
</style>

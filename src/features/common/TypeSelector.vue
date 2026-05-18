<template>
  <div class="type-selector">
    <div class="type-grid">
      <button
        v-for="type in types"
        :key="type.id"
        class="type-card"
        :class="{ active: selectedType?.id === type.id }"
        :style="{ 
          '--type-color': type.color,
          '--type-bg': type.bgColor
        }"
        @click="$emit('select', type)"
        :aria-pressed="selectedType?.id === type.id"
        :aria-label="`选择${type.name}属性`"
      >
        <span class="type-icon">{{ getTypeIcon(type.id) }}</span>
        <span class="type-name">{{ type.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { getTypeIcon } from '../../data/types.js'

defineProps({
  types: {
    type: Array,
    required: true,
    validator: (value) => {
      return Array.isArray(value) && value.length > 0 && value.every(type => 
        typeof type.id === 'string' && 
        typeof type.name === 'string' &&
        typeof type.color === 'string' &&
        typeof type.bgColor === 'string'
      )
    }
  },
  selectedType: {
    type: Object,
    default: null,
    validator: (value) => {
      if (!value) return true
      return typeof value.id === 'string' && 
             typeof value.name === 'string'
    }
  }
})

defineEmits(['select'])
</script>

<style scoped>
.type-selector {
  background: white;
  border-radius: 16px;
  padding: 0.875rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4375rem;
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6875rem 0.3125rem;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid transparent;
  background: var(--type-bg);
  font-size: inherit;
  color: inherit;
  line-height: inherit;
}

.type-card:focus {
  outline: 2px solid var(--type-color);
  outline-offset: 2px;
}

.type-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.type-card.active {
  border-color: var(--type-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transform: scale(1.03);
}

.type-icon {
  font-size: 1.4rem;
  margin-bottom: 0.1875rem;
  line-height: 1.2;
}

.type-name {
  font-size: 0.725rem;
  font-weight: 600;
  color: var(--type-color);
  text-align: center;
  line-height: 1.15;
}

@media (max-width: 1024px) {
  .type-selector {
    padding: 0.6875rem;
  }
  
  .type-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .type-card {
    padding: 0.5625rem 0.3125rem;
  }
  
  .type-icon {
    font-size: 1.3rem;
    margin-bottom: 0.15625rem;
  }
  
  .type-name {
    font-size: 0.7rem;
  }
}

@media (max-width: 768px) {
  .type-selector {
    padding: 0.5rem;
  }
  
  .type-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.3125rem;
  }
  
  .type-card {
    padding: 0.4375rem 0.25rem;
  }
  
  .type-icon {
    font-size: 1.2rem;
    margin-bottom: 0.125rem;
  }
  
  .type-name {
    font-size: 0.6875rem;
  }
}

@media (max-width: 540px) {
  .type-selector {
    padding: 0.4375rem 0.375rem;
  }
  
  .type-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.3125rem;
  }
  
  .type-card {
    padding: 0.4375rem 0.1875rem;
  }
  
  .type-icon {
    font-size: 1.05rem;
  }
  
  .type-name {
    font-size: 0.625rem;
  }
}

@media (max-width: 400px) {
  .type-selector {
    padding: 0.375rem 0.3125rem;
  }
  
  .type-grid {
    gap: 0.1875rem;
  }
  
  .type-card {
    padding: 0.3125rem 0.15625rem;
  }
  
  .type-icon {
    font-size: 0.95rem;
  }
  
  .type-name {
    font-size: 0.5625rem;
  }
}
</style>
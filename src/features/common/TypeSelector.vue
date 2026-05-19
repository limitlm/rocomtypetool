<template>
  <div class="type-selector">
    <div v-if="showHeader" class="selector-header">
      <h3>{{ headerTitle }}</h3>
      <p v-if="maxSelections > 1" class="selection-status">
        已选择: {{ selectedTypes.length }}/{{ maxSelections }}
      </p>
    </div>
    
    <div class="type-grid">
      <button
        v-for="type in types"
        :key="type.id"
        class="type-card"
        :class="{ 
          active: isSelected(type.id), 
          disabled: !isSelected(type.id) && maxSelections > 1 && selectedTypes.length >= maxSelections 
        }"
        :style="{ 
          '--type-color': type.color,
          '--type-bg': type.bgColor
        }"
        @click="handleTypeClick(type)"
        :aria-pressed="isSelected(type.id)"
        :aria-label="`选择${type.name}属性`"
        :disabled="!isSelected(type.id) && maxSelections > 1 && selectedTypes.length >= maxSelections"
      >
        <span class="type-icon">{{ getTypeIcon(type.id) }}</span>
        <span class="type-name">{{ type.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { getTypeIcon } from '../../data/types.js'

const props = defineProps({
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
  selectedTypes: {
    type: Array,
    default: () => []
  },
  maxSelections: {
    type: Number,
    default: 1
  },
  showHeader: {
    type: Boolean,
    default: false
  },
  headerTitle: {
    type: String,
    default: '选择属性'
  }
})

const emit = defineEmits(['select', 'update:selectedTypes'])

function isSelected(typeId) {
  if (props.maxSelections === 1) {
    return props.selectedTypes.length > 0 && props.selectedTypes[0].id === typeId
  }
  return props.selectedTypes.some(type => type.id === typeId)
}

function handleTypeClick(type) {
  let newSelectedTypes = [...props.selectedTypes]
  
  if (props.maxSelections === 1) {
    newSelectedTypes = newSelectedTypes.length > 0 && newSelectedTypes[0].id === type.id ? [] : [type]
  } else {
    const index = newSelectedTypes.findIndex(t => t.id === type.id)
    if (index !== -1) {
      newSelectedTypes.splice(index, 1)
    } else if (newSelectedTypes.length < props.maxSelections) {
      newSelectedTypes.push(type)
    }
  }
  
  emit('update:selectedTypes', newSelectedTypes)
  emit('select', type)
}
</script>

<style scoped>
.type-selector {
  background: white;
  border-radius: 16px;
  padding: 0.875rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}

.selector-header h3 {
  font-size: 0.95rem;
  color: #333;
  margin: 0;
}

.selection-status {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-radius: 10px;
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

.type-card:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.type-card.active {
  border-color: var(--type-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transform: scale(1.03);
}

.type-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.type-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.type-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--type-color);
  text-align: center;
  line-height: 1.2;
}

/* 桌面超大屏幕 - 9列 */
@media (min-width: 1280px) {
  .type-grid {
    grid-template-columns: repeat(9, 1fr);
    gap: 0.5rem;
  }
  
  .type-card {
    padding: 0.625rem 0.375rem;
  }
  
  .type-icon {
    font-size: 1.4rem;
  }
  
  .type-name {
    font-size: 0.725rem;
  }
}

/* 平板 - 6列 */
@media (max-width: 1023px) and (min-width: 768px) {
  .type-selector {
    padding: 0.75rem;
  }
  
  .type-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.4375rem;
  }
  
  .type-card {
    padding: 0.625rem 0.4375rem;
  }
  
  .type-icon {
    font-size: 1.4rem;
    margin-bottom: 0.1875rem;
  }
  
  .type-name {
    font-size: 0.725rem;
  }
}

/* 小平板/大手机 - 6列 */
@media (max-width: 767px) and (min-width: 540px) {
  .type-selector {
    padding: 0.625rem;
  }
  
  .type-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.375rem;
  }
  
  .type-card {
    padding: 0.5rem 0.375rem;
  }
  
  .type-icon {
    font-size: 1.3rem;
    margin-bottom: 0.15625rem;
  }
  
  .type-name {
    font-size: 0.7rem;
  }
}

/* 手机 - 3列 */
@media (max-width: 539px) {
  .type-selector {
    padding: 0.625rem 0.5rem;
  }
  
  .type-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4375rem;
  }
  
  .type-card {
    padding: 0.625rem 0.375rem;
  }
  
  .type-icon {
    font-size: 1.35rem;
    margin-bottom: 0.1875rem;
  }
  
  .type-name {
    font-size: 0.725rem;
  }
}

/* 小屏手机 - 3列紧凑 */
@media (max-width: 400px) {
  .type-selector {
    padding: 0.5rem 0.375rem;
  }
  
  .type-grid {
    gap: 0.3125rem;
  }
  
  .type-card {
    padding: 0.5rem 0.25rem;
  }
  
  .type-icon {
    font-size: 1.25rem;
  }
  
  .type-name {
    font-size: 0.6875rem;
  }
}
</style>

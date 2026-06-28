<template>
  <div class="selected-types-header">
    <div class="selected-types">
      <span
        v-for="type in types"
        :key="type.id"
        class="selected-type-badge"
        :style="{ '--type-color': type.color, '--type-bg': type.bgColor }"
      >
        <span class="type-icon">{{ getTypeIcon(type.id) }}</span>
        <span class="type-name">{{ type.name }}</span>
        <button
          v-if="removable"
          class="remove-btn"
          @click="$emit('removeType', type.id)"
          aria-label="移除属性"
        >
          <span>✕</span>
        </button>
      </span>
      <span v-if="types.length === 0" class="placeholder-text">{{ placeholder }}</span>
    </div>
    <button
      v-if="showClear && types.length > 0"
      class="clear-btn"
      @click="$emit('clear')"
      aria-label="清除选择"
    >
      <span>清除</span>
    </button>
  </div>
</template>

<script setup>
import { getTypeIcon } from '../../data/types.js'

defineProps({
  types: {
    type: Array,
    default: () => []
  },
  removable: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: '请选择属性'
  }
})

defineEmits(['clear', 'removeType'])
</script>

<style scoped>
.selected-types-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0.625rem;
  background: white;
  color: #1f2937;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}

.selected-types {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-wrap: wrap;
  flex: 1;
}

.selected-type-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.375rem;
  background: var(--type-bg);
  color: var(--type-color);
  border-radius: 8px;
  border: 1px solid var(--type-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selected-type-badge .type-icon {
  font-size: 0.9rem;
}

.selected-type-badge .type-name {
  font-size: 0.7rem;
  font-weight: 600;
}

.remove-btn {
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.remove-btn span {
  font-size: 0.6rem;
}

.placeholder-text {
  font-size: 0.85rem;
  opacity: 0.7;
}

.clear-btn {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  padding: 0.25rem 0.625rem;
  color: #3b82f6;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
}
</style>

<template>
  <button
    class="mini-type clickable"
    :style="{ '--mini-color': getTypeColor(typeId) }"
    @click="$emit('click', typeId)"
    :aria-label="`查看${getTypeName(typeId)}属性克制关系`"
  >
    <span class="mini-icon">{{ getTypeIcon(typeId) }}</span>
    <span class="mini-name">{{ getTypeName(typeId) }}</span>
  </button>
</template>

<script setup>
import { getTypeIcon, getTypeName, getTypeColor } from '../../data/types.js'

defineProps({
  typeId: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.mini-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.4rem 0.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--mini-color);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  min-width: 65px;
}

.mini-type.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.mini-type.clickable::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.3s ease;
}

.mini-type.clickable:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  border-color: var(--mini-color);
}

.mini-type.clickable:hover::before {
  left: 100%;
}

.mini-type.clickable:active {
  transform: translateY(-1px) scale(1.02);
}

.mini-icon {
  font-size: 1.1rem;
}

.mini-name {
  line-height: 1.2;
  text-align: center;
}

@media (max-width: 768px) {
  .mini-type.clickable {
    padding: 0.3rem 0.4rem;
    font-size: 0.6875rem;
    min-width: 55px;
  }

  .mini-icon {
    font-size: 0.95rem;
  }
}

@media (max-width: 540px) {
  .mini-type.clickable {
    padding: 0.25rem 0.35rem;
    font-size: 0.625rem;
    min-width: 50px;
  }

  .mini-icon {
    font-size: 0.875rem;
  }
}
</style>
<template>
  <div class="dual-query-container">
    <div class="content-wrapper">
      <aside class="sidebar">
        <DualTypeSelector 
          :types="TYPES" 
          :selected-types="selectedTypes" 
          @update:selected-types="handleTypesUpdate"
        />
      </aside>
      
      <div class="main-area">
        <DualRelationPanel 
          :types="selectedTypes" 
          @clear="handleClear"
          @type-click="handleTypeClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TYPES } from '../../data/types.js'
import DualTypeSelector from '../common/DualTypeSelector.vue'
import DualRelationPanel from '../common/DualRelationPanel.vue'

const selectedTypes = ref([])

function handleTypesUpdate(types) {
  selectedTypes.value = types
}

function handleClear() {
  selectedTypes.value = []
}

function handleTypeClick(typeId) {
  // 点击属性时，替换当前选择为该属性（如果已选择则移除）
  const index = selectedTypes.value.findIndex(t => t.id === typeId)
  if (index !== -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    const type = TYPES.find(t => t.id === typeId)
    if (type) {
      if (selectedTypes.value.length >= 2) {
        selectedTypes.value = [type]
      } else {
        selectedTypes.value = [...selectedTypes.value, type]
      }
    }
  }
}
</script>

<style scoped>
.dual-query-container {
  width: 100%;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.25rem;
  width: 100%;
  align-items: stretch;
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar > * {
  flex-shrink: 0;
}

.main-area {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .main-area {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    gap: 0.625rem;
  }
}

@media (max-width: 540px) {
  .content-wrapper {
    gap: 0.5rem;
  }
}
</style>

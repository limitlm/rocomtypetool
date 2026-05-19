<template>
  <div class="dual-query-container">
    <div class="content-wrapper">
      <div class="selector-section">
        <TypeSelector
          :types="TYPES"
          :selected-types="selectedTypes"
          :max-selections="2"
          :show-header="true"
          @update:selected-types="handleTypesUpdate"
        />
      </div>
      
      <div class="panel-section">
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
import TypeSelector from '../common/TypeSelector.vue'
import DualRelationPanel from '../common/DualRelationPanel.vue'

const selectedTypes = ref([])

function handleTypesUpdate(types) {
  selectedTypes.value = types
}

function handleClear() {
  selectedTypes.value = []
}

function handleTypeClick(typeId) {
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.selector-section {
  width: 100%;
}

.panel-section {
  width: 100%;
}

@media (max-width: 768px) {
  .content-wrapper {
    gap: 0.75rem;
  }
}

@media (max-width: 540px) {
  .content-wrapper {
    gap: 0.5rem;
  }
}
</style>

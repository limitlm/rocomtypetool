<template>
  <div class="multi-query-container">
    <div class="content-wrapper">
      <div class="selector-section">
        <TypeSelector
          :types="TYPES"
          :selected-types="selectedTypes"
          :max-selections="12"
          :show-header="true"
          header-title="选择属性"
          @update:selected-types="handleTypesUpdate"
        />
      </div>
      
      <div class="panel-section">
        <MultiRelationPanel
          :types="selectedTypes"
          @clear="handleClear"
          @type-click="handleTypeClick"
          @remove-type="handleRemoveType"
          @add-type="handleAddType"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { TYPES } from '../../data/types.js'
import TypeSelector from '../common/TypeSelector.vue'
import MultiRelationPanel from '../common/MultiRelationPanel.vue'
import { useTypeSelection } from '../../composables/useTypeSelection.js'

const { selectedTypes, handleTypesUpdate, handleClear, handleTypeClick, handleRemoveType, handleAddType } = useTypeSelection(12)
</script>

<style scoped>
.multi-query-container {
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
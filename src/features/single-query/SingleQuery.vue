<template>
  <div class="single-query-container">
    <div class="content-wrapper">
      <div class="selector-section">
        <TypeSelector 
          :types="TYPES" 
          :selected-types="selectedType ? [selectedType] : []" 
          @update:selected-types="handleTypesUpdate"
        />
      </div>
      
      <div class="panel-section">
        <RelationPanel 
          v-if="selectedType" 
          :type="selectedType" 
          @close="handlePanelClose" 
          @type-change="handleTypeSelect"
        />
        
        <div v-else class="welcome-panel">
          <div class="welcome-icon">🎮</div>
          <h2>选择一个属性开始</h2>
          <p>点击上方属性图标，查看完整的克制关系</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TYPES } from '../../data/types.js'
import TypeSelector from '../common/TypeSelector.vue'
import RelationPanel from '../common/RelationPanel.vue'
import { useTypeSelection } from '../../composables/useTypeSelection.js'

const { selectedTypes, handleTypesUpdate } = useTypeSelection(1)

const selectedType = computed(() => selectedTypes.value.length > 0 ? selectedTypes.value[0] : null)

function handleTypeSelect(type) {
  selectedTypes.value = [type]
}

function handlePanelClose() {
  selectedTypes.value = []
}
</script>

<style scoped>
.single-query-container {
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

.welcome-panel {
  background: white;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.welcome-icon {
  font-size: 3.5rem;
  margin-bottom: 0.75rem;
}

.welcome-panel h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
}

.welcome-panel p {
  color: #666;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .content-wrapper {
    gap: 0.75rem;
  }
  
  .welcome-panel {
    padding: 1.5rem 1.25rem;
  }
  
  .welcome-icon {
    font-size: 2.5rem;
  }
  
  .welcome-panel h2 {
    font-size: 1rem;
  }
}

@media (max-width: 540px) {
  .content-wrapper {
    gap: 0.5rem;
  }
  
  .welcome-panel {
    padding: 1rem 0.875rem;
  }
  
  .welcome-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .welcome-panel h2 {
    font-size: 0.95rem;
    margin-bottom: 0.375rem;
  }
  
  .welcome-panel p {
    font-size: 0.75rem;
  }
}
</style>

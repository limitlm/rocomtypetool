<template>
  <div class="single-query-container">
    <div class="content-wrapper">
      <aside class="sidebar">
        <TypeSelector 
          :types="TYPES" 
          :selected-type="selectedType" 
          @select="handleTypeSelect" 
        />
      </aside>
      
      <div class="main-area">
        <RelationPanel 
          v-if="selectedType" 
          :type="selectedType" 
          @close="handlePanelClose" 
          @type-change="handleTypeSelect"
        />
        
        <div v-else class="welcome-panel">
          <div class="welcome-icon">🎮</div>
          <h2>选择一个属性开始</h2>
          <p>点击左侧属性图标，查看完整的克制关系</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TYPES } from '../../data/types.js'
import TypeSelector from '../common/TypeSelector.vue'
import RelationPanel from '../common/RelationPanel.vue'

const selectedType = ref(null)

function handleTypeSelect(type) {
  selectedType.value = type
}

function handlePanelClose() {
  selectedType.value = null
}
</script>

<style scoped>
.single-query-container {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.25rem;
  width: 100%;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
}

.main-area {
  display: flex;
  flex-direction: column;
}

.welcome-panel {
  background: white;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
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
  
  .welcome-panel {
    padding: 1.5rem 1.25rem;
    min-height: 220px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    gap: 0.625rem;
  }
  
  .welcome-panel {
    padding: 1rem 0.875rem;
    min-height: 180px;
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
    padding: 0.875rem 0.75rem;
    min-height: 150px;
  }
  
  .welcome-icon {
    font-size: 2.25rem;
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

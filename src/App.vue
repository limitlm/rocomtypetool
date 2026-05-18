<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <h1>洛克王国属性克制表</h1>
        <p class="subtitle">点击属性查看详细克制关系</p>
      </div>
    </header>
    
    <main class="main-content">
      <div class="content-wrapper">
        <aside class="sidebar">
          <TypeSelector 
            :types="TYPES" 
            :selected-type="selectedType" 
            @select="onTypeSelect" 
          />
        </aside>
        
        <div class="main-area">
          <RelationPanel 
            v-if="selectedType" 
            :type="selectedType" 
            @close="onPanelClose" 
            @type-change="onTypeSelect"
          />
          
          <div v-else class="welcome-panel">
            <div class="welcome-icon">🎮</div>
            <h2>选择一个属性开始</h2>
            <p>点击左侧属性图标，查看完整的克制关系</p>
          </div>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <div class="footer-content">
        <p>洛克王国属性克制表 © 2026</p>
        <p class="author">作者: Limitlm</p>
        <p class="license">MIT License | <a 
          href="https://github.com/limitlm" 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          aria-label="访问GitHub主页"
        >GitHub</a></p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TYPES } from './data/types.js'
import TypeSelector from './components/TypeSelector.vue'
import RelationPanel from './components/RelationPanel.vue'

/**
 * 当前选中的属性
 * @type {import('vue').Ref<Object|null>}
 */
const selectedType = ref(null)

/**
 * 处理属性选择事件
 * @param {Object} type - 选中的属性对象
 */
function onTypeSelect(type) {
  selectedType.value = type
}

/**
 * 处理面板关闭事件
 */
function onPanelClose() {
  selectedType.value = null
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 1.25rem 1rem;
  color: white;
}

.header-content h1 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
}

.main-content {
  flex: 1;
  padding: 0 1rem 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.25rem;
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

.footer {
  text-align: center;
  padding: 1rem;
  color: white;
  opacity: 0.85;
  font-size: 0.8rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer .author {
  font-size: 0.75rem;
  opacity: 0.9;
}

.footer .license {
  font-size: 0.7rem;
  opacity: 0.8;
}

.footer a {
  color: white;
  text-decoration: underline;
}

.footer a:hover {
  opacity: 0.8;
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
  
  .header-content h1 {
    font-size: 1.4rem;
  }
  
  .welcome-panel {
    padding: 1.5rem 1.25rem;
    min-height: 220px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  
  .header-content h1 {
    font-size: 1.25rem;
  }
  
  .subtitle {
    font-size: 0.8rem;
  }
  
  .main-content {
    padding: 0 0.625rem 1rem;
  }
  
  .welcome-panel {
    padding: 1.25rem 1rem;
    min-height: 180px;
  }
  
  .welcome-icon {
    font-size: 2.75rem;
  }
  
  .welcome-panel h2 {
    font-size: 1rem;
  }
  
  .footer {
    padding: 0.75rem;
    font-size: 0.7rem;
  }
  
  .footer .author {
    font-size: 0.68rem;
  }
  
  .footer .license {
    font-size: 0.65rem;
  }
}

@media (max-width: 540px) {
  .header {
    padding: 0.75rem 0.5rem;
  }
  
  .header-content h1 {
    font-size: 1.15rem;
  }
  
  .main-content {
    padding: 0 0.5rem 0.75rem;
  }
  
  .content-wrapper {
    gap: 0.5rem;
  }
  
  .welcome-panel {
    padding: 1rem 0.75rem;
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
  
  .footer {
    padding: 0.625rem 0.5rem;
    font-size: 0.65rem;
  }
  
  .footer-content {
    gap: 0.18rem;
  }
}
</style>

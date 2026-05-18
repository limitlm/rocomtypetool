<template>
  <div class="app-container">
    <header class="header">
      <HeaderCard @viewChange="onViewChange" />
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
        <p>洛克王国:世界——属性关系工具 © 2026</p>
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
import HeaderCard from './components/HeaderCard.vue'

/**
 * 当前选中的属性
 * @type {import('vue').Ref<Object|null>}
 */
const selectedType = ref(null)

/**
 * 当前视图模式
 * @type {import('vue').Ref<string>}
 */
const currentViewMode = ref('single')

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

/**
 * 处理视图切换事件
 * @param {string} view - 视图类型
 */
function onViewChange(view) {
  currentViewMode.value = view
  if (view === 'single') {
    // 单属查询模式 - 保持当前功能
  } else if (view === 'dual') {
    // 双属查询模式 - 后续实现
    console.log('双属查询功能即将推出')
  } else if (view === 'multi') {
    // 多属查询模式 - 后续实现
    console.log('多属查询功能即将推出')
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 0.5rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
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
  
  .welcome-panel {
    padding: 1.5rem 1.25rem;
    min-height: 220px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.5rem 0.625rem;
  }
  
  .main-content {
    padding: 0 0.625rem 0.875rem;
  }
  
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
  
  .footer {
    padding: 0.75rem 0.5rem;
    font-size: 0.7rem;
  }
  
  .footer .author {
    font-size: 0.65rem;
  }
  
  .footer .license {
    font-size: 0.625rem;
  }
}

@media (max-width: 540px) {
  .header {
    padding: 0.375rem 0.5rem;
  }
  
  .main-content {
    padding: 0 0.5rem 0.75rem;
  }
  
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
  
  .footer {
    padding: 0.625rem 0.5rem;
    font-size: 0.65rem;
  }
  
  .footer-content {
    gap: 0.15rem;
  }
}
</style>

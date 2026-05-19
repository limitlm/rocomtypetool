<template>
  <div class="app-container">
    <header class="header">
      <div class="header-card">
        <div class="button-container">
          <button 
            v-for="feature in enabledFeatures" 
            :key="feature.id"
            class="query-btn"
            :class="{ active: currentFeatureId === feature.id }"
            @click="handleFeatureChange(feature.id)"
            :aria-pressed="currentFeatureId === feature.id"
          >
            <span class="btn-icon">{{ feature.icon }}</span>
            <span class="btn-text">{{ feature.name }}</span>
          </button>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <component 
        :is="currentFeatureComponent" 
        class="feature-component"
      />
    </main>
    
    <footer class="footer">
      <div class="footer-content">
        <p>洛克王国:世界————属性关系工具 © 2026</p>
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
import { ref, computed, defineAsyncComponent } from 'vue'
import { FEATURE_IDS, getEnabledFeatures, getFeatureById } from './features/featureConfig.js'

const SingleQuery = defineAsyncComponent(() => import('./features/single-query/SingleQuery.vue'))
const DualQuery = defineAsyncComponent(() => import('./features/dual-query/DualQuery.vue'))
const MultiQuery = defineAsyncComponent(() => import('./features/multi-query/MultiQuery.vue'))

const enabledFeatures = getEnabledFeatures()
const currentFeatureId = ref(FEATURE_IDS.SINGLE_QUERY)

const featureComponents = {
  [FEATURE_IDS.SINGLE_QUERY]: SingleQuery,
  [FEATURE_IDS.DUAL_QUERY]: DualQuery,
  [FEATURE_IDS.MULTI_QUERY]: MultiQuery
}

const currentFeatureComponent = computed(() => {
  return featureComponents[currentFeatureId.value]
})

function handleFeatureChange(featureId) {
  currentFeatureId.value = featureId
}
</script>

<style scoped>
/* 基础布局结构 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 顶部导航 */
.header {
  padding: 0.75rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  flex-shrink: 0;
}

.header-card {
  background: white;
  border-radius: 12px;
  padding: 0.625rem 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.query-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 90px;
}

.query-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  border-color: #3b82f6;
  background: linear-gradient(135deg, #ffffff, #f0f7ff);
}

.query-btn.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-color: #2563eb;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.btn-icon {
  font-size: 1.4rem;
  transition: transform 0.2s ease;
}

.query-btn:hover .btn-icon {
  transform: scale(1.08);
}

.btn-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
}

/* 中间内容区域 */
.main-content {
  flex: 1;
  padding: 0 1rem 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.feature-component {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 底部页脚 */
.footer {
  text-align: center;
  padding: 1rem;
  color: white;
  opacity: 0.9;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer .author {
  font-size: 0.75rem;
  opacity: 0.95;
}

.footer .license {
  font-size: 0.7rem;
  opacity: 0.85;
}

.footer a {
  color: white;
  text-decoration: underline;
  transition: opacity 0.2s;
}

.footer a:hover {
  opacity: 0.7;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .header {
    padding: 0.625rem 0.875rem;
  }
  
  .button-container {
    gap: 0.625rem;
  }
  
  .query-btn {
    padding: 0.4375rem 0.875rem;
    min-width: 85px;
  }
  
  .btn-icon {
    font-size: 1.3rem;
  }
  
  .main-content {
    padding: 0 0.875rem 1rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.5rem 0.625rem;
  }
  
  .main-content {
    padding: 0 0.625rem 0.875rem;
  }
  
  .button-container {
    gap: 0.5rem;
  }
  
  .query-btn {
    padding: 0.375rem 0.75rem;
    min-width: 78px;
  }
  
  .btn-icon {
    font-size: 1.2rem;
  }
  
  .btn-text {
    font-size: 0.7rem;
  }
  
  .footer {
    padding: 0.75rem 0.625rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 540px) {
  .header {
    padding: 0.375rem 0.5rem;
  }
  
  .main-content {
    padding: 0 0.5rem 0.75rem;
  }
  
  .button-container {
    gap: 0.4375rem;
  }
  
  .query-btn {
    padding: 0.3125rem 0.5625rem;
    min-width: 70px;
  }
  
  .btn-icon {
    font-size: 1.1rem;
  }
  
  .btn-text {
    font-size: 0.65rem;
  }
  
  .footer {
    padding: 0.625rem 0.5rem;
    font-size: 0.7rem;
  }
}

@media (max-width: 400px) {
  .button-container {
    gap: 0.375rem;
  }
  
  .query-btn {
    padding: 0.25rem 0.5rem;
    min-width: 65px;
    border-radius: 8px;
  }
  
  .btn-icon {
    font-size: 1rem;
  }
  
  .btn-text {
    font-size: 0.6rem;
  }
}
</style>

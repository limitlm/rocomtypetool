<template>
  <div class="header-card">
    <div class="button-container">
      <button 
        class="query-btn"
        :class="{ active: currentView === 'single' }"
        @click="handleSingleQuery"
        aria-label="单属查询"
      >
        <span class="btn-icon">🔍</span>
        <span class="btn-text">单属查询</span>
      </button>
      
      <button 
        class="query-btn"
        :class="{ active: currentView === 'dual' }"
        @click="handleDualQuery"
        aria-label="双属查询"
      >
        <span class="btn-icon">⚡</span>
        <span class="btn-text">双属查询</span>
      </button>
      
      <button 
        class="query-btn"
        :class="{ active: currentView === 'multi' }"
        @click="handleMultiQuery"
        aria-label="多属查询"
      >
        <span class="btn-icon">🌟</span>
        <span class="btn-text">多属查询</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['viewChange'])

const currentView = ref('single')

function handleSingleQuery() {
  currentView.value = 'single'
  emit('viewChange', 'single')
}

function handleDualQuery() {
  currentView.value = 'dual'
  emit('viewChange', 'dual')
}

function handleMultiQuery() {
  currentView.value = 'multi'
  emit('viewChange', 'multi')
}
</script>

<style scoped>
.header-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 0.625rem 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease;
  width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.875rem;
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
  position: relative;
  overflow: hidden;
  font-size: inherit;
  color: inherit;
}

.query-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transition: left 0.4s ease;
}

.query-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
  background: linear-gradient(135deg, #ffffff, #f0f7ff);
}

.query-btn:hover::before {
  left: 100%;
}

.query-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.query-btn.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-color: #2563eb;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.btn-icon {
  font-size: 1.35rem;
  transition: transform 0.3s ease;
}

.query-btn:hover .btn-icon {
  transform: scale(1.1);
}

.query-btn.active .btn-icon {
  transform: scale(1.05);
}

.btn-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
}

@media (max-width: 1024px) {
  .button-container {
    gap: 0.75rem;
  }
  
  .query-btn {
    padding: 0.4375rem 0.875rem;
    min-width: 85px;
  }
  
  .btn-icon {
    font-size: 1.25rem;
  }
  
  .btn-text {
    font-size: 0.71875rem;
  }
}

@media (max-width: 768px) {
  .button-container {
    gap: 0.625rem;
  }
  
  .query-btn {
    padding: 0.375rem 0.75rem;
    min-width: 78px;
  }
  
  .btn-icon {
    font-size: 1.15rem;
  }
  
  .btn-text {
    font-size: 0.6875rem;
  }
}

@media (max-width: 540px) {
  .button-container {
    gap: 0.5rem;
  }
  
  .query-btn {
    padding: 0.3125rem 0.5625rem;
    min-width: 70px;
    gap: 0.1875rem;
  }
  
  .btn-icon {
    font-size: 1.05rem;
  }
  
  .btn-text {
    font-size: 0.625rem;
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
    font-size: 0.95rem;
  }
  
  .btn-text {
    font-size: 0.5625rem;
  }
}
</style>

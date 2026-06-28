<template>
  <div class="dual-relation-panel">
    <div class="panel-header">
      <div class="selected-types">
        <span 
          v-for="type in types" 
          :key="type.id"
          class="selected-type-badge"
          :style="{ '--type-color': type.color, '--type-bg': type.bgColor }"
        >
          <span class="type-icon">{{ getTypeIcon(type.id) }}</span>
          <span class="type-name">{{ type.name }}</span>
        </span>
        <span v-if="types.length === 0" class="placeholder-text">请选择属性</span>
      </div>
      <button class="clear-btn" @click="handleClear" aria-label="清除选择">
        <span>清除</span>
      </button>
    </div>
    
    <div v-if="types.length === 0" class="welcome-panel">
      <div class="welcome-icon">⚡</div>
      <h2>选择属性开始分析</h2>
      <p>从上方选择1-2个属性，查看双属性克制关系</p>
    </div>
    
    <div v-else class="relations-container">
      <section class="view-section attack-view" aria-label="攻击方视角">
        <div class="view-header">
          <span class="view-icon">⚔️</span>
          <span class="view-title">攻击方视角</span>
          <span class="view-desc">作为攻击方时</span>
        </div>
        <div class="view-cards">
          <div class="relation-card super-effective">
            <div class="relation-header">
              <span class="relation-icon">🔥</span>
              <span class="relation-title">我克制</span>
              <span class="damage-multiplier">2x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in attackRelations.superEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="attackRelations.superEffective.length === 0" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card common-not-very-effective">
            <div class="relation-header">
              <span class="relation-icon">🛡️</span>
              <span class="relation-title">共同抵抗</span>
              <span class="damage-multiplier">0.5x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in attackRelations.commonNotVeryEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="attackRelations.commonNotVeryEffective.length === 0" class="empty">无</span>
            </div>
          </div>
        </div>
      </section>
      
      <section class="view-section defense-view" aria-label="受击方视角">
        <div class="view-header">
          <span class="view-icon">🛡️</span>
          <span class="view-title">受击方视角</span>
          <span class="view-desc">作为受击方时</span>
        </div>
        <div class="view-cards">
          <div class="relation-card strong-super-effective">
            <div class="relation-header">
              <span class="relation-icon">💥</span>
              <span class="relation-title">被强力克制</span>
              <span class="damage-multiplier">3x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in defenseRelations.strongSuperEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="defenseRelations.strongSuperEffective.length === 0" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card normal-super-effective">
            <div class="relation-header">
              <span class="relation-icon">💢</span>
              <span class="relation-title">被克制</span>
              <span class="damage-multiplier">2x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in defenseRelations.normalSuperEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="defenseRelations.normalSuperEffective.length === 0" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card normal-not-very-effective">
            <div class="relation-header">
              <span class="relation-icon">🛡️</span>
              <span class="relation-title">我抵抗</span>
              <span class="damage-multiplier">0.5x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in defenseRelations.normalNotVeryEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="defenseRelations.normalNotVeryEffective.length === 0" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card strong-not-very-effective">
            <div class="relation-header">
              <span class="relation-icon">🔰</span>
              <span class="relation-title">强力抵抗</span>
              <span class="damage-multiplier">0.25x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in defenseRelations.strongNotVeryEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="defenseRelations.strongNotVeryEffective.length === 0" class="empty">无</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TYPES, getDualAttackRelations, getDualDefenseRelations, getSingleAttackRelations, getSingleDefenseRelations, getTypeIcon, getTypeName, getTypeColor } from '../../data/types.js'
import './relationPanelStyles.css'

const props = defineProps({
  types: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return Array.isArray(value) && value.length <= 2 && value.every(type => 
        typeof type.id === 'string' && 
        typeof type.name === 'string'
      )
    }
  }
})

const emit = defineEmits(['clear', 'typeClick'])

const attackRelations = computed(() => {
  if (props.types.length === 0) return { superEffective: [], commonNotVeryEffective: [] }
  if (props.types.length === 1) {
    return getSingleAttackRelations(props.types[0].id)
  }
  return getDualAttackRelations(props.types[0].id, props.types[1].id)
})

const defenseRelations = computed(() => {
  if (props.types.length === 0) return { 
    strongSuperEffective: [], 
    normalSuperEffective: [],
    strongNotVeryEffective: [],
    normalNotVeryEffective: []
  }
  if (props.types.length === 1) {
    return getSingleDefenseRelations(props.types[0].id)
  }
  return getDualDefenseRelations(props.types[0].id, props.types[1].id)
})

function handleClear() {
  emit('clear')
}

function handleTypeClick(typeId) {
  emit('typeClick', typeId)
}
</script>

<style scoped>
.dual-relation-panel {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0.625rem;
  background: white;
  color: #1f2937;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  transition: background 0.3s ease;
}

.selected-types {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.selected-type-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--type-bg);
  color: var(--type-color);
  border-radius: 8px;
  border: 1px solid var(--type-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selected-type-badge .type-icon {
  font-size: 1rem;
}

.selected-type-badge .type-name {
  font-size: 0.75rem;
  font-weight: 600;
}

.placeholder-text {
  font-size: 0.85rem;
  opacity: 0.7;
}

.clear-btn {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  padding: 0.25rem 0.625rem;
  color: #3b82f6;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
}

.relations-container {
  padding: 0.875rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  flex: 1;
}

.view-section {
  animation: slideIn 0.3s ease;
}

.relation-card {
  animation: fadeIn 0.3s ease;
}

.relation-card.common-not-very-effective {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-left: 3px solid #22c55e;
}

.relation-card.strong-super-effective {
  background: linear-gradient(135deg, #fee2e2, #fca5a5);
  border-left: 3px solid #991b1b;
}

.relation-card.normal-super-effective {
  background: linear-gradient(135deg, #fff0f0, #ffe0e0);
  border-left: 3px solid #dc2626;
}

.relation-card.strong-not-very-effective {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  border-left: 3px solid #047857;
}

.relation-card.normal-not-very-effective {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-left: 3px solid #22c55e;
}

.common-not-very-effective .damage-multiplier {
  background: #22c55e;
}

.strong-super-effective .damage-multiplier {
  background: #991b1b;
}

.normal-super-effective .damage-multiplier {
  background: #dc2626;
}

.strong-not-very-effective .damage-multiplier {
  background: #047857;
}

.normal-not-very-effective .damage-multiplier {
  background: #22c55e;
}

.welcome-panel {
  padding: 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  flex: 1;
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
  .relations-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .panel-header {
    padding: 0.875rem;
  }
  
  .welcome-panel {
    padding: 1.5rem 1.25rem;
    min-height: 220px;
  }
}

@media (max-width: 768px) {
  .relations-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.875rem;
  }
  
  .panel-header {
    padding: 0.75rem;
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
  .panel-header {
    padding: 0.625rem 0.75rem;
  }
  
  .relations-container {
    grid-template-columns: 1fr;
    padding: 0.625rem;
    gap: 0.625rem;
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

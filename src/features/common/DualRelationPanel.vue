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
    
    <div v-if="types.length > 0" class="relations-container">
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
import { TYPES, getDualAttackRelations, getDualDefenseRelations, getTypeIcon, getTypeName, getTypeColor } from '../../data/types.js'

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
    const single = getDualAttackRelations(props.types[0].id, props.types[0].id)
    return {
      superEffective: single.superEffective,
      commonNotVeryEffective: []
    }
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
    const single = getDualDefenseRelations(props.types[0].id, props.types[0].id)
    return {
      strongSuperEffective: [],
      normalSuperEffective: single.normalSuperEffective,
      strongNotVeryEffective: [],
      normalNotVeryEffective: single.normalNotVeryEffective
    }
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
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
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: var(--type-bg);
  color: var(--type-color);
  border-radius: 8px;
  border: 1px solid var(--type-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selected-type-badge .type-icon {
  font-size: 1.25rem;
}

.selected-type-badge .type-name {
  font-size: 0.8rem;
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
  padding: 0.375rem 0.75rem;
  color: #3b82f6;
  font-size: 0.75rem;
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
  overflow-y: auto;
}

.view-section {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 0.875rem;
  border: 2px solid transparent;
  animation: slideIn 0.3s ease;
}

.view-section.attack-view {
  background: linear-gradient(135deg, #fff8f0, #fff0e0);
  border-color: rgba(251, 146, 60, 0.3);
}

.view-section.defense-view {
  background: linear-gradient(135deg, #f0f8ff, #e8f4fd);
  border-color: rgba(59, 130, 246, 0.3);
}

.view-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}

.view-icon {
  font-size: 1.1rem;
}

.view-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1f2937;
}

.view-desc {
  font-size: 0.6875rem;
  color: #6b7280;
  margin-left: auto;
}

.view-cards {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.relation-card {
  border-radius: 8px;
  padding: 0.75rem;
  transition: all 0.3s ease;
  animation: fadeIn 0.3s ease;
}

.relation-card.super-effective {
  background: linear-gradient(135deg, #fff0f0, #ffe0e0);
  border-left: 3px solid #dc2626;
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

.relation-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.relation-icon {
  font-size: 1rem;
}

.relation-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #374151;
}

.damage-multiplier {
  margin-left: auto;
  font-weight: 700;
  font-size: 0.6875rem;
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
  color: white;
}

.super-effective .damage-multiplier {
  background: #dc2626;
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

.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.mini-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.4rem 0.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--mini-color);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  min-width: 65px;
}

.mini-type.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.mini-type.clickable::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.3s ease;
}

.mini-type.clickable:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  border-color: var(--mini-color);
}

.mini-type.clickable:hover::before {
  left: 100%;
}

.mini-type.clickable:active {
  transform: translateY(-1px) scale(1.02);
}

.mini-icon {
  font-size: 1.1rem;
}

.mini-name {
  line-height: 1.2;
  text-align: center;
}

.empty {
  color: #9ca3af;
  font-style: italic;
  font-size: 0.75rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 1024px) {
  .relations-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .panel-header {
    padding: 0.875rem;
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
  
  .view-section {
    padding: 0.75rem;
  }
  
  .mini-type.clickable {
    padding: 0.3rem 0.4rem;
    font-size: 0.6875rem;
    min-width: 55px;
  }
  
  .mini-icon {
    font-size: 0.95rem;
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
  
  .view-section {
    padding: 0.625rem;
  }
  
  .relation-card {
    padding: 0.5625rem;
  }
  
  .mini-type.clickable {
    padding: 0.25rem 0.35rem;
    font-size: 0.625rem;
    min-width: 50px;
  }
  
  .mini-icon {
    font-size: 0.875rem;
  }
}
</style>

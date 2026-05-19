<template>
  <div class="relation-panel" :style="{ '--type-color': type.color }">
    <div class="panel-header">
      <div class="selected-type">
        <span class="type-icon">{{ getTypeIcon(type.id) }}</span>
        <h2>{{ type.name }}</h2>
      </div>
      <button class="close-btn" @click="$emit('close')" aria-label="关闭面板">
        <span>✕</span>
      </button>
    </div>
    
    <div class="relations-container">
      <section class="view-section attack-view" aria-label="攻击方视角">
        <div class="view-header">
          <span class="view-icon">⚔️</span>
          <span class="view-title">攻击方视角</span>
          <span class="view-desc">我作为攻击方时</span>
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
          
          <div class="relation-card not-very-effective">
            <div class="relation-header">
              <span class="relation-icon">🛡️</span>
              <span class="relation-title">抵抗我</span>
              <span class="damage-multiplier">0.5x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in attackRelations.notVeryEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="attackRelations.notVeryEffective.length === 0" class="empty">无</span>
            </div>
          </div>
        </div>
      </section>
      
      <section class="view-section defense-view" aria-label="受击方视角">
        <div class="view-header">
          <span class="view-icon">🛡️</span>
          <span class="view-title">受击方视角</span>
          <span class="view-desc">我作为受击方时</span>
        </div>
        <div class="view-cards">
          <div class="relation-card super-effective">
            <div class="relation-header">
              <span class="relation-icon">💥</span>
              <span class="relation-title">被克制</span>
              <span class="damage-multiplier">2x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in defenseRelations.superEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="defenseRelations.superEffective.length === 0" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card not-very-effective">
            <div class="relation-header">
              <span class="relation-icon">🔰</span>
              <span class="relation-title">我抵抗</span>
              <span class="damage-multiplier">0.5x</span>
            </div>
            <div class="type-list">
              <button 
                v-for="t in defenseRelations.notVeryEffective" 
                :key="t"
                class="mini-type clickable"
                :style="{ '--mini-color': getTypeColor(t) }"
                @click="handleTypeClick(t)"
                :aria-label="`查看${getTypeName(t)}属性克制关系`"
              >
                <span class="mini-icon">{{ getTypeIcon(t) }}</span>
                <span class="mini-name">{{ getTypeName(t) }}</span>
              </button>
              <span v-if="defenseRelations.notVeryEffective.length === 0" class="empty">无</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TYPES, getAttackRelations, getDefenseRelations, getTypeIcon, getTypeName, getTypeColor } from '../../data/types.js'

const props = defineProps({
  type: {
    type: Object,
    required: true,
    validator: (value) => {
      return typeof value.id === 'string' && 
             typeof value.name === 'string'
    }
  }
})

const emit = defineEmits(['close', 'typeChange'])

const attackRelations = computed(() => getAttackRelations(props.type.id))
const defenseRelations = computed(() => getDefenseRelations(props.type.id))

function handleTypeClick(typeId) {
  const targetType = TYPES.find(t => t.id === typeId)
  if (targetType) {
    emit('typeChange', targetType)
  }
}
</script>

<style scoped>
.relation-panel {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--type-color), rgba(0, 0, 0, 0.7));
  color: white;
}

.selected-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.type-icon {
  font-size: 1.5rem;
}

.selected-type h2 {
  font-size: 1.05rem;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.close-btn span {
  font-size: 0.95rem;
  font-weight: bold;
}

.relations-container {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.view-section {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 0.875rem;
  border: 2px solid transparent;
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
  font-size: 1.15rem;
}

.view-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1f2937;
}

.view-desc {
  font-size: 0.7rem;
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
}

.relation-card.super-effective {
  background: linear-gradient(135deg, #fff0f0, #ffe0e0);
  border-left: 3px solid #dc2626;
}

.relation-card.not-very-effective {
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
  font-size: 1.05rem;
}

.relation-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #374151;
}

.damage-multiplier {
  margin-left: auto;
  font-weight: 700;
  font-size: 0.7rem;
  padding: 0.15rem 0.35rem;
  border-radius: 3px;
}

.super-effective .damage-multiplier {
  background: #dc2626;
  color: white;
}

.not-very-effective .damage-multiplier {
  background: #22c55e;
  color: white;
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4375rem;
}

.mini-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.4rem 0.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
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
}

.mini-type.clickable:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  border-color: var(--mini-color);
}

.mini-icon {
  font-size: 1.15rem;
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

/* 响应式调整 */
@media (max-width: 768px) {
  .relations-container {
    gap: 0.75rem;
    padding: 0.875rem;
  }
  
  .panel-header {
    padding: 0.625rem;
  }
  
  .type-icon {
    font-size: 1.4rem;
  }
  
  .view-section {
    padding: 0.75rem;
  }
  
  .mini-type.clickable {
    padding: 0.35rem 0.45rem;
    min-width: 58px;
  }
  
  .mini-icon {
    font-size: 1rem;
  }
}

@media (max-width: 540px) {
  .panel-header {
    padding: 0.5rem;
  }
  
  .type-icon {
    font-size: 1.3rem;
  }
  
  .relations-container {
    grid-template-columns: 1fr;
    padding: 0.75rem;
    gap: 0.625rem;
  }
  
  .view-section {
    padding: 0.7rem;
  }
  
  .relation-card {
    padding: 0.625rem;
  }
  
  .mini-type.clickable {
    padding: 0.3rem 0.4rem;
    min-width: 55px;
  }
  
  .mini-icon {
    font-size: 1rem;
  }
}
</style>
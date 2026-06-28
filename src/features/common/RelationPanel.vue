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
              <TypeBadge 
                v-for="t in attackRelations.superEffective" 
                :key="t"
                :type-id="t"
                @click="handleTypeClick"
              />
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
              <TypeBadge 
                v-for="t in attackRelations.notVeryEffective" 
                :key="t"
                :type-id="t"
                @click="handleTypeClick"
              />
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
              <TypeBadge 
                v-for="t in defenseRelations.superEffective" 
                :key="t"
                :type-id="t"
                @click="handleTypeClick"
              />
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
              <TypeBadge 
                v-for="t in defenseRelations.notVeryEffective" 
                :key="t"
                :type-id="t"
                @click="handleTypeClick"
              />
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
import { TYPES, getAttackRelations, getDefenseRelations, getTypeIcon } from '../../data/types.js'
import TypeBadge from './TypeBadge.vue'
import './relationPanelStyles.css'

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

.selected-type .type-icon {
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

@media (max-width: 768px) {
  .relations-container {
    gap: 0.75rem;
    padding: 0.875rem;
  }
  
  .panel-header {
    padding: 0.625rem;
  }
  
  .selected-type .type-icon {
    font-size: 1.4rem;
  }
}

@media (max-width: 540px) {
  .panel-header {
    padding: 0.5rem;
  }
  
  .selected-type .type-icon {
    font-size: 1.3rem;
  }
  
  .relations-container {
    grid-template-columns: 1fr;
    padding: 0.75rem;
    gap: 0.625rem;
  }
}
</style>
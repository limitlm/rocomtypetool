<template>
  <div class="multi-relation-panel">
    <div class="panel-header">
      <SelectedTypeHeader
        :types="types"
        :removable="true"
        :show-clear="types.length > 0"
        placeholder="请选择属性"
        @clear="handleClear"
        @remove-type="(id) => $emit('removeType', id)"
      />
    </div>
    
    <div v-if="types.length === 0" class="welcome-panel">
      <div class="welcome-icon">🌟</div>
      <h2>选择属性开始分析</h2>
      <p>从上方选择多个属性，查看配队的打击面和联防面分析</p>
    </div>
    
    <div v-else class="relations-container">
      <div class="scores-section">
        <div class="score-card attack-score">
          <div class="score-icon">⚔️</div>
          <div class="score-info">
            <span class="score-label">打击面</span>
            <span class="score-value">{{ analysis?.attackCoverage.score || 0 }}%</span>
          </div>
          <div class="score-bar">
            <div class="score-fill" :style="{ width: (analysis?.attackCoverage.score || 0) + '%' }"></div>
          </div>
          <span class="score-desc">{{ analysis?.attackCoverage.superEffective.length || 0 }}个属性被克制</span>
        </div>
        
        <div class="score-card defense-score">
          <div class="score-icon">🛡️</div>
          <div class="score-info">
            <span class="score-label">联防面</span>
            <span class="score-value">{{ analysis?.defenseCoverage.score || 0 }}%</span>
          </div>
          <div class="score-bar">
            <div class="score-fill" :style="{ width: (analysis?.defenseCoverage.score || 0) + '%' }"></div>
          </div>
          <span class="score-desc">{{ analysis?.defenseCoverage.resist.length || 0 }}个属性被抵抗</span>
        </div>
      </div>
      
      <section class="view-section attack-view" aria-label="打击面分析">
        <div class="view-header">
          <span class="view-icon">⚔️</span>
          <span class="view-title">打击面分析</span>
          <span class="view-desc">队伍克制的属性</span>
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
                v-for="t in analysis?.attackCoverage.superEffective" 
                :key="t"
                :type-id="t"
                @click="$emit('typeClick', $event)"
              />
              <span v-if="!analysis?.attackCoverage.superEffective.length" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card normal-effective">
            <div class="relation-header">
              <span class="relation-icon">⚖️</span>
              <span class="relation-title">普通伤害</span>
              <span class="damage-multiplier">1x</span>
            </div>
            <div class="type-list">
              <TypeBadge 
                v-for="t in analysis?.attackCoverage.normal" 
                :key="t"
                :type-id="t"
                @click="$emit('typeClick', $event)"
              />
            </div>
          </div>
          
          <div class="relation-card resisted">
            <div class="relation-header">
              <span class="relation-icon">🛡️</span>
              <span class="relation-title">打击盲点</span>
              <span class="damage-multiplier">0.5x</span>
            </div>
            <div class="type-list">
              <TypeBadge 
                v-for="t in analysis?.attackCoverage.resisted" 
                :key="t"
                :type-id="t"
                @click="$emit('typeClick', $event)"
              />
              <span v-if="!analysis?.attackCoverage.resisted.length" class="empty">无</span>
            </div>
          </div>
        </div>
      </section>
      
      <section class="view-section defense-view" aria-label="联防面分析">
        <div class="view-header">
          <span class="view-icon">🛡️</span>
          <span class="view-title">联防面分析</span>
          <span class="view-desc">队伍防御的属性</span>
        </div>
        <div class="view-cards">
          <div class="relation-card weak">
            <div class="relation-header">
              <span class="relation-icon">💥</span>
              <span class="relation-title">弱点</span>
              <span class="damage-multiplier">≥2x</span>
            </div>
            <div class="type-list">
              <TypeBadge 
                v-for="t in analysis?.defenseCoverage.weak" 
                :key="t"
                :type-id="t"
                @click="$emit('typeClick', $event)"
              />
              <span v-if="!analysis?.defenseCoverage.weak.length" class="empty">无</span>
            </div>
          </div>
          
          <div class="relation-card normal-defense">
            <div class="relation-header">
              <span class="relation-icon">⚖️</span>
              <span class="relation-title">普通防御</span>
              <span class="damage-multiplier">1x</span>
            </div>
            <div class="type-list">
              <TypeBadge 
                v-for="t in analysis?.defenseCoverage.normal" 
                :key="t"
                :type-id="t"
                @click="$emit('typeClick', $event)"
              />
            </div>
          </div>
          
          <div class="relation-card resist">
            <div class="relation-header">
              <span class="relation-icon">🔰</span>
              <span class="relation-title">抵抗</span>
              <span class="damage-multiplier">≤0.5x</span>
            </div>
            <div class="type-list">
              <TypeBadge 
                v-for="t in analysis?.defenseCoverage.resist" 
                :key="t"
                :type-id="t"
                @click="$emit('typeClick', $event)"
              />
              <span v-if="!analysis?.defenseCoverage.resist.length" class="empty">无</span>
            </div>
          </div>
        </div>
      </section>
      
      <section v-if="suggestions.length > 0" class="suggestions-section">
        <div class="view-header">
          <span class="view-icon">💡</span>
          <span class="view-title">配队建议</span>
          <span class="view-desc">推荐属性组合</span>
        </div>
        <div class="suggestions-list">
          <div 
            v-for="(suggestion, index) in suggestions.slice(0, 4)" 
            :key="suggestion.typeId"
            class="suggestion-card"
            @click="$emit('addType', suggestion.typeId)"
          >
            <span class="suggestion-rank">{{ index + 1 }}</span>
            <div class="suggestion-type" :style="{ '--type-color': getTypeColor(suggestion.typeId), '--type-bg': getTypeBgColor(suggestion.typeId) }">
              <span class="suggestion-icon">{{ getTypeIcon(suggestion.typeId) }}</span>
              <span class="suggestion-name">{{ getTypeName(suggestion.typeId) }}</span>
            </div>
            <div class="suggestion-stats">
              <span v-if="suggestion.weakReduction > 0" class="stat weak-reduction">
                弱点-{{ suggestion.weakReduction }}
              </span>
              <span v-if="suggestion.attackIncrease > 0" class="stat attack-increase">
                打击+{{ suggestion.attackIncrease }}
              </span>
              <span v-if="suggestion.resistGain > 0" class="stat resist-increase">
                抵抗+{{ suggestion.resistGain }}
              </span>
            </div>
            <span class="suggestion-score">{{ suggestion.totalScore }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TYPES, analyzeMultiTeam, suggestTeamCombinations, getTypeIcon, getTypeName, getTypeColor, getTypeBgColor } from '../../data/types.js'
import TypeBadge from './TypeBadge.vue'
import SelectedTypeHeader from './SelectedTypeHeader.vue'
import './relationPanelStyles.css'

const props = defineProps({
  types: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return Array.isArray(value) && value.length <= 12 && value.every(type => 
        typeof type.id === 'string' && 
        typeof type.name === 'string'
      )
    }
  }
})

const emit = defineEmits(['clear', 'typeClick', 'removeType', 'addType'])

const analysis = computed(() => {
  if (props.types.length === 0) return null
  return analyzeMultiTeam(props.types.map(t => t.id))
})

const suggestions = computed(() => {
  if (props.types.length === 0 || props.types.length >= 12) return []
  return suggestTeamCombinations(props.types.map(t => t.id))
})

function handleClear() {
  emit('clear')
}
</script>

<style scoped>
.multi-relation-panel {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.scores-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
}

.score-card {
  background: white;
  border-radius: 12px;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.score-card.attack-score {
  border-left: 3px solid #f57c00;
}

.score-card.defense-score {
  border-left: 3px solid #22c55e;
}

.score-icon {
  font-size: 1.25rem;
}

.score-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-label {
  font-size: 0.75rem;
  color: #666;
}

.score-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
}

.score-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.attack-score .score-fill {
  background: linear-gradient(90deg, #f57c00, #f97316);
}

.defense-score .score-fill {
  background: linear-gradient(90deg, #22c55e, #4ade80);
}

.score-desc {
  font-size: 0.65rem;
  color: #999;
}

.relations-container {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  flex: 1;
}

.view-section {
  animation: slideIn 0.3s ease;
}

.scores-section {
  grid-column: span 2;
}

.suggestions-section {
  grid-column: span 2;
  padding: 0 0.75rem 0.75rem;
}

.suggestions-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.suggestion-card {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  position: relative;
}

.suggestion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.suggestion-rank {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.4);
}

.suggestion-type {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem;
  background: var(--type-bg);
  border-radius: 8px;
}

.suggestion-icon {
  font-size: 1.1rem;
}

.suggestion-name {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--type-color);
}

.suggestion-stats {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  justify-content: center;
}

.stat {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
}

.weak-reduction {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.attack-increase {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}

.resist-increase {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.suggestion-score {
  font-size: 0.9rem;
  font-weight: 800;
  color: #1e40af;
  text-align: center;
  padding-top: 0.25rem;
  border-top: 1px dashed #bfdbfe;
}

.relation-card {
  animation: fadeIn 0.3s ease;
}

.relation-card.normal-effective {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-left: 3px solid #d97706;
}

.relation-card.resisted {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  border-left: 3px solid #3b82f6;
}

.relation-card.weak {
  background: linear-gradient(135deg, #fee2e2, #fca5a5);
  border-left: 3px solid #dc2626;
}

.relation-card.normal-defense {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-left: 3px solid #d97706;
}

.relation-card.resist {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  border-left: 3px solid #22c55e;
}

.normal-effective .damage-multiplier {
  background: #d97706;
}

.resisted .damage-multiplier {
  background: #3b82f6;
}

.weak .damage-multiplier {
  background: #dc2626;
}

.normal-defense .damage-multiplier {
  background: #d97706;
}

.resist .damage-multiplier {
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
  }
  
  .suggestions-section {
    grid-column: span 2;
  }
  
  .suggestions-list {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .scores-section {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .relations-container {
    grid-template-columns: 1fr;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .suggestions-section {
    grid-column: span 1;
    padding: 0 0 0.5rem;
  }
  
  .suggestions-list {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .scores-section {
    grid-column: span 1;
  }
  
  .welcome-panel {
    padding: 1.5rem 1.25rem;
    min-height: 220px;
  }
}

@media (max-width: 540px) {
  .relations-container {
    padding: 0.375rem;
    gap: 0.375rem;
  }

  .suggestions-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.25rem;
  }

  .suggestion-card {
    padding: 0.25rem;
    gap: 0.25rem;
  }

  .suggestion-type {
    padding: 0.25rem;
    gap: 0.25rem;
  }

  .suggestion-icon {
    font-size: 0.85rem;
  }

  .suggestion-name {
    font-size: 0.55rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .suggestion-rank {
    width: 1rem;
    height: 1rem;
    font-size: 0.55rem;
    top: -4px;
    left: -4px;
  }

  .stat {
    font-size: 0.5rem;
    padding: 0.0625rem 0.125rem;
  }

  .suggestion-score {
    font-size: 0.7rem;
  }

  .scores-section {
    padding: 0.5rem;
    gap: 0.5rem;
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

  .welcome-panel p {
    font-size: 0.75rem;
  }
}
</style>
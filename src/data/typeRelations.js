import { TYPE_ICONS, TYPES, TYPE_CHART, TYPES_MAP } from './typeData.js'

export function getTypeIcon(typeId) {
  return TYPE_ICONS[typeId] || '❓'
}

export function getTypeById(id) {
  return TYPES_MAP.get(id)
}

export function getTypeName(id) {
  const type = getTypeById(id)
  return type ? type.name : id
}

export function getTypeColor(id) {
  const type = getTypeById(id)
  return type ? type.color : '#666'
}

export function getTypeBgColor(id) {
  const type = getTypeById(id)
  return type ? type.bgColor : '#f5f5f5'
}

export function getAttackRelations(typeId) {
  const chart = TYPE_CHART[typeId] || {}
  return {
    superEffective: chart.superEffective || [],
    notVeryEffective: chart.notVeryEffective || []
  }
}

const PRECOMPUTED_DEFENSE_RELATIONS = (() => {
  const cache = {}
  for (const defenderId of Object.keys(TYPE_CHART)) {
    const superEffective = []
    const notVeryEffective = []
    for (const [attackerId, chart] of Object.entries(TYPE_CHART)) {
      if (chart.superEffective?.includes(defenderId)) {
        superEffective.push(attackerId)
      }
      if (chart.notVeryEffective?.includes(defenderId)) {
        notVeryEffective.push(attackerId)
      }
    }
    cache[defenderId] = { superEffective, notVeryEffective }
  }
  return cache
})()

export function getDefenseRelations(typeId) {
  return PRECOMPUTED_DEFENSE_RELATIONS[typeId] || { superEffective: [], notVeryEffective: [] }
}

function getArrayIntersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item))
}

function getArrayUnion(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])]
}

function getDualCacheKey(typeId1, typeId2) {
  const sorted = [typeId1, typeId2].sort()
  return `${sorted[0]}_${sorted[1]}`
}

function getMultiplier(attackerTypeId, defenderTypeId) {
  const attackerRelations = TYPE_CHART[attackerTypeId]
  if (!attackerRelations) return 1
  if (attackerRelations.superEffective?.includes(defenderTypeId)) return 2
  if (attackerRelations.notVeryEffective?.includes(defenderTypeId)) return 0.5
  return 1
}

const PRECOMPUTED_DUAL_RELATIONS = (() => {
  const cache = {}
  const typeIds = Object.keys(TYPE_CHART)
  
  for (let i = 0; i < typeIds.length; i++) {
    for (let j = i; j < typeIds.length; j++) {
      const typeId1 = typeIds[i]
      const typeId2 = typeIds[j]
      const cacheKey = getDualCacheKey(typeId1, typeId2)
      
      const relations1 = getAttackRelations(typeId1)
      const relations2 = getAttackRelations(typeId2)
      const attack = {
        superEffective: getArrayUnion(relations1.superEffective, relations2.superEffective),
        commonNotVeryEffective: getArrayIntersection(relations1.notVeryEffective, relations2.notVeryEffective)
      }
      
      const strongSuperEffective = []
      const normalSuperEffective = []
      const normalNotVeryEffective = []
      const strongNotVeryEffective = []
      
      for (const attackerTypeId of typeIds) {
        const mult1 = getMultiplier(attackerTypeId, typeId1)
        const mult2 = getMultiplier(attackerTypeId, typeId2)
        const totalMult = mult1 * mult2
        
        if (totalMult === 4) {
          strongSuperEffective.push(attackerTypeId)
        } else if (totalMult === 2) {
          normalSuperEffective.push(attackerTypeId)
        } else if (totalMult === 0.5) {
          normalNotVeryEffective.push(attackerTypeId)
        } else if (totalMult === 0.25) {
          strongNotVeryEffective.push(attackerTypeId)
        }
      }
      
      const defense = {
        strongSuperEffective,
        normalSuperEffective,
        strongNotVeryEffective,
        normalNotVeryEffective
      }
      
      cache[cacheKey] = { attack, defense }
    }
  }
  
  return cache
})()

export function getDualAttackRelations(typeId1, typeId2) {
  const cacheKey = getDualCacheKey(typeId1, typeId2)
  return PRECOMPUTED_DUAL_RELATIONS[cacheKey]?.attack || { superEffective: [], commonNotVeryEffective: [] }
}

export function getDualDefenseRelations(typeId1, typeId2) {
  const cacheKey = getDualCacheKey(typeId1, typeId2)
  return PRECOMPUTED_DUAL_RELATIONS[cacheKey]?.defense || {
    strongSuperEffective: [],
    normalSuperEffective: [],
    strongNotVeryEffective: [],
    normalNotVeryEffective: []
  }
}

export function getSingleAttackRelations(typeId) {
  const relations = getAttackRelations(typeId)
  return {
    superEffective: relations.superEffective,
    commonNotVeryEffective: relations.notVeryEffective
  }
}

export function getSingleDefenseRelations(typeId) {
  const relations = getDefenseRelations(typeId)
  return {
    strongSuperEffective: [],
    normalSuperEffective: relations.superEffective,
    strongNotVeryEffective: [],
    normalNotVeryEffective: relations.notVeryEffective
  }
}
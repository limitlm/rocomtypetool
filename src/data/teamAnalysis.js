import { TYPE_CHART } from './typeData.js'

function getMultiplier(attackerTypeId, defenderTypeId) {
  const attackerRelations = TYPE_CHART[attackerTypeId]
  if (!attackerRelations) return 1
  if (attackerRelations.superEffective?.includes(defenderTypeId)) return 2
  if (attackerRelations.notVeryEffective?.includes(defenderTypeId)) return 0.5
  return 1
}

function getMultiCacheKey(typeIds) {
  const sorted = [...typeIds].sort()
  return sorted.join('_')
}

const MULTI_RELATIONS_CACHE = new Map()

export function getMultiAttackCoverage(typeIds) {
  const cacheKey = getMultiCacheKey(typeIds) + '_attack'
  if (MULTI_RELATIONS_CACHE.has(cacheKey)) {
    return MULTI_RELATIONS_CACHE.get(cacheKey)
  }

  const coverage = {}
  for (const targetType of Object.keys(TYPE_CHART)) {
    let maxMultiplier = -Infinity
    for (const attackerId of typeIds) {
      const multiplier = getMultiplier(attackerId, targetType)
      if (multiplier > maxMultiplier) {
        maxMultiplier = multiplier
      }
    }
    coverage[targetType] = maxMultiplier
  }

  MULTI_RELATIONS_CACHE.set(cacheKey, coverage)
  return coverage
}

export function getMultiDefenseCoverage(typeIds) {
  const cacheKey = getMultiCacheKey(typeIds) + '_defense'
  if (MULTI_RELATIONS_CACHE.has(cacheKey)) {
    return MULTI_RELATIONS_CACHE.get(cacheKey)
  }

  const coverage = {}
  for (const attackerType of Object.keys(TYPE_CHART)) {
    let minMultiplier = Infinity
    let maxMultiplier = -Infinity
    for (const defenderId of typeIds) {
      const mult = getMultiplier(attackerType, defenderId)
      if (mult < minMultiplier) {
        minMultiplier = mult
      }
      if (mult > maxMultiplier) {
        maxMultiplier = mult
      }
    }
    coverage[attackerType] = { min: minMultiplier, max: maxMultiplier }
  }

  MULTI_RELATIONS_CACHE.set(cacheKey, coverage)
  return coverage
}

export function analyzeMultiTeam(typeIds) {
  const attackCoverage = getMultiAttackCoverage(typeIds)
  const defenseCoverage = getMultiDefenseCoverage(typeIds)

  const superEffectiveTargets = []
  const normalTargets = []
  const resistedTargets = []

  const weakAgainst = []
  const normalDefense = []
  const resistAgainst = []

  for (const [targetType, multiplier] of Object.entries(attackCoverage)) {
    if (multiplier >= 2) {
      superEffectiveTargets.push(targetType)
    } else if (multiplier === 1) {
      normalTargets.push(targetType)
    } else {
      resistedTargets.push(targetType)
    }
  }

  for (const [attackerType, { min, max }] of Object.entries(defenseCoverage)) {
    if (min < 1) {
      resistAgainst.push(attackerType)
    } else if (max > 1) {
      weakAgainst.push(attackerType)
    } else {
      normalDefense.push(attackerType)
    }
  }

  const attackScore = Math.round((superEffectiveTargets.length / Object.keys(TYPE_CHART).length) * 100)
  const defenseScore = Math.round((resistAgainst.length / Object.keys(TYPE_CHART).length) * 100)

  return {
    attackCoverage: {
      superEffective: superEffectiveTargets,
      normal: normalTargets,
      resisted: resistedTargets,
      score: attackScore
    },
    defenseCoverage: {
      weak: weakAgainst,
      normal: normalDefense,
      resist: resistAgainst,
      score: defenseScore
    },
    typeIds
  }
}

export function suggestTeamCombinations(currentTypeIds, maxSuggestions = 4) {
  const currentAnalysis = analyzeMultiTeam(currentTypeIds)
  const suggestions = []
  const allTypeIds = Object.keys(TYPE_CHART)
  const availableTypeIds = allTypeIds.filter(id => !currentTypeIds.includes(id))
  const currentWeakCount = currentAnalysis.defenseCoverage.weak.length

  for (const typeId of availableTypeIds) {
    const newTeam = [...currentTypeIds, typeId]
    const analysis = analyzeMultiTeam(newTeam)
    
    const weakReduction = currentAnalysis.defenseCoverage.weak.length - analysis.defenseCoverage.weak.length
    const attackIncrease = analysis.attackCoverage.superEffective.length - currentAnalysis.attackCoverage.superEffective.length
    const resistGain = analysis.defenseCoverage.resist.length - currentAnalysis.defenseCoverage.resist.length
    
    const weakPriority = currentWeakCount > 0 ? 2 : 1
    
    const totalScore = attackIncrease * 10 * weakPriority + weakReduction * 20 + resistGain * 5
    
    suggestions.push({
      typeId,
      analysis,
      weakReduction,
      attackIncrease,
      resistGain,
      totalScore
    })
  }

  return suggestions
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, maxSuggestions)
}
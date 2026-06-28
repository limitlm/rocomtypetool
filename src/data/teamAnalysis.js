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
    let totalMultiplier = 1
    for (const defenderId of typeIds) {
      totalMultiplier *= getMultiplier(attackerType, defenderId)
    }
    coverage[attackerType] = totalMultiplier
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

  for (const [attackerType, multiplier] of Object.entries(defenseCoverage)) {
    if (multiplier > 1) {
      weakAgainst.push(attackerType)
    } else if (multiplier === 1) {
      normalDefense.push(attackerType)
    } else {
      resistAgainst.push(attackerType)
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

export function suggestTeamCombinations(currentTypeIds, maxSuggestions = 5) {
  const currentAnalysis = analyzeMultiTeam(currentTypeIds)
  const suggestions = []
  const allTypeIds = Object.keys(TYPE_CHART)
  const availableTypeIds = allTypeIds.filter(id => !currentTypeIds.includes(id))

  for (const typeId of availableTypeIds) {
    const newTeam = [...currentTypeIds, typeId]
    const analysis = analyzeMultiTeam(newTeam)
    
    const weakReduction = currentAnalysis.defenseCoverage.weak.length - analysis.defenseCoverage.weak.length
    const attackIncrease = analysis.attackCoverage.score - currentAnalysis.attackCoverage.score
    
    suggestions.push({
      typeId,
      analysis,
      weakReduction,
      attackIncrease,
      totalScore: analysis.attackCoverage.score + analysis.defenseCoverage.score
    })
  }

  return suggestions
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, maxSuggestions)
}
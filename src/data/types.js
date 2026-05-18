/**
 * 洛克王国属性克制关系数据模块
 * 包含所有属性的定义、克制关系表及查询函数
 */

/**
 * 属性ID常量定义
 */
export const TYPE_IDS = Object.freeze({
  NORMAL: 'normal',
  GRASS: 'grass',
  FIRE: 'fire',
  WATER: 'water',
  LIGHT: 'light',
  GROUND: 'ground',
  ICE: 'ice',
  DRAGON: 'dragon',
  ELECTRIC: 'electric',
  POISON: 'poison',
  BUG: 'bug',
  FIGHTING: 'fighting',
  FLYING: 'flying',
  FAIRY: 'fairy',
  GHOST: 'ghost',
  DARK: 'dark',
  STEEL: 'steel',
  ILLUSION: 'illusion'
})

/**
 * 属性图标映射表
 */
export const TYPE_ICONS = Object.freeze({
  normal: '⭐',
  grass: '🌿',
  fire: '🔥',
  water: '💧',
  light: '✨',
  ground: '🪨',
  ice: '❄️',
  dragon: '🐉',
  electric: '⚡',
  poison: '🫐',
  bug: '🐛',
  fighting: '🥊',
  flying: '🪽',
  fairy: '🩷',
  ghost: '👻',
  dark: '👿',
  steel: '⚙️',
  illusion: '🌀'
})

/**
 * 伤害倍率常量
 */
export const DAMAGE_MULTIPLIERS = Object.freeze({
  SUPER_EFFECTIVE: 2,
  NOT_VERY_EFFECTIVE: 0.5,
  NORMAL: 1
})

/**
 * 属性列表定义
 * 包含18种游戏属性
 */
export const TYPES = [
  { id: 'normal', name: '普通系', color: '#A8A878', bgColor: '#F0F0E8' },
  { id: 'grass', name: '草系', color: '#7CB342', bgColor: '#E8F5E9' },
  { id: 'fire', name: '火系', color: '#F57C00', bgColor: '#FFF3E0' },
  { id: 'water', name: '水系', color: '#1E88E5', bgColor: '#E3F2FD' },
  { id: 'light', name: '光系', color: '#FFD54F', bgColor: '#FFFDE7' },
  { id: 'ground', name: '地系', color: '#8D6E63', bgColor: '#EFEBE9' },
  { id: 'ice', name: '冰系', color: '#4FC3F7', bgColor: '#E1F5FE' },
  { id: 'dragon', name: '龙系', color: '#7B1FA2', bgColor: '#F3E5F5' },
  { id: 'electric', name: '电系', color: '#FFC107', bgColor: '#FFF8E1' },
  { id: 'poison', name: '毒系', color: '#8E24AA', bgColor: '#F3E5F5' },
  { id: 'bug', name: '虫系', color: '#689F38', bgColor: '#E8F5E9' },
  { id: 'fighting', name: '武系', color: '#E65100', bgColor: '#FFF3E0' },
  { id: 'flying', name: '翼系', color: '#42A5F5', bgColor: '#E3F2FD' },
  { id: 'fairy', name: '萌系', color: '#EC407A', bgColor: '#FCE4EC' },
  { id: 'ghost', name: '幽系', color: '#5E35B1', bgColor: '#EDE7F6' },
  { id: 'dark', name: '恶系', color: '#424242', bgColor: '#F5F5F5' },
  { id: 'steel', name: '机械系', color: '#757575', bgColor: '#E0E0E0' },
  { id: 'illusion', name: '幻系', color: '#00BCD4', bgColor: '#E0F7FA' }
]

/**
 * 属性查找Map缓存
 * 将数组转换为Map以实现O(1)时间复杂度的查询
 */
const TYPES_MAP = new Map(TYPES.map(type => [type.id, type]))

/**
 * 克制关系表
 * 定义每个属性作为攻击方时的克制关系
 */
export const TYPE_CHART = {
  normal: {
    superEffective: [],
    notVeryEffective: ['ghost', 'steel', 'ground']
  },
  grass: {
    superEffective: ['water', 'ground', 'light'],
    notVeryEffective: ['fire', 'dragon', 'poison', 'bug', 'flying', 'steel']
  },
  fire: {
    superEffective: ['grass', 'ice', 'bug', 'steel'],
    notVeryEffective: ['water', 'ground', 'dragon']
  },
  water: {
    superEffective: ['fire', 'ground', 'steel'],
    notVeryEffective: ['grass', 'ice', 'dragon']
  },
  light: {
    superEffective: ['dark', 'ghost'],
    notVeryEffective: ['grass', 'ice']
  },
  ground: {
    superEffective: ['fire', 'ice', 'electric', 'poison'],
    notVeryEffective: ['grass', 'fighting']
  },
  ice: {
    superEffective: ['grass', 'ground', 'dragon', 'flying'],
    notVeryEffective: ['fire', 'ice', 'steel']
  },
  dragon: {
    superEffective: ['dragon'],
    notVeryEffective: ['steel']
  },
  electric: {
    superEffective: ['water', 'flying'],
    notVeryEffective: ['grass', 'ground', 'dragon', 'electric']
  },
  poison: {
    superEffective: ['grass', 'fairy'],
    notVeryEffective: ['ground', 'poison', 'ghost', 'steel']
  },
  bug: {
    superEffective: ['grass', 'dark', 'illusion'],
    notVeryEffective: ['fire', 'poison', 'fighting', 'flying', 'ghost', 'steel', 'fairy']
  },
  fighting: {
    superEffective: ['normal', 'ground', 'ice', 'dark', 'steel'],
    notVeryEffective: ['poison', 'bug', 'flying', 'fairy', 'ghost', 'illusion']
  },
  flying: {
    superEffective: ['grass', 'bug', 'fighting'],
    notVeryEffective: ['dragon', 'electric', 'steel', 'ground']
  },
  fairy: {
    superEffective: ['dragon', 'fighting', 'dark'],
    notVeryEffective: ['fire', 'poison', 'steel']
  },
  ghost: {
    superEffective: ['light', 'ghost', 'illusion'],
    notVeryEffective: ['normal', 'dark']
  },
  dark: {
    superEffective: ['poison', 'fairy', 'ghost'],
    notVeryEffective: ['light', 'fighting', 'dark']
  },
  steel: {
    superEffective: ['ground', 'ice', 'fairy'],
    notVeryEffective: ['fire', 'water', 'electric', 'steel']
  },
  illusion: {
    superEffective: ['poison', 'fighting'],
    notVeryEffective: ['light', 'steel', 'illusion']
  }
}

/**
 * 防御关系缓存
 * 预先计算每个属性的防御关系，避免运行时重复计算
 */
const DEFENSE_RELATIONS_CACHE = new Map()

/**
 * 获取属性图标
 * @param {string} typeId - 属性ID
 * @returns {string} 属性对应的emoji图标
 */
export function getTypeIcon(typeId) {
  return TYPE_ICONS[typeId] || '❓'
}

/**
 * 根据ID获取属性对象
 * 使用Map实现O(1)时间复杂度查询
 * @param {string} id - 属性ID
 * @returns {Object|undefined} 属性对象
 */
export function getTypeById(id) {
  return TYPES_MAP.get(id)
}

/**
 * 获取属性名称
 * @param {string} id - 属性ID
 * @returns {string} 属性名称，如果未找到则返回ID
 */
export function getTypeName(id) {
  const type = getTypeById(id)
  return type ? type.name : id
}

/**
 * 获取属性颜色
 * @param {string} id - 属性ID
 * @returns {string} 属性颜色值，如果未找到则返回默认值
 */
export function getTypeColor(id) {
  const type = getTypeById(id)
  return type ? type.color : '#666'
}

/**
 * 获取属性背景色
 * @param {string} id - 属性ID
 * @returns {string} 属性背景色值，如果未找到则返回默认值
 */
export function getTypeBgColor(id) {
  const type = getTypeById(id)
  return type ? type.bgColor : '#f5f5f5'
}

/**
 * 获取攻击关系
 * @param {string} typeId - 属性ID
 * @returns {Object} 包含superEffective和notVeryEffective数组
 */
export function getAttackRelations(typeId) {
  const chart = TYPE_CHART[typeId] || {}
  return {
    superEffective: chart.superEffective || [],
    notVeryEffective: chart.notVeryEffective || []
  }
}

/**
 * 获取防御关系
 * 使用缓存机制优化性能
 * @param {string} typeId - 属性ID
 * @returns {Object} 包含superEffective和notVeryEffective数组
 */
export function getDefenseRelations(typeId) {
  if (DEFENSE_RELATIONS_CACHE.has(typeId)) {
    return DEFENSE_RELATIONS_CACHE.get(typeId)
  }

  const superEffective = []
  const notVeryEffective = []

  for (const [attackerId, chart] of Object.entries(TYPE_CHART)) {
    if (chart.superEffective?.includes(typeId)) {
      superEffective.push(attackerId)
    }
    if (chart.notVeryEffective?.includes(typeId)) {
      notVeryEffective.push(attackerId)
    }
  }

  const result = { superEffective, notVeryEffective }
  DEFENSE_RELATIONS_CACHE.set(typeId, result)

  return result
}

/**
 * 双属性克制关系缓存
 */
const DUAL_RELATIONS_CACHE = new Map()

/**
 * 获取两个数组的交集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 交集数组
 */
function getArrayIntersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item))
}

/**
 * 获取两个数组的并集（去重）
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 并集数组
 */
function getArrayUnion(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])]
}

/**
 * 从数组中移除指定元素
 * @param {Array} arr - 原数组
 * @param {Array} itemsToRemove - 要移除的元素数组
 * @returns {Array} 新数组
 */
function removeItemsFromArray(arr, itemsToRemove) {
  return arr.filter(item => !itemsToRemove.includes(item))
}

/**
 * 生成双属性组合的缓存键
 * @param {string} typeId1 - 第一个属性ID
 * @param {string} typeId2 - 第二个属性ID
 * @returns {string} 缓存键
 */
function getDualCacheKey(typeId1, typeId2) {
  const sorted = [typeId1, typeId2].sort()
  return `${sorted[0]}_${sorted[1]}`
}

/**
 * 获取双属性攻击关系
 * @param {string} typeId1 - 第一个属性ID
 * @param {string} typeId2 - 第二个属性ID
 * @returns {Object} 包含superEffective和commonNotVeryEffective数组
 */
export function getDualAttackRelations(typeId1, typeId2) {
  const cacheKey = getDualCacheKey(typeId1, typeId2)
  if (DUAL_RELATIONS_CACHE.has(cacheKey)) {
    const cached = DUAL_RELATIONS_CACHE.get(cacheKey)
    return cached.attack
  }

  const relations1 = getAttackRelations(typeId1)
  const relations2 = getAttackRelations(typeId2)

  const result = {
    superEffective: getArrayUnion(relations1.superEffective, relations2.superEffective),
    commonNotVeryEffective: getArrayIntersection(relations1.notVeryEffective, relations2.notVeryEffective)
  }

  // 缓存完整的双属性关系
  if (!DUAL_RELATIONS_CACHE.has(cacheKey)) {
    DUAL_RELATIONS_CACHE.set(cacheKey, { attack: result, defense: null })
  } else {
    DUAL_RELATIONS_CACHE.get(cacheKey).attack = result
  }

  return result
}

/**
 * 获取双属性防御关系
 * @param {string} typeId1 - 第一个属性ID
 * @param {string} typeId2 - 第二个属性ID
 * @returns {Object} 包含被克制、强力克制、抵抗、强力抵抗的属性数组
 */
export function getDualDefenseRelations(typeId1, typeId2) {
  const cacheKey = getDualCacheKey(typeId1, typeId2)
  if (DUAL_RELATIONS_CACHE.has(cacheKey)) {
    const cached = DUAL_RELATIONS_CACHE.get(cacheKey)
    if (cached.defense) {
      return cached.defense
    }
  }

  const relations1 = getDefenseRelations(typeId1)
  const relations2 = getDefenseRelations(typeId2)

  // 被克制关系
  const allSuperEffective = getArrayUnion(relations1.superEffective, relations2.superEffective)
  const superEffectiveIntersection = getArrayIntersection(relations1.superEffective, relations2.superEffective)
  const strongSuperEffective = superEffectiveIntersection
  const normalSuperEffective = removeItemsFromArray(allSuperEffective, superEffectiveIntersection)

  // 抵抗关系
  const allNotVeryEffective = getArrayUnion(relations1.notVeryEffective, relations2.notVeryEffective)
  const notVeryEffectiveIntersection = getArrayIntersection(relations1.notVeryEffective, relations2.notVeryEffective)
  const strongNotVeryEffective = notVeryEffectiveIntersection
  const normalNotVeryEffective = removeItemsFromArray(allNotVeryEffective, notVeryEffectiveIntersection)

  const result = {
    strongSuperEffective,
    normalSuperEffective,
    strongNotVeryEffective,
    normalNotVeryEffective
  }

  // 缓存完整的双属性关系
  if (!DUAL_RELATIONS_CACHE.has(cacheKey)) {
    DUAL_RELATIONS_CACHE.set(cacheKey, { attack: null, defense: result })
  } else {
    DUAL_RELATIONS_CACHE.get(cacheKey).defense = result
  }

  return result
}

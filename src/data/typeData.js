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

export const TYPES_MAP = new Map(TYPES.map(type => [type.id, type]))
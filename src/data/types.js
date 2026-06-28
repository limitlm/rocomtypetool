export { TYPE_IDS, TYPE_ICONS, TYPES, TYPE_CHART, TYPES_MAP } from './typeData.js'
export { 
  getTypeIcon, 
  getTypeById, 
  getTypeName, 
  getTypeColor, 
  getTypeBgColor,
  getAttackRelations,
  getDefenseRelations,
  getDualAttackRelations,
  getDualDefenseRelations,
  getSingleAttackRelations,
  getSingleDefenseRelations
} from './typeRelations.js'
export {
  getMultiAttackCoverage,
  getMultiDefenseCoverage,
  analyzeMultiTeam,
  suggestTeamCombinations
} from './teamAnalysis.js'
/**
 * 功能模块配置文件
 * 统一管理所有功能模块的配置，支持配置化扩展
 */

// 功能模块ID枚举
export const FEATURE_IDS = {
  SINGLE_QUERY: 'single-query',
  DUAL_QUERY: 'dual-query',
  MULTI_QUERY: 'multi-query'
}

// 功能模块基础配置
export const FEATURE_CONFIGS = [
  {
    id: FEATURE_IDS.SINGLE_QUERY,
    name: '单属查询',
    icon: '🔍',
    description: '查询单个属性的克制关系',
    componentPath: './single-query/SingleQuery.vue',
    enabled: true
  },
  {
    id: FEATURE_IDS.DUAL_QUERY,
    name: '双属查询',
    icon: '⚡',
    description: '查询双属性的克制关系',
    componentPath: './dual-query/DualQuery.vue',
    enabled: true
  },
  {
    id: FEATURE_IDS.MULTI_QUERY,
    name: '多属查询',
    icon: '🌟',
    description: '查询多属性的克制关系',
    componentPath: './multi-query/MultiQuery.vue',
    enabled: true
  }
]

/**
 * 获取启用的功能模块配置
 * @returns {Array} 启用的功能模块配置数组
 */
export function getEnabledFeatures() {
  return FEATURE_CONFIGS.filter(config => config.enabled)
}

/**
 * 根据ID获取功能模块配置
 * @param {string} id - 功能模块ID
 * @returns {Object|null} 功能模块配置
 */
export function getFeatureById(id) {
  return FEATURE_CONFIGS.find(config => config.id === id) || null
}

/**
 * 根据功能模块配置动态加载组件
 * @param {Object} featureConfig - 功能模块配置
 * @returns {Promise<Component>} 组件Promise
 */
export function loadFeatureComponent(featureConfig) {
  return import(featureConfig.componentPath)
}

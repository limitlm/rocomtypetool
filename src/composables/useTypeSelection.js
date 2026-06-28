import { ref } from 'vue'
import { TYPES } from '../data/types.js'

export function useTypeSelection(maxSelections = 1) {
  const selectedTypes = ref([])

  function handleTypesUpdate(types) {
    selectedTypes.value = types
  }

  function handleClear() {
    selectedTypes.value = []
  }

  function handleTypeClick(typeId) {
    const index = selectedTypes.value.findIndex(t => t.id === typeId)
    if (index !== -1) {
      selectedTypes.value.splice(index, 1)
    } else {
      const type = TYPES.find(t => t.id === typeId)
      if (type) {
        if (maxSelections === 1) {
          selectedTypes.value = [type]
        } else if (selectedTypes.value.length < maxSelections) {
          selectedTypes.value = [...selectedTypes.value, type]
        }
      }
    }
  }

  function handleRemoveType(typeId) {
    const index = selectedTypes.value.findIndex(t => t.id === typeId)
    if (index !== -1) {
      selectedTypes.value.splice(index, 1)
    }
  }

  function handleAddType(typeId) {
    const type = TYPES.find(t => t.id === typeId)
    if (type && !selectedTypes.value.some(t => t.id === typeId) && selectedTypes.value.length < maxSelections) {
      selectedTypes.value = [...selectedTypes.value, type]
    }
  }

  return {
    selectedTypes,
    handleTypesUpdate,
    handleClear,
    handleTypeClick,
    handleRemoveType,
    handleAddType
  }
}
<template>
  <button
    class="mini-type clickable"
    :style="{ '--mini-color': getTypeColor(typeId) }"
    @click="$emit('click', typeId)"
    :aria-label="`查看${getTypeName(typeId)}属性克制关系`"
  >
    <span class="mini-icon">{{ getTypeIcon(typeId) }}</span>
    <span class="mini-name">{{ getTypeName(typeId) }}</span>
  </button>
</template>

<script setup>
import { getTypeIcon, getTypeName, getTypeColor } from '../../data/types.js'

defineProps({
  typeId: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>
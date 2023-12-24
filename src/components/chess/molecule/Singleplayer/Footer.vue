<script setup lang="ts">
import { BaseButton } from 'kneekeetah-vue-ui-kit';
defineProps<{
  movesAmount: number,
}>();
const emit = defineEmits<{
  (e: 'leave'): void,
}>();
</script>
<template>
  <div class="h-12 items-center px-3">
    <div class="h-full flex justify-between items-center">
      <BaseButton flat color="alert" @click="emit('leave')">Leave</BaseButton>
      <small>Moves: {{ movesAmount }}</small>
    </div>
  </div>
</template>
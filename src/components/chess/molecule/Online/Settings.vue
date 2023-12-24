<script setup lang="ts">
import { BaseButton, useToast } from 'kneekeetah-vue-ui-kit';
</script>
<template>
  <div class="flex flex-col text-gray-300 w-full gap-4">
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <small>You're playing with Nikitosik</small>
        <BaseButton flat color="warning" @click="useToast().add({ content: 'Coming soon. Maybe.' })">Friendship
        </BaseButton>
      </div>
    </div>
    <BaseButton flat color="alert" width="100%" @click="$emit('leave')">Leave</BaseButton>
  </div>
</template>

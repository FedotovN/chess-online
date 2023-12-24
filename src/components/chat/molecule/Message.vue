<template>
  <div class="rounded inline-flex" :class="{
    'self-end bg-indigo-500 text-white': isOur,
    'self-start bg-white text-gray-700': !isOur
  }">
    <div class="flex flex-col px-2 py-1">
      <ChatAtomMessageTextContent>{{ content }}</ChatAtomMessageTextContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageContent } from '~/types/chat/Message';
defineProps<{
  isOur: boolean,
  content: MessageContent,
}>();
</script>
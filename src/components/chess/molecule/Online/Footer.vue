<template>
  <div class="min-h-[200px] h-full max-h-[50%] w-full rounded border border-neutral-700 overflow-hidden"
    v-show="toShowChat">
    <div class="flex flex-col w-full h-full text-gray-300 overflow-hidden">
      <header class="flex justify-between items-center h-10 border-b border-neutral-700 px-2">
        <p class="text-xs">Chat</p>
        <BaseButton flat color="alert" @click="toShowChat = false"><i class="fa-solid fa-xmark"></i></BaseButton>
      </header>
      <div class="h-full overflow-hidden">
        <ChatOrganismChat :chat-id="gameId" :uid="userId" @new-message="$emit('new-message', $event)" ref="chat" />
      </div>
    </div>
  </div>
  <div class="flex justify-between items-center text-gray-300" v-show="!toShowChat">
    <p class="text-sm">Chat is hidden</p>
    <BaseButton flat @click="toShowChat = true">Open</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from "kneekeetah-vue-ui-kit";
import type Message from "~/types/chat/Message";
const chat = ref(null) as Ref<any>;
defineEmits<{
  (e: 'new-message', value: Message): void;
}>();
defineProps<{
  gameId: string,
  userId: string,
}>();
const toShowChat = ref();
watch(toShowChat, v => {
  if (!v) return;
  nextTick(() => chat.value.checkHeight());
})
</script>
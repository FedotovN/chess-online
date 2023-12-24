<template>
  <div
    class="flex justify-between items-center w-full text-gray-300 min-h-[calc(12_*_.25rem)] border-b border-neutral-700 px-3">
    <div class="flex w-full justify-between items-center gap-2 overflow-hidden" v-if="getOpponent">
      <div class="flex items-center gap-2 overflow-hidden">
        <UserAtomPhoto :photo-url="getOpponent.photoURL" />
        <small class="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{{ getOpponent.displayName }}</small>
      </div>
      <i class="fa-solid fa-gear text-xl hover:text-green-300 transition-colors cursor-pointer" @click="openSettings"></i>
    </div>
    <div class="flex items-center justify-between w-full" v-else>
      <div class="flex items-center gap-2">
        <BaseLoader />
        <small class="sm:inline hidden">Waiting for opponent</small>
        <div class="flex gap-2">
          <small @click="copyInviteLink"
            class="whitespace-nowrap text-blue-400 hover:text-blue-500 select-none cursor-pointer">Invite
            link</small>
          <small @click="copyId"
            class="whitespace-nowrap text-blue-400 hover:text-blue-500 select-none cursor-pointer">Room id</small>
        </div>
      </div>
      <BaseButton flat color="alert" @click="emit('leave')">Leave</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Settings from "./Settings.vue";
import { BaseLoader, useToast, useModal, BaseButton } from "kneekeetah-vue-ui-kit"
const { currGame, getOpponent } = storeToRefs(useGame());
const { add, open } = useModal();
add({ id: 'settings-modal', component: Settings, header: 'Settings', });
const id = computed(() => currGame.value?.id);
const emit = defineEmits<{
  (e: 'chat'): void;
  (e: 'leave'): void;
}>();
function copyInviteLink() {
  if (!id.value) return;
  const inviteLink = `${window.location.host}/game/invite/${id.value}`
  navigator.clipboard.writeText(inviteLink);
  useToast().add({ content: "Invite link copied to clipboard", delay: 5000 });
}
function copyId() {
  if (!id.value) return;
  navigator.clipboard.writeText(`${id.value}`);
  useToast().add({ content: "Room id copied to clipboard", delay: 5000 });
}
function openSettings() {
  open({
    id: 'settings-modal', emits: {
      leave: () => emit('leave')
    }
  })
}
</script>
<template>
    <div class="flex justify-between items-center w-full text-gray-300 h-12">
        <div class="flex items-center gap-2 overflow-hidden" v-if="getOpponent">
            <div class="flex items-center gap-2 overflow-hidden">
                <UserAtomPhoto :photo-url="getOpponent.photoURL" />
                <small class="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{{ getOpponent.displayName }}</small>
            </div>
            <div class="flex items-center flex-1 w-full">
                <div class="lg:hidden flex gap-3 items-center w-full">
                    <div class="flex items-center gap-1">
                        <BaseButton flat class="w-full whitespace-nowrap" @click="emit('chat')">
                            Go to chat
                        </BaseButton>
                    </div>
                </div>
                <small class="w-full text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                    <span :class="getMovingSide === getPlayerSide ? 'text-green-300' : 'text-red-300'">{{ uppercasedCurrentSide }}</span>
                    to move
                </small>
            </div>
        </div>
        <div class="flex items-center gap-2" v-else>
            <BaseLoader />
            <small class="text-sm">Waiting for opponent</small>
            <div @click="copy" class="h-full flex-1 group text-end cursor-pointer">
                <small class="text-blue-400 group-hover:text-blue-500 select-none">Invite link</small>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { BaseLoader, useToast, BaseButton } from "kneekeetah-vue-ui-kit"
    const { getMovingSide, getOpponent, getPlayerSide, currGame } = storeToRefs(useGame());
    const uppercasedCurrentSide = computed(() => getMovingSide.value ? getMovingSide.value[0].toUpperCase() + getMovingSide.value.slice(1) : '' );
    const id = computed(() => currGame.value?.id);
    const emit = defineEmits<{
        (e: 'chat'): void;
    }>();
    function copy() {
        if (!id.value) return;
        const inviteLink = `${window.location.host}/game/invite/${id.value}`
        navigator.clipboard.writeText(inviteLink);
        useToast().add({ content: "Invite link copied to clipboard", delay: 5000 });
    }
</script>
<script lang="ts" setup>
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    import { type GameOverInfo } from '~/types/chess/Game';
    const emit = defineEmits<{
        (e: 'rematch'): void,
        (e: 'leave'): void,
    }>();
    const props = defineProps<{
        gameOverInfo: GameOverInfo,
    }>()
    const winner = computed(() => props.gameOverInfo.winner);
    const uppercasedWinner = computed(() => winner.value ? winner.value.side[0].toUpperCase() + winner.value.side.slice(1) : '');
</script>
<template>
    <div class="flex flex-col gap-2 w-full pb-2 text-gray-300">
        <div class="flex flex-col items-center" v-if="gameOverInfo.type">
            <h1 class="text-4xl text-gray-400">{{ gameOverInfo.type }}</h1>
            <p v-if="winner" class="text-2xl">{{ uppercasedWinner }} wins</p>            
        </div>
        <div class="flex flex-col items-center w-full gap-4">
            <div class="flex flex-col items-center">
                <small class="font-bold">You can either</small>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <BaseButton color="success" @click="emit('rematch')">New room</BaseButton>
                <div class="relative h-6">
                    <span class="h-px top-1/2 w-full absolute bg-neutral-600"></span>
                    <small class="absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 px-2 bg-neutral-800 z-10 font-bold">or</small>
                </div>
                <BaseButton @click="emit('leave')">Leave</BaseButton>
            </div>
        </div>
    </div>
</template>

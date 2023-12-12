<script lang="ts" setup>
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    import { GameOverType, type GameOverInfo } from '~/types/chess/Game';
    const emit = defineEmits<{
        (e: 'rematch'): void,
        (e: 'bruh'): void,
    }>();
    const props = withDefaults(defineProps<{
        gameOverInfo: GameOverInfo,
    }>(), { 
        gameOverInfo: {
            movesAmount: 0, type: GameOverType.CHECKMATE, winner: 'white', time: '0',
        }
    });
    const info = computed(() => props.gameOverInfo);
    const uppercasedWinner = computed(() => info.value?.winner ? info.value.winner[0].toUpperCase() + info.value.winner?.slice(1) : '');
    function onLeave() {
        console.log('bruh');
        emit('bruh');
    }
</script>
<template>
    <div class="flex flex-col gap-2 w-full pb-2 text-gray-300">
        <div class="flex flex-col items-center" v-if="gameOverInfo.type">
            <h1 class="text-4xl text-gray-400">{{ gameOverInfo.type }}</h1>
            <p v-if="gameOverInfo.winner" class="text-2xl">{{ uppercasedWinner }} wins</p>            
        </div>
        <div class="flex flex-col items-center w-full gap-4">
            <div class="flex flex-col items-center">
                <p class="text-lg font-bold">Such a good game!</p>
                <small class="font-bold">You can either</small>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <BaseButton color="success" @click="emit('rematch')">Rematch</BaseButton>
                <div class="relative h-6">
                    <span class="h-px top-1/2 w-full absolute bg-neutral-600"></span>
                    <small class="absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 px-2 bg-neutral-800 z-10 font-bold">or</small>
                </div>
                <BaseButton @click="onLeave">Leave</BaseButton>
            </div>
        </div>
    </div>
</template>

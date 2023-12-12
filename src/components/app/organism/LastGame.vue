<script setup lang="ts">
    import { GameOverType, type GameOverInfo } from '~/types/chess/Game';
    import { BaseTooltip } from 'kneekeetah-vue-ui-kit';
    import { getPositionNameByPosition } from '~/types/chess/Position';
    const { user } = storeToRefs(useAuth());
    const gameOverInfo: GameOverInfo = {
        moves: [ 
            {
                figure: 'bishop',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'white',
            },
            {
                figure: 'bishop',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'white',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },{
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            },
            {
                figure: 'king',
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 },
                side: 'black',
            }
         ],
        type: GameOverType.CHECKMATE,
        winnerSide: 'white',
        winnerUid: user.value.uid
    }
    const wonTheGame = computed(() => gameOverInfo.winnerUid && gameOverInfo.winnerUid === user.value?.uid);
    const playerSide = computed(() => 'white');
</script>
<template>
    <div class="flex flex-col gap-4 px-3 max-w-full overflow-hidden">
        <div class="flex w-full justify-center">
            <h1 class="text-2xl whitespace-nowrap text-ellipsis overflow-hidden">Last game</h1>
        </div>        
        <div class="w-full border border-neutral-800 rounded shadow px-3 py-2 overflow-hidden max-w-full">
            <div class="flex flex-col gap-3 w-full max-w-full">
                <div class="flex justify-between items-center">
                    <h2 class="text-3xl">
                        {{ gameOverInfo.type }}
                    </h2>
                    <i class="text-6xl fa-solid fa-smile text-green-300" v-if="wonTheGame === true"></i>
                    <i class="text-6xl fa-solid fa-face-sad-cry text-red-300" v-else-if="wonTheGame === false"></i>
                    <i class="text-6xl fa-solid fa-chess text-blue-300" v-else></i>
                </div>
                <div class="flex w-full justify-between">
                    <div class="flex gap-2 items-center">
                        <h2 class="text-xl text-green-300" v-if="wonTheGame === true">Win</h2>
                        <h2 class="text-xl text-red-300" v-else-if="wonTheGame === false">Lose</h2>
                        <h2 class="text-xl text-blue-300" v-else>Draw</h2>
                        <span class="h-2 w-2 bg-gray-300 rounded-full" v-if="wonTheGame === true || wonTheGame === false"></span>
                        <p><span class="font-bold">40</span> moves</p>
                    </div>
                </div>
                <div class="flex flex-col gap-2 overflow-hidden max-w-full">
                    <div class="flex gap-2 items-center">
                        <p class="text-lg font-bold">Last moves</p>
                    </div>
                    <div class="flex gap-4 overflow-hidden max-w-full rounded-lg shadow-inner shadow-black border border-gray-900 p-3">
                        <div class="relative flex justify-center items-center rounded-full h-10 aspect-square border-2" :class="{ 'border-green-300': move.side === playerSide }" v-for="move in gameOverInfo.moves">
                            <img :src="getSvgSrcFromFigure(move.side, move.figure)" class="relative h-[85%] z-10">
                            <span class="absolute h-1 w-4 -right-1/2 mr-px" :class="{ 'bg-green-300': move.side === playerSide, 'bg-gray-300': move.side !== playerSide }"></span>
                            <BaseTooltip allow-h-t-m-l>
                                <p>{{ move.side }} moves his {{ move.figure }} from {{ getPositionNameByPosition(move.from) }} to {{ getPositionNameByPosition(move.to) }}</p>
                            </BaseTooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
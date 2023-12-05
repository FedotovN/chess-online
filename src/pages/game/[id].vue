<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    const { id } = useRoute().params;
    const { updateBoard } = useGame();
    const { getBoard, getOpponent, getPlayerSide, getCurrentSide } = storeToRefs(useGame());
    const { loading } = useGameRoom(id as string);
    const board = computed({
        get() {
            return getBoard.value
        },
        async set(board: Board | null) {
            if (!board) return;
            console.log(board);
            
            await updateBoard(board);
        }
    })
    function onMenuOpen() {
        console.log(onMenuOpen);
    }
</script>
<template>
    <div class="h-screen w-full flex flex-col" v-show="!loading">
        <div class="flex-1 flex justify-center items-center bg-neutral-800  flex-col gap-2 w-full" v-if="board">
              <div class="flex flex-col justify-center items-center gap-2 px-3">
                  <ChessMoleculeBoardHeader />
                  <ChessOrganismBoard v-model="board" :disabled="!getOpponent" :player-side="getPlayerSide" :current-side="getCurrentSide" />
                  <BaseButton flat width="100%" @click="onMenuOpen" color="none">Menu</BaseButton>
              </div>
        </div>
    </div>
</template>

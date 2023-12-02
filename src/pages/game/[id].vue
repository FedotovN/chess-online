<script setup lang="ts">
    import { BaseButton, BaseLoader, useModal, useToast } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
import type { GameOverInfo } from '~/types/chess/Game';
    const { id } = useRoute().params;
    const { leave, updateBoard } = useGame();
    const { getOpponent, getBoard, getPlayerSide, getCurrentSide } = storeToRefs(useGame());
    const { add } = useToast();
    const { add: modal, open } = useModal();
    const { push } = useRouter();
    const { loading } = useGameRoom(id as string);
    const gameOverInfo: Ref<GameOverInfo | null> = ref(null)
    const board = computed({
        get() {
            return getBoard.value
        },
        async set(board: Board | null) {
            if (!board) return;
            const newSide = getCurrentSide.value === 'white' ? 'black' : 'white';
            await updateBoard(board, newSide);
        }
    })
    async function quit() {
        loading.value = true;
        await push("/");
        await leave();
        add({ content: `You've left the game`, delay: 5000 });
    }
    watch(board, () => {
        const go = board.value?.isGameOver();
        if (go) {
            const { losed } = go;
            gameOverInfo.value = go;
            modal({
                header: `${losed ? losed === getOpponent.value?.side ? 'You won' : 'You lose' : 'Stalemate'}`,        
                content: `
                    Game over, moves made: ${gameOverInfo.value.movesAmount}\n
                    Time played: ${gameOverInfo.value.time}
                `,
                id: 'game-over-modal',
            })
            open('game-over-modal');
        }
    }, { deep: true });
</script>
<template>
    <div class="h-screen w-full flex flex-col" v-show="!loading">
        <div class="flex items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 z-10 px-2 py-2 w-64 text-center rounded shadow bg-white" v-if="!getOpponent">
            <BaseLoader />
            <small class="text-gray-800">Waiting for opponent</small>
        </div>
        <div class="flex-1 flex justify-center items-center bg-[#363635] flex-col gap-2" v-if="board">
              <div class="max-w-full px-3">
                  <ChessOrganismBoard v-model="board" :disabled="!getOpponent" :player-side="getPlayerSide" :current-side="getCurrentSide" />
              </div>
              <div class="flex gap-2">
                  <BaseButton color="alert" width="125px" @click="quit">Leave</BaseButton>
              </div>
        </div>
    </div>
</template>

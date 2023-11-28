<script setup lang="ts">
    import { useModal, useToast } from 'kneekeetah-vue-ui-kit';
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
                content: `Game over, moves made: ${gameOverInfo.value.movesAmount}`,
                id: 'game-over-modal',
            })
            open('game-over-modal');
        }
    }, { deep: true });
</script>
<template>
    <div class="h-screen w-full flex flex-col" v-show="!loading">
        <ChessOrganismHeader :game-id="(id as string)" :opponent="getOpponent" :current-side="getCurrentSide" @quit="quit" /> 
        <div class="flex-1 flex justify-center items-center">
            <div class="flex gap-2">
                {{ board?.isCheckmate('white') }}
                <div class="h-[500px] w-[500px]" v-if="board">
                    <ChessOrganismBoard v-model="board" :player-side="getPlayerSide" :current-side="getCurrentSide" />
                </div>
            </div>
        </div>
    </div>
</template>

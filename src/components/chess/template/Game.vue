<script setup lang="ts">
    import PromotedPawnForm from '../molecule/PromotedPawnForm.vue';
    import GameOverOverview from '../molecule/GameOverOverview.vue';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    import type Figure from '~/models/chess/figures/Figure';
    const { getPlayerSide, getCurrentSide, getOpponent, getBoard } = storeToRefs(useGame());
    const { updateBoard } = useGame();
    const toDisableBoard = computed(() => !getOpponent.value);
    const canPromote = computed(() => board.value?.getPromotedPawn(getPlayerSide.value!));
    const isGameOver = computed(() => !!board.value?.isGameOver());
    const { add, open, close } = useModal();
    const footer = ref(null);
    add({ header: 'Promote a pawn', component: PromotedPawnForm, id: 'promote-pawn' });
    add({ header: 'Game over', component: GameOverOverview, id: 'game-over' });    
    async function promotePawn() {
        const pawn = board.value.getCell(canPromote.value.position).figure;
        open('promote-pawn', { 'pawn': pawn, side: getPlayerSide.value }, { promote: async (figure: Figure) => {
                board.value.getCell(figure.position).figure = figure;
                await updateBoard(board.value);
                close();
            }
        })
    }
    const board = computed({
        get() {
            return getBoard.value as Board
        },
        async set(board: Board) {
            if (canPromote.value) promotePawn();
            else {
                await updateBoard(board);
            }
        }
    })
    watch(isGameOver, v => {
        if (!v) return;
        open('game-over', { gameOverInfo: board.value?.isGameOver() });
    })
</script>
<template>
    <div class="flex flex-col w-full h-full">
        <ChessMoleculeBoardHeader />
            <div class="overflow-hidden flex-1 w-full flex gap-2 justify-center items-center" v-if="board">
                <div class="hidden lg:flex rounded overflow-hidden max-h-full w-full border shadow bg-gray-100 aspect-square">
                    Chat
                </div>
                  <div class="w-full h-full items-center justify-center flex flex-col px-2">
                    <ChessOrganismBoard
                        v-model="board"
                        :disabled="toDisableBoard"
                        :player-side="getPlayerSide"
                        :current-side="getCurrentSide"
                    />
                  </div>
                  <div class="hidden xl:flex rounded overflow-hidden max-h-full w-full border shadow bg-gray-100 aspect-square">
                        Moves
                  </div>
            </div>
            <ChessMoleculeBoardFooter ref="footer" />
    </div>
</template>
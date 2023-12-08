<script setup lang="ts">
    import { useModal, useToast } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    import GameOverOverview from "~/components/chess/molecule/GameOverOverview.vue";
    const { id } = useRoute().params;
    const { updateBoard } = useGame();
    const { getBoard, getOpponent, getPlayerSide, getCurrentSide } = storeToRefs(useGame());
    const { loading } = useGameRoom(id as string);
    const { add, open } = useModal();
    const board = computed(() => getBoard.value );
    async function onBoardUpdate(board: Board) {
        try {
            const promotable = board.getPromotedPawns(getPlayerSide.value);
            if (promotable.length) {
                // Do something to promote the pawn, and only then...
            }
            await updateBoard(board);
        }
        catch(e) {
            console.log('HERE');
            
            useToast().add({ content: "Error while making a move", color: 'alert', delay: 5000 });
        }
    }
    const isGameOver = computed(() => !!board.value?.isGameOver());
    const disableBoard = computed(() => !!isGameOver.value || !getOpponent);
    watch(isGameOver, value => {
        if (!value) return;
        add({ id: 'game-over-modal', header: 'Game over', component: GameOverOverview  });
        open('game-over-modal');
    });
</script>
<template>
    <div class="overflow-hidden h-screen flex justify-center items-center flex-col bg-neutral-800 px-2" v-show="!loading">
        <ChessMoleculeBoardHeader />
        <div class="overflow-hidden flex-1 w-full flex gap-2 justify-center items-center" v-if="board">
            <div class="hidden lg:flex rounded overflow-hidden max-h-full w-full border shadow bg-gray-100 aspect-square">
                Chat
            </div>
              <div class="w-full h-full items-center justify-center flex flex-col px-2">
                  <ChessOrganismBoard :value="board" @update="onBoardUpdate" :disabled="disableBoard" :player-side="getPlayerSide" :current-side="getCurrentSide" />
              </div>
              <div class="hidden xl:flex rounded overflow-hidden max-h-full w-full border shadow bg-gray-100 aspect-square">
                    Moves
              </div>
        </div>
        <ChessMoleculeBoardFooter />
    </div>
</template>

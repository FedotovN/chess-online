<script setup lang="ts">
    import Board from '~/models/chess/Board';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    const { move, listen } = useGame();
    const { getBoard, getMovingSide, getOurSide, getPlayers } = storeToRefs(useGame());
    const { add, open } = useModal();
    add({ id: 'game-over', content: 'Game over modal' });
    add({ id: 'pawn-promotion', content: 'Pawn promotion modal' });
    function handleGameOver(board: Board) {
        open({ id: 'game-over', props: { board } });
    }
    function handlePawnPromotion(board: Board) {
        open({ id: 'pawn-promotion', props: { board }, onClose: () => { getBoard.value?.undoLastMove() } });
    }
    function checkForGameCases(board: Board) {
        if (board.isGameOver()) return handleGameOver(board);
        if (board.getPromotedPawn(getOurSide.value!)) return handlePawnPromotion(board)
        return true;
    }
    function onBoardUpdate(newBoard: Board) {
        if (checkForGameCases(newBoard)) 
            return move(newBoard);
    }
    listen(room => {
        const { movingSide, board } = room;
        if (board && movingSide === getOurSide.value) checkForGameCases(board);
    });
    const toDisableBoard = computed(() => getMovingSide.value !== getOurSide.value || getPlayers.value?.indexOf(null) !== -1);
</script>
<template>
    <div class="w-full h-full items-center justify-center flex flex-col" v-if="getBoard && getOurSide">
        <ChessOrganismBoard
            :value="getBoard"
            @update="onBoardUpdate"
            :disabled="toDisableBoard"
            :side="getOurSide"
        />
    </div>
</template>

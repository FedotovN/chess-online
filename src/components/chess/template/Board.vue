<script setup lang="ts">
    import Board from '~/models/chess/Board';
    import PromotedPawnForm from '../molecule/PromotedPawnForm.vue';
    import GameOverOverview from '../molecule/GameOverOverview.vue';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    import { getGameOverInfo } from '~/services/chess/helpers';
    import type { Player } from '~/models/chess/room/ChessRoom';
    const { getBoard, getMovingSide, getOurSide, getPlayers, currGame } = storeToRefs(useGame());
    const { add, open } = useModal();
    const { move, setGameOver } = useGame();
    const emit = defineEmits<{
        (e: 'leave'): void,
        (e: 'rematch'): void,
    }>();
    add({ id: 'game-over', content: 'Game over modal', component: GameOverOverview, });
    add({ id: 'pawn-promotion', content: 'Pawn promotion modal', component: PromotedPawnForm });
    async function handleGameOver(board: Board) {
        await setGameOver();
        open({
            id: 'game-over',
            props: {
                gameOverInfo: getGameOverInfo(board, currGame.value?.id!, getPlayers?.value as [Player, Player]),
            },
            emits: {
                leave: () => emit('leave'),
                rematch: () => emit('rematch'),
            },
        });
    }
    function handlePawnPromotion(board: Board) {
        const pawn = board.getPromotedPawn(getOurSide.value!);
        open({ 
            id: 'pawn-promotion',
            props: { pawn, side: getOurSide.value },
            onClose: () => { getBoard.value?.undoLastMove() }
         });
    }
    function checkForGameCases(board: Board | null) {
        if (!board) return;
        if (board.isGameOver()) handleGameOver(board);
        if (board.getPromotedPawn(getOurSide.value!)) return handlePawnPromotion(board)
        return true;
    }
    function onBoardUpdate(newBoard: Board) {
        if (checkForGameCases(newBoard)) 
            return move(newBoard);
    }
    watch(getBoard, () => { checkForGameCases(getBoard.value) }, { immediate: true });
    const toDisableBoard = computed(() => getMovingSide.value !== getOurSide.value || getPlayers.value?.indexOf(null) !== -1);
</script>
<template>
    <div class="w-full h-full max-w-full overflow-hidden items-center justify-center flex flex-col" v-if="getBoard && getOurSide">
        <ChessOrganismBoard
            :value="getBoard"
            @update="onBoardUpdate"
            :disabled="toDisableBoard"
            :side="getOurSide"
        />
    </div>
</template>

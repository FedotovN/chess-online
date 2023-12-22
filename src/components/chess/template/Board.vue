<script setup lang="ts">
    import Board from '~/models/chess/Board';
    import type Pawn from '~/models/chess/figures/Pawn';
    import type { Color } from '~/types/chess/Color';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    import PromotedPawnForm from '../molecule/PromotedPawnForm.vue';
    import type Figure from '~/models/chess/figures/Figure';
import type { GameOverType } from '~/types/chess/Game';
    const { add, open, close } = useModal();
    add({ component: PromotedPawnForm, id: 'pawn-promotion', header: 'Promote a pawn' });
    const props = defineProps<{
        board: Board,   
        side: Color,
    }>();
    const emit = defineEmits<{
        (e: 'update', value: Board): void,
        (e: 'game-over', value: { type: GameOverType, side: Color }): void,
    }>();
    const proppedBoard = computed(() => props.board);
    const localValue = ref(proppedBoard.value) as Ref<Board>;
    watch(proppedBoard,
        v => { 
            if(v) localValue.value = v;
            
        },
    { immediate: true });
    function openPawnPromotionModal(pawn: Pawn) {
        let promoted = false;
        open({ 
            id: 'pawn-promotion',
            props: {
                pawn,
                side: props.side,
            },
            emits: { 
                promote: (figure: Figure) => {
                    localValue.value.getCell(figure.position).figure = figure;
                    emit('update', localValue.value);
                    promoted = true;
                    close();
                }
            },
            onClose: () => {
                if (!promoted)
                    localValue.value.undoLastMove();
            }
        });
    }
    function onBoardUpdate(board: Board) {
        const promoted = board.getPromotedPawn(props.side);
        if (promoted) {
            openPawnPromotionModal(promoted);
            return;
        }
        localValue.value = board;
        emit('update', localValue.value);
    }
    watch(localValue, () => {
        const isGameOver = localValue.value.isGameOver();
        if(!isGameOver) return;
            emit('game-over', isGameOver);
    }, { deep: true, immediate: true });
</script>
<template>
    <ChessOrganismBoard
        :value="localValue"
        :side="side"
        @update="onBoardUpdate"
    />
</template>
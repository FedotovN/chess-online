<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    import type { Color } from '~/types/chess/Color';
    const board = ref(new Board()) as Ref<Board>;
    const movingSide: Ref<Color> = ref('white');
    const switchSide = () => { movingSide.value = movingSide.value === 'white' ? 'black' : 'white' };
    const lastMove = computed(() => board.value.getLastMove());
    const isGameOver = computed(() => board.value.isGameOver());
    const canPromote = computed(() => board.value.getPromotedPawn(movingSide.value));
    watch(lastMove, switchSide);
    watch(isGameOver, () => console.log('damn bro game over'));
    watch(canPromote, () => console.log('damn bro can promote'));
    function onUndo() {
        board.value.undoLastMove();
    }
    function onUpdate(newBoard: Board) {
        board.value = newBoard;
    }
</script>
<template>
    <div class="flex flex-col w-screen h-screen bg-neutral-800 px-3">
        <div class="h-10 flex items-center justify-between">
            <p class="text-gray-300">{{ movingSide }} moves</p>
            <BaseButton @click="onUndo" :disabled="board.moves.length === 0">Undo move</BaseButton>
        </div>
        <div class="overflow-hidden flex-1 flex justify-center items-center gap-2">
            <div class="w-full h-full items-center justify-center flex flex-col">
                <ChessOrganismBoard
                    :value="board"
                    @update="onUpdate"
                    :side="movingSide"
                />
            </div>
        </div>
        <ChessMoleculeBoardFooter />
    </div>
</template>
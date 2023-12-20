<script setup lang="ts">
    import { uppercaseColor } from '~/utils';
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
    const uppercased = computed(() => uppercaseColor(movingSide.value));
    function onUndo() {
        board.value.undoLastMove();
    }
    function onUpdate(newBoard: Board) {
        board.value = newBoard;
    }
</script>
<template>
    <div class="flex flex-col w-screen h-d-screen bg-neutral-800 px-3">
        <div class="h-14 flex items-center justify-center">
            <p class="text-gray-300">{{ uppercased }} moves</p>
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
        <div class="h-14 flex items-center justify-between">
            <BaseButton flat @click="useRouter().push('/')">Leave</BaseButton>
            <BaseButton flat @click="onUndo" :disabled="board.moves.length === 0">Undo move</BaseButton>
        </div>
    </div>
</template>
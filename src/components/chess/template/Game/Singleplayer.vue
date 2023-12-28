<script setup lang="ts">
import Board from '~/models/chess/Board';
import type { Color } from '~/types/chess/Color';
import { useModal } from 'kneekeetah-vue-ui-kit';
import type { GameOverType } from '~/types/chess/Game';
const emit = defineEmits<{
  (e: 'leave'): void,
}>();
const { add, open } = useModal();
const side = ref('white') as Ref<Color>;
const board = ref(new Board()) as Ref<Board>;
add({ id: 'game-over', header: 'Game Over' });
const switchSides = () => side.value = side.value === 'white' ? 'black' : 'white';;
function onBoardUpdate(newBoard: Board) {
  board.value = newBoard;
  switchSides();
}
function onGameOver(gameOverInfo: { type: GameOverType, side: Color }) {
  open({ id: 'game-over', content: `${gameOverInfo.type} for ${gameOverInfo.side}!` });
}
function onUndoMove() {
  board.value.undoLastMove();
  switchSides();
}
</script>
<template>
  <div class="h-full flex flex-col text-gray-300 gap-4">
    <ChessMoleculeSingleplayerHeader :disabled="board.moves.length === 0" :side="side" @undo="onUndoMove" />
    <div class="flex-1 px-3">
      <ChessTemplateBoard :board="board" :side="side" @update="onBoardUpdate" @game-over="onGameOver" />
    </div>
    <ChessMoleculeSingleplayerFooter @leave="emit('leave')" :moves-amount="board.moves.length" />
  </div>
</template>
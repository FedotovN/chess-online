<script setup lang="ts">
import Board from '~/models/chess/Board';
import type Pawn from '~/models/chess/figures/Pawn';
import type { Color } from '~/types/chess/Color';
import { useModal } from 'kneekeetah-vue-ui-kit';
import PromotedPawnForm from '../molecule/PromotedPawnForm.vue';
import type Figure from '~/models/chess/figures/Figure';
import type { GameOverType } from '~/types/chess/Game';
const { add, open, close } = useModal();
if (process.client) {
  try {
    const { add } = useAudio();
    await Promise.all(
      [
        add('move-self', 'chess-move'),
        add('capture', 'capture'),
        add('promote', 'promote'),
        add('move-check', 'check'),
        add('castle', 'castle'),
        add('game-end', 'game-over'),
      ]
    )
  } catch (e) {
    console.error(e);
  }
}
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
    if (v) localValue.value = v;
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
        localValue.value.getLastMove().isPromote = true;
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
function playSound() {
  const { stop, play } = useAudio();
  stop();
  if (localValue.value.isCheck('black') || localValue.value.isCheck('white')) {
    play('check')
    return;
  }
  const last = localValue.value.getLastMove() || {};
  if (last.isPromote) {
    play('promote');
    return;
  }
  if (last.takes) {
    play('capture');
    return;
  }
  if (last.isCastle) {
    play('castle');
    return;
  }
  play('chess-move');
}
watch(() => localValue.value.moves.length, () => playSound());
watch(localValue, () => {
  const isGameOver = localValue.value.isGameOver(props.side);
  if (!isGameOver) return;
  emit('game-over', isGameOver);
}, { deep: true, immediate: true });
</script>
<template>
  <ChessOrganismBoard :value="localValue" :side="side" @update="onBoardUpdate" />
</template>
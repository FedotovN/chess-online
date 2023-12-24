<script setup lang="ts">
import Board from '~/models/chess/Board';
import type Cell from '~/models/chess/Cell';
import { type Color } from "~/types/chess/Color";
const emit = defineEmits<{ (event: 'update', value: Board): void }>();
const props = withDefaults(defineProps<{
  value: Board,
  side?: Color,
  disabled?: boolean,
}>(), { side: 'white' });
const selected: Ref<Cell | null> = ref(null);
const board = ref(new Board()) as Ref<Board>;
const value = computed(() => props.value);
watch(value, v => {
  board.value = v;
}, { immediate: true, deep: true });
const isOurFigure = (cell: Cell) => props.side === cell.figure?.side;
const hasFigure = (cell: Cell) => !!cell.figure;
const canMoveTo = (cell: Cell) => selected.value?.figure?.canMoveTo(board.value, cell);
function selectFigure(cell: Cell) {
  if (!hasFigure(cell) || !isOurFigure(cell)) return;
  selected.value = cell
}
async function clickHandler(cell: Cell) {
  if (props.disabled) return;
  if (!selected.value) return selectFigure(cell);
  if (canMoveTo(cell)) {
    board.value.move(selected.value, cell);
    emit('update', board.value);
    return;
  };
  if (isOurFigure(cell)) return selectFigure(cell);
  selected.value = null;
}
function getHighlight(cell: Cell): boolean {
  return !!selected.value?.figure?.canMoveTo(board.value, cell);
}
const toRotateBoard = props.side === 'white';
</script>
<template>
  <div class="h-full max-w-full flex justify-center items-center">
    <div :class="{ 'pointer-events-none': disabled }"
      class="flex h-full max-w-full aspect-square justify-center items-center">
      <div class="flex max-h-full w-full rounded overflow-hidden" v-click-outside="() => selected = null"
        :class="{ 'rotate-180': toRotateBoard }">
        <div class="flex flex-col w-full max-h-full flex-1 relative" v-for="column in board.cells">
          <div class="flex w-full max-h-full bg-[#ebecd0]" v-for="cell in column">
            <ChessAtomCell :highlight="getHighlight(cell)" @drop.prevent="clickHandler(cell)"
              @dragstart="clickHandler(cell)" @click="clickHandler" @dragover.prevent
              :class="{ 'rotate-180': toRotateBoard }" :playerSide="side"
              :lastMoveFrom="board.moves.length ? cell.comparePosition(board.getLastMove().from) : false"
              :lastMoveTo="board.moves.length ? cell.comparePosition(board.getLastMove().to) : false" :cell="cell" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

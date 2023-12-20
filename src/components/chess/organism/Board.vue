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
  function clickHandler(cell: Cell) {
    if (props.disabled) return;
    if (!selected.value) return selectFigure(cell);
    if (isOurFigure(cell)) return selectFigure(cell);
    if (canMoveTo(cell)) {
      board.value.move(selected.value, cell);
      emit('update', board.value);
    };
    selected.value = null;
  }
  function getHighlight(cell: Cell): boolean {
    return !!selected.value?.figure?.canMoveTo(board.value, cell);
  }
  const toRotateBoard = props.side === 'white';
</script>
<template>
  <div :class="{ 'pointer-events-none opacity-75': disabled }" class="flex h-full w-full aspect-square text-white">
    <div class="flex"  v-click-outside="() => selected = null" :class="{ 'rotate-180': toRotateBoard}">
      <div class="flex flex-col" v-for="column in board.cells">
        <div class="flex" v-for="cell in column">
          <ChessAtomCell
              :highlight="getHighlight(cell)"
              @drop.prevent="clickHandler(cell)"
              @dragstart="clickHandler(cell)"
              @click="clickHandler"
              @dragover.prevent
              :class="{ 'rotate-180': toRotateBoard }"
              :playerSide="side"
              :lastMoveFrom="board.moves.length ? cell.comparePosition(board.getLastMove().from) : false"
              :lastMoveTo="board.moves.length ? cell.comparePosition(board.getLastMove().to) : false"
              :cell="cell"
          />
        </div>
      </div>
    </div>
  </div>
</template>

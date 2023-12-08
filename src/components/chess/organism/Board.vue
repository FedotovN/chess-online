<script setup lang="ts">
  import Board from '~/models/chess/Board';
  import type Cell from '~/models/chess/Cell';
  import { type Color } from "~/types/chess/Color";
  const emit = defineEmits<{ 
    (event: 'update:modelValue', value: Board): void,
    (event: 'update', value: Board): void,
   }>();
  const props = defineProps<{
      modelValue?: Board,
      value: Board,
      currentSide: Color | null,
      playerSide: Color | null,
      disabled: boolean,
  }>();
  const selected: Ref<Cell | null> = ref(null);
  const ourMove = computed(() => props.currentSide === props.playerSide);
  const toRotateBoard = computed(() => props.playerSide === 'white');
  const board = computed(() => props.modelValue || props.value);
  function selectFigure(cell: Cell) {
    if (!cell.figure || cell.figure.getEnemySide() === props.playerSide) return;
    selected.value = cell
  }
  function clickHandler(cell: Cell) {
    if (props.disabled) return;
    if (!ourMove.value) return;
    if (!selected.value) return selectFigure(cell);
    if(board.value.move(selected.value, cell)) {
      emit('update', board.value);
      emit('update:modelValue', board.value);
    }
    selected.value = null;
  }
  function getHighlight(cell: Cell): boolean {
    return !!selected.value?.figure?.canMoveTo(board.value, cell);
  }
</script>
<template>
  <div :class="{ 'opacity-75 pointer-events-none': disabled }" class="max-h-full max-w-full aspect-square flex flex-col">
    <div class="flex h-full w-full rounded overflow-hidden" v-click-outside="() => selected = null" :class="{ 'rotate-180': toRotateBoard}">
      <div class="flex flex-col h-full w-full aspect-[1/8]" v-for="column in board.cells">
        <div class="flex w-full h-full aspect-[1/8]" v-for="cell in column">
          <ChessAtomCell
              :highlight="getHighlight(cell)"
              @drop.prevent="clickHandler(cell)"
              @dragstart="clickHandler(cell)"
              @click="clickHandler"
              @dragover.prevent
              :class="{ 'rotate-180': toRotateBoard }"
              :playerSide="playerSide"
              :lastMoveFrom="board.moves.length ? cell.comparePosition(board.getLastMove().from) : false"
              :lastMoveTo="board.moves.length ? cell.comparePosition(board.getLastMove().to) : false"
              :cell="cell"
          />
        </div>
      </div>
    </div>
  </div>
</template>

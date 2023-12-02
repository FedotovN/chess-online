<script setup lang="ts">
  import Board from '~/models/chess/Board';
  import type Cell from '~/models/chess/Cell';
  import { type Color } from "~/types/chess/Color";
  const emit = defineEmits<{ (event: 'update:modelValue', value: Board): void }>();
  const props = defineProps<{
      modelValue: Board,
      currentSide: Color | null,
      playerSide: Color | null,
  }>();
  const selected: Ref<Cell | null> = ref(null);
  const ourMove = computed(() => props.currentSide === props.playerSide);
  const toRotateBoard = computed(() => props.playerSide === 'black');
  const board = computed(() => props.modelValue);
  function selectFigure(cell: Cell) {
    if (!cell.figure) return;
    selected.value = cell
  }
  function clickHandler(cell: Cell) {
    if (!ourMove.value) return;
    if (!selected.value) return selectFigure(cell);
    if(board.value.move(selected.value, cell))
      emit('update:modelValue', board.value);
    selected.value = null;
  }
  function getHighlight(cell: Cell): boolean {
    return !!selected.value?.figure?.canMoveTo(board.value, cell);
  }
</script>
<template>
  <div class="w-full h-full flex flex-col flex-1">
    <div class="flex w-full flex-1 border border-gray-700 rounded" v-click-outside="() => selected = null">
      <div class="flex flex-col flex-1" v-for="column in board.cells" :class="{ 'rotate-180': toRotateBoard }">
        <div class="flex flex-1" v-for="cell in column">
          <ChessAtomCell
              :highlight="getHighlight(cell)"
              :class="{ 'rotate-180': toRotateBoard }"
              @drop.prevent="clickHandler(cell)"
              @dragstart="clickHandler(cell)"
              @click="clickHandler"
              @dragover.prevent
              :cell="cell"
          />
        </div>
      </div>
    </div>
  </div>
</template>

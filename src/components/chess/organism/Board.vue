<script setup lang="ts">
  import Board from '~/models/chess/Board';
  import type Cell from '~/models/chess/Cell';
  import { type Color } from "~/types/chess/Color";
  const emit = defineEmits<{ (event: 'update:modelValue', value: Board): void }>();
  const props = defineProps<{
      modelValue: Board,
      currentSide: Color | null,
      playerSide: Color | null,
      disabled: boolean,
  }>();
  const selected: Ref<Cell | null> = ref(null);
  const ourMove = computed(() => props.currentSide === props.playerSide);
  const toRotateBoard = computed(() => props.playerSide === 'white');
  const board = computed(() => props.modelValue);
  function selectFigure(cell: Cell) {
    if (!cell.figure || cell.figure.getEnemySide() === props.playerSide) return;
    selected.value = cell
  }
  function clickHandler(cell: Cell) {
    if (props.disabled) return;
    if (!ourMove.value) return;
    if (!selected.value) return selectFigure(cell);
    if(board.value.move(selected.value, cell))
      emit('update:modelValue', board.value);
    selected.value = null;
  }
  function getHighlight(cell: Cell): boolean {
    return !!selected.value?.figure?.canMoveTo(board.value, cell);
  }
  watch(board, (n, o) => {
    
  }, { deep: true });
</script>
<template>
  <div :class="{ 'opacity-50 pointer-events-none': disabled }" class="w-[460px] md:w-[480px] lg:w-[510px] aspect-square flex flex-col flex-1 max-w-full">
    <div class="flex w-full h-full flex-1 rounded overflow-hidden" v-click-outside="() => selected = null" :class="{ 'rotate-180': toRotateBoard}">
      <div class="flex flex-col flex-1 w-full h-full" v-for="column in board.cells">
        <div class="flex flex-1 w-full h-full" v-for="cell in column">
          <ChessAtomCell
              :highlight="getHighlight(cell)"
              @drop.prevent="clickHandler(cell)"
              @dragstart="clickHandler(cell)"
              @click="clickHandler"
              @dragover.prevent
              :class="{ 'rotate-180': toRotateBoard }"
              :playerSide="playerSide"
              :cell="cell"
          />
        </div>
      </div>
    </div>
  </div>
</template>

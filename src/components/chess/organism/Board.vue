<script setup lang="ts">
    import { Dimension } from "~/types/chess/Position";
    import Board from '~/models/chess/Board';
    import type Cell from '~/models/chess/Cell';
    import { type Color } from "~/types/chess/Color";
    import { getHorizontalNameByIndex } from "../../../types/chess/Position";
    const emit = defineEmits<{ (event: 'update:modelValue', value: Board): void }>();
    const props = defineProps<{ 
        modelValue: Board,
        currentSide: Color | null,
        playerSide: Color | null,
     }>();
    const board = computed(() => props.modelValue)
    const selected: Ref<Cell | null> = ref(null);
    function getHighlight(x: number, y: number) {
        if (!selected.value) return false;
        const { figure } = selected.value;
        const cell = board.value.cells[x][y]
        if (!figure) return false;
        return figure.canMoveTo(board.value, cell);
    }
    function clickHandler(cell: Cell) {
        if (!selected.value) { 
            selectFigure(cell);
            return;
        }
        const { x: targetX, y: targetY } = cell.position;
        const { x: currX, y: currY } = selected.value.position;
        selected.value = null;
        const result = board.value.moveFigure({ x: currX, y: currY }, { x: targetX, y: targetY });
        if (result) {
            emit('update:modelValue', board.value);
        } else {
            selected.value = null;
        }
    }
    function selectFigure(cell: Cell) {
        if (selected.value) return;
        if (!cell.figure) return;
        const isEnemyFigure = cell.figure.side !== props.playerSide;
        const notYourMove = cell.figure.side !== props.currentSide;
        if (isEnemyFigure || notYourMove) return;
        selected.value = cell;
    }
    const isBlackSide = computed(() => props.playerSide === 'black')
</script>
<template>
  <div class="flex h-full w-full">
    <div class="w-full h-full flex flex-col flex-1">
      <div class="flex w-full flex-1 border border-gray-700 rounded" v-click-outside="() => selected = null">
        <div class="flex flex-col flex-1" v-for="column in board.cells" :class="{ 'rotate-180': isBlackSide }">
          <div class="flex flex-1" v-for="cell in column">
            <ChessAtomCell
                :highlight="getHighlight(cell.position.x, cell.position.y)"
                @drop.prevent="clickHandler(cell)"
                @dragstart="clickHandler(cell)"
                :class="{ 'rotate-180': isBlackSide }"
                @click="clickHandler"
                @dragover.prevent
                :cell="cell"
            />
          </div>
        </div>
      </div>
      <div class="flex w-full pt-2">
        <p class="flex-1 text-center font-bold text-sm text-gray-700" v-for="h in Dimension">{{ isBlackSide ? getHorizontalNameByIndex(7 - h) : getHorizontalNameByIndex(h) }}</p>
      </div>
    </div>
  </div>
</template>

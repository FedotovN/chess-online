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
        console.log(selected.value);
        if (!selected.value) {
            if (!cell.figure) return;
            const isEnemyFigure = cell.figure.side !== props.playerSide;
            const notYourMove = cell.figure.side !== props.currentSide;
            if (isEnemyFigure || notYourMove) return;
            selected.value = cell;
            return;
        }
        const { x, y } = cell.position;
        const { x: currX, y: currY } = selected.value.position;
        selected.value = null;
        const result = board.value.moveFigure({ x: currX, y: currY }, { x, y })
        if (!result) return;
        emit('update:modelValue', board.value);
    }
</script>
<template>
    <div :class="{ 'rotate-180': playerSide === 'black' }" class="flex w-full h-full border border-gray-700 rounded overflow-hidden" v-click-outside="() => selected = null">
        <div class="flex flex-col bg-blue-300 flex-1" v-for="column in board.cells">
                <div class="flex flex-1" v-for="cell in column">
                    <ChessAtomCell 
                        :class="{ 'rotate-180': playerSide === 'black' }"
                        @click="clickHandler"
                        :cell="cell"
                        :highlight="getHighlight(cell.position.x, cell.position.y)"
                    />
                </div>
        </div>
    </div>
</template>

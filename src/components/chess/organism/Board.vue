<script setup lang="ts">
    import Board from '~/models/chess/Board';
    import type Cell from '~/models/chess/Cell';
    const emit = defineEmits<{
        (event: 'update:modelValue', value: Board): void;
        (event: 'update', value: Board): void;
    }>();
    const props = defineProps<{
        modelValue: Board;
    }>();
    const board = computed(() => props.modelValue);
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
            if (!cell.figure) return;
            selected.value = cell;
            return;
        }
        const { x, y } = cell.position;
        const { x: currX, y: currY } = selected.value.position;
        board.value.moveFigure({ x: currX, y: currY }, { x, y })
        selected.value = null;
        emit('update:modelValue', board.value);
        emit('update', board.value);
    }
</script>
<template>
    <div class="flex w-full h-full border border-gray-700 rounded overflow-hidden" @blur.stop="selected = null">
        <div class="flex flex-col bg-blue-300 flex-1" v-for="column in board.cells">
                <div class="flex flex-1" v-for="cell in column">
                    <ChessAtomCell 
                        @click="clickHandler"
                        :cell="cell"
                        :highlight="getHighlight(cell.position.x, cell.position.y)"
                    />
                </div>
        </div>
    </div>
</template>

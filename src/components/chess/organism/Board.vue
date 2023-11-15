<script setup lang="ts">
    import Board from '~/models/chess/Board';
    import type Cell from '~/types/chess/Cell';
    import type { Position } from '~/types/chess/Position';
    const emit = defineEmits<{
        (event: 'update', value: Board): void;
    }>();
    const board: Ref<Board> = ref(new Board()) as Ref<Board>;
    const selected: Ref<Cell | null> = ref(null);
    function getHighlight(x: number, y: number) {
        if (!selected.value) return false;
        const { figure } = selected.value;
        const cell = board.value.cells[x][y]
        if (!figure) return false;
        return figure.canMoveTo(cell);
    }
    function clickHandler(cell: Cell) {
        if (!selected.value) {
            if (!cell.figure) return;
            selected.value = cell;
            console.log('selected', cell);
            return;
        }
        const { x, y } = cell.position;
        const { x: currX, y: currY } = selected.value.position;
        board.value.moveFigure({ x: currX, y: currY }, { x, y }, )
        selected.value = null;
        emit('update', board.value);
    }
</script>
<template>
    <div class="flex flex-col w-full h-full border border-gray-700 rounded overflow-hidden" @blur.stop="selected = null">
        <div class="w-full flex flex-1" v-for="row in Object.keys(board.cells)" @click.stop>
            <ChessAtomCell 
                @click="clickHandler"
                :cell="{ 
                    figure: cell.figure, 
                    side: cell.side,
                    position: { x: cell.position.x, y: cell.position.y } as Position
                }"
                v-for="cell in board.cells[row as string]"
                :highlight="getHighlight(cell.position.x, cell.position.y)"
            />
        </div>
    </div>
</template>

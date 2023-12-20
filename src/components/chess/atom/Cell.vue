<script setup lang="ts">
    import Cell from "~/models/chess/Cell";
    import type { Color } from "~/types/chess/Color";
    import { getHorizontalNameByIndex, Dimension } from "~/types/chess/Position";
    const props = defineProps<{
        cell: Cell,
        highlight: boolean,
        playerSide: Color | null,
        lastMoveFrom?: boolean,
        lastMoveTo?: boolean,
    }>();
    const emit = defineEmits<{
        (event: 'click', value: Cell): void;
    }>();
    const getFigureSvg = computed(() => {
        const name = props.cell.figure?.name;
        const color = props.cell.figure?.side;
        if (name) return getSvgSrcFromFigure(color as Color, name);
    });
    const enemyHighlight = computed(() => props.highlight && props.cell.figure);
    const isCornerLeft = props.cell.position.x === (props.playerSide === 'white' ? 7 : 0);
    const isBottom = props.cell.position.y === (props.playerSide === 'white' ? 0 : 7);
</script>
<template>
    <div @click="emit('click', cell)" class="relative aspect-square select-none transition-all overflow-hidden h-full w-full max-h-full max-w-full" :class="{
         'bg-[#769656]': cell.side === 'black' && !lastMoveFrom && !lastMoveTo,
        'bg-[#ebecd0]': cell.side === 'white' && !lastMoveTo && !lastMoveFrom,
        'bg-[#baca44]': lastMoveFrom || lastMoveTo,
        'cursor-pointer': !!cell.figure || highlight 
    }">
        <div class="flex h-full w-full justify-center items-center overflow-hidden max-h-full max-w-full">
            <img v-if="getFigureSvg" :src="getFigureSvg" class="h-full max-h-full" />
        </div>
        <div v-if="highlight && !enemyHighlight" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-[25%] w-[25%] bg-gray-800 opacity-25 border border-gray-600 shadow-lg" />
        <div v-else-if="enemyHighlight" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-[85%] w-[85%] bg-gray-800 opacity-25 border-2 border-gray-800 shadow-lg" />
        <div class="absolute left-[6px] top-[8px] -translate-y-1/2 -translate-x-1/2 font-bold text-xs" v-if="isCornerLeft">
            <small :class="{
                'text-[#729556]': cell.side === 'white',
                'text-[#ebecd0]': cell.side === 'black',
            }">{{ cell.position.y + 1 }}.</small>
        </div>
        <div class="absolute right-[4px] bottom-0 font-bold text-xs" v-if="isBottom">
            <small :class="{
                'text-[#729556]': cell.side === 'white',
                'text-[#ebecd0]': cell.side === 'black',
            }">{{ getHorizontalNameByIndex(7 - cell.position.x as typeof Dimension[number]) }}</small>
        </div>
    </div>
</template>

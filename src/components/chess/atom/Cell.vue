<script setup lang="ts">
    import Cell from "~/models/chess/Cell";
    import type { Color } from "~/types/chess/Color";
    const props = defineProps<{
        cell: Cell,
        highlight: boolean,
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
</script>
<template>
    <div @click="emit('click', cell)" class="flex relative select-none justify-center items-center flex-1 transition-all" :class="{
        'bg-[#729556]': cell.side === 'black',
        'bg-[#ebecd0]': cell.side === 'white',
        'cursor-pointer': !!cell.figure || highlight 
    }">
        <img v-if="getFigureSvg" :src="getFigureSvg" class="h-full w-full" />
        <div v-if="highlight && !enemyHighlight" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-4 w-4 bg-gray-800 border border-gray-600 shadow-lg" />
        <div v-else-if="enemyHighlight" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-[98%] w-[98%] border-4 border-gray-800 bg-[rgba(0,0,0,.1)] shadow-xl" />
    </div>
</template>

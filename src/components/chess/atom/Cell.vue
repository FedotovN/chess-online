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
        'bg-gray-700 hover:bg-gray-800 ': !enemyHighlight && cell.side === 'black',
        'bg-white hover:bg-white ': !enemyHighlight && cell.side === 'white',
        'bg-red-400 hover:bg-red-600': enemyHighlight,
        'cursor-pointer': !!cell.figure
    }">
        <img v-if="getFigureSvg" :src="getFigureSvg" class="h-full w-full" />
        <div
        v-if="highlight && !enemyHighlight" 
        class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-4 w-4 bg-red-500 border-4 border-black"/>
      <p class="absolute top-1/2 -translate-y-1/2 text-gray-500">{{ cell.position.x }}{{ cell.position.y }}</p>
    </div>
</template>

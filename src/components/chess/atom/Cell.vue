<script setup lang="ts">
    import Cell from "~/models/chess/Cell";
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
        if (name) return getSvgSrcFromFigure(color, name);
    });
    const enemyHighlight = computed(() => props.highlight && props.cell.figure);
</script>
<template>
    <div @click="emit('click', cell)" class="flex relative select-none justify-center items-center flex-1 cursor-pointer transition-all" :class="{
        'bg-yellow-700 hover:bg-yellow-800 ': !enemyHighlight && cell.side === 'black',
        'bg-yellow-50 hover:bg-yellow-100 ': !enemyHighlight && cell.side === 'white',
        'bg-red-400 hover:bg-red-600': enemyHighlight
    }">
        <img v-if="getFigureSvg" :src="getFigureSvg" class="h-full w-full" />
        <div
        v-if="highlight && !enemyHighlight" 
        class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-4 w-4 bg-red-500 border-4 border-black"/>
    </div>
</template>

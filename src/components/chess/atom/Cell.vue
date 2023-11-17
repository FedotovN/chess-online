<script setup lang="ts">
    import type Cell from "~/models/chess/Cell";
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
</script>
<template>
    <div @click="emit('click', cell)" class="flex relative select-none justify-center items-center flex-1 cursor-pointer transition-all" :class="{
        'bg-gray-700 hover:bg-gray-600 ': cell.side === 'black',
        'bg-gray-100 hover:bg-gray-200 ': cell.side === 'white',
    }">
        <img v-if="getFigureSvg" :src="getFigureSvg" class="h-full w-full" />
        <div
        v-if="highlight" 
        class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-4 w-4 bg-blue-400"
        :class="{ 
            'w-full shadow-lg shadow-red-500 h-full bg-transparent border-red-500 border-2 rounded-none': cell.figure
         }"
         />
    </div>
</template>

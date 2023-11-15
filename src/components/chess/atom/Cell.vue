<script setup lang="ts">
    import Figure from "~/models/chess/figures/Figure";
    import type Cell from "~/types/chess/Cell";
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
        <img v-if="getFigureSvg" :src="getFigureSvg" />
        <div v-if="highlight" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full h-3 w-3 bg-blue-400" />
        <slot>
            <div class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-purple-300">{{ cell.figure?.position.x }}{{ cell.figure?.position.y || cell.position.y }}</div></slot>
    </div>
</template>

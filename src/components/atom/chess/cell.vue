<script lang="ts" setup>
    import Figure from "~/models/chess/figures/Figure"
    import { type Position } from "@/types/chess/Position"
    import { type Side } from "@/types/chess/Side";
    interface Cell {
        side: Side,
        figure: Figure | null,
        position: Position
    }
    defineProps<Cell>();
</script>
<template>
    <div class="flex-1 h-full cursor-pointer transition-colors" :class="{
        'bg-gray-800 hover:bg-gray-700': side === 'black',
        'bg-white hover:bg-gray-100': side === 'white',

    }"></div>
</template>

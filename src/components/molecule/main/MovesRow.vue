<script lang="ts" setup>
    import type Move from "~/types/chess/Move" ;
    import { getSvgSrcFromFigure } from "@/utils/";
    const moves: Ref<Move[]> = ref([
        { side: 'black', figure: 'bishop', from: "B2", to: "A1" },
        { side: 'white', figure: 'queen', from: "A8", to: "B2" },
        { side: 'black', figure: 'rook', from: "B2", to: "C6" },
        { side: 'white', figure: 'knight', from: "C6", to: "C8" },
        { side: 'black', figure: 'rook', from: "B2", to: "A1" },
        { side: 'white', figure: 'king', from: "A2", to: "H2" },
        { side: 'black', figure: 'queen', from: "B2", to: "A1" },
        { side: 'white', figure: 'pawn', from: "D2", to: "F3" },
        { side: 'black', figure: 'bishop', from: "B2", to: "A1" },
        { side: 'white', figure: 'pawn', from: "C2", to: "D2" },
        { side: 'black', figure: 'bishop', from: "D2", to: "A6" },
        { side: 'white', figure: 'pawn', from: "A2", to: "A1" },
        { side: 'black', figure: 'bishop', from: "C2", to: "A8" },
        { side: 'white', figure: 'queen', from: "B8", to: "A1" },
    ]);
    const fixedLengthMoves = computed(() => moves.value.slice(0, 16));
</script>
<template>
    <div class="flex gap-4">
        <div v-for="(move, ind) in fixedLengthMoves" class="h-8 border-blue-400 w-8 rounded-full border relative bg-blue-50">
            <img :src="getSvgSrcFromFigure(move.side, move.figure)" class="h-5 w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <small class="absolute top-full left-1/2 -translate-x-1/2 text-xs text-gray-300 pt-3 mt-[2px]">
                <span class="text-gray-600">{{ move.from }}</span>
                <span class="text-green-400">{{ move.to }}</span>
            </small>
            <span v-if="ind !== moves.length - 1" class="absolute w-4 h-px -right-4 translate-x-[1.5px] top-1/2 -translate-y-1/2 bg-blue-300"></span>
        </div>
    </div>
</template>
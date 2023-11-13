<script setup lang="ts">
    import type { Position } from '~/types/chess/Position';
    import type Cell from "~/types/chess/Cell";
    const vertical = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const horizontal = [1, 2, 3, 4, 5, 6, 7, 8];
    const getPos = (x: number, y: string) => x + y as Position
    const getColor = (x: number, y: number) => {
        const isEvenRow = y % 2 === 0;
        const isEvenCell = (x + (isEvenRow ? 1 : 0)) % 2 === 0;
        return isEvenCell ? 'black' : 'white';        
    }
</script>
<template>
    <div class="flex flex-col w-full h-full border border-gray-700 rounded overflow-hidden">
        <div class="w-full flex flex-1" v-for="(vPos, vInd) in vertical">
            <AtomChessCell
                v-for="(hPos, hInd) in horizontal"
                :figure="null"
                :position="getPos(hPos, vPos)"
                :side="getColor(hInd, vInd)"
             />
        </div>
    </div>
</template>

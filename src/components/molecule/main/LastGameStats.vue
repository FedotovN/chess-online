<script lang="ts" setup>
    
    const win = true;
</script>
<template>
    <div class="flex gap-4 border rounded h-20 px-2 py-1">
        <div class="flex flex-col items-center h-full py-5">
            <div class="flex flex-col justify-between items-center gap-1">
                <small class="text-green-800 whitespace-nowrap text-xs pb-2 -mt-2">Last game</small>
                <p v-if="win" class="text-green-600 text-semibold bg-green-100 px-2 w-16 text-center block rounded">Win</p>
                <p v-else class="text-rose-600 text-semibold bg-rose-100 px-2 w-16 text-center block rounded">Lose</p>
            </div>
        </div>
        <div class="w-full pt-1">
            <MoleculeMainMovesRow />
        </div>
    </div>
</template>
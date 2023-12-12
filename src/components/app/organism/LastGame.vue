<script setup lang="ts">

</script>
<template>
    <div class="flex flex-col gap-4 px-3">
        <div class="flex w-full justify-center">
            <h1 class="text-2xl whitespace-nowrap text-ellipsis overflow-hidden">Last game</h1>
        </div>        
        <div class="w-full border border-neutral-700 rounded shadow px-2 py-1 h-24">
            <div class="flex gap-3 items-center">
                <div class="flex gap-2 items-center">
                    <h2 class="text-xl text-green-300">Win</h2>
                    <small>in 40 moves</small>
                </div>
                <i class="fa-solid fa-gear"></i>
            </div>
        </div>
    </div>
</template>
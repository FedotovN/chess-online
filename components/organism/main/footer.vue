<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
</script>
<template>
    <div class="h-12 border-t w-full backdrop-blur px-3 z-10">
        <div class="h-full flex w-full items-center justify-between">
            <div class="flex gap-2">
                <i class="fa-solid fa-people"></i>
            </div>
            <div class="flex gap-2 items-center">
                <BaseButton width="200px">Enter game</BaseButton>
                <BaseButton width="150px" color="secondary">Create game</BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
<template>
    <div class="flex flex-col gap-4 h-screen w-full items-center justify-center bg-neutral-800">
        <div class="md:rounded h-screen w-screen md:h-auto md:w-auto overflow-hidden ">
            <slot />
        </div>        
    </div>
</template>
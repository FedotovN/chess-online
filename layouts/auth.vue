<script setup lang="ts">

</script>
<template>
    <div class="flex h-screen w-full items-center justify-center bg-gray-700">
        <div class="md:rounded h-screen w-screen md:h-auto md:w-auto overflow-hidden bg-red-200 ">
            <slot />
        </div>        
    </div>
</template>
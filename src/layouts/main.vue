<script setup lang="ts">
    const { getUser } = storeToRefs(useAuth());
</script>   
<template>
    <div class="flex flex-col h-screen w-full">
        <div class="sticky w-full top-0 z-10">
            <OrganismMainHeader :current-user="getUser" />
        </div>
        <div class="flex-1 w-full">
            <slot />
        </div>
        <div class="sticky w-full bottom-0 z-10">
            <OrganismMainFooter />
        </div>
    </div>
</template>
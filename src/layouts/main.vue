<script setup lang="ts">
    const { user } = storeToRefs(useAuth());
</script>   
<template>
    <div class="flex flex-col h-screen w-full">
        <ClientOnly>
            <AppOrganismHeader :current-user="user" />
        </ClientOnly>
        <div class="flex-1 w-full">
            <nuxt-page />
        </div>
        <ClientOnly>
            <AppOrganismFooter />
        </ClientOnly>
    </div>
</template>
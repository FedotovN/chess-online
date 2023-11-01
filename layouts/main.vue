<script setup lang="ts">
    const { getUser } = storeToRefs(useAuth());
</script>   
<template>
    <div class="h-screen w-full">
        <OrganismMainHeader :current-user="getUser" />
        <slot />
    </div>
</template>
<script setup lang="ts">
    definePageMeta({
        middleware() {
            return navigateTo('/');
        }
    });
</script>
<template>
    <div>
        <nuxt-page />
    </div>
</template>

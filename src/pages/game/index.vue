<script setup lang="ts">
    definePageMeta({
        middleware() {
            return navigateTo('/');
        }
    });
</script>
<template>
    <div class="flex h-screen w-full justify-center items-center">
        <div class="h-[400px] w-[400px]">
            <nuxt-page />
        </div>
    </div>
</template>

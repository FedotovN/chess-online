<script setup lang="ts">
const route = useRoute();
if (route.name === 'auth') {
    await navigateTo('/');
}
</script>
<template>
    <NuxtLayout name="auth">
        <nuxt-page />
    </NuxtLayout>
</template>
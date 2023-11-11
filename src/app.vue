<script setup lang="ts">
    import { OverlayToast, OverlayModal } from 'kneekeetah-vue-ui-kit';
    const loading = ref(true);
    useAuth().waitForAuth().then(() => {
        loading.value = false;
    })
</script>
<template>
    <div class="w-full min-h-screen" v-show="!loading">
        <OverlayToast />
        <OverlayModal />
        <nuxt-page />
    </div>
</template>
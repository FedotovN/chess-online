<script setup lang="ts">
    import AuthService from "@/services/auth"
    import { OverlayToast, OverlayModal } from 'kneekeetah-vue-ui-kit';
    const loading = ref(true);
    AuthService.waitForAuthToResolve().then(state => {
        useAuth().user = state;
        loading.value = false;
    });
</script>
<template>
    <div class="w-full min-h-screen" v-show="!loading">
        <OverlayToast />
        <OverlayModal />
        <nuxt-page />
    </div>
</template>
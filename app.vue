<script setup lang="ts">
    // SVG Chess Icons By Cburnett - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1499806
    import { waitForAuthToResolve } from './services/auth/helpers/authTokenChange';
    import { OverlayToast, OverlayModal } from 'kneekeetah-vue-ui-kit';
    const loading = ref(true);
    waitForAuthToResolve().then(state => {
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
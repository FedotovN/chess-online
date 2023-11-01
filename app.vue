<script setup lang="ts">
    import { waitForAuthToResolve } from './services/auth/helpers/authTokenChange';
    import { OverlayToast } from 'kneekeetah-vue-ui-kit';
    const loading = ref(true);
    waitForAuthToResolve().then(state => {
        useAuth().user = state;
        loading.value = false;
    });
</script>
<template>
    <div v-show="!loading">
        <OverlayToast />
        <nuxt-page />
    </div>
</template>
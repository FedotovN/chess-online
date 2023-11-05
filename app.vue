<script setup lang="ts">
    import AuthService from "@/services/auth"
    import { OverlayToast, OverlayModal, useToast } from 'kneekeetah-vue-ui-kit';
    const { add } = useToast();
    const loading = ref(true);
    AuthService.waitForAuthToResolve().then(state => {
        if (state === undefined) {
            useToast().add({ color: 'alert', content: "Enexpected error during authentication process. :(", });
            return;
        } 
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
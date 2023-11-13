<script setup lang="ts">
    import { OverlayToast, OverlayModal } from 'kneekeetah-vue-ui-kit';
    const loading = ref(true);
    useAuth().onAuthResolve(() => {
        loading.value = false;
    })
    useHead({
        link: [
            { crossorigin: "anonymous", referrerpolicy: "no-referrer", href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', rel: 'stylesheet', integrity: "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==", type: 'text/css', }
        ]
    })
</script>
<template>
    <div class="w-full min-h-screen" v-show="!loading">
        <OverlayToast />
        <OverlayModal />
        <nuxt-page />
    </div>
</template>
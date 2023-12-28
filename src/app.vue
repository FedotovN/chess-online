<script setup lang="ts">
import useAudio from "~/composables/useAudio";
import { OverlayToast, OverlayModal, BaseButton } from 'kneekeetah-vue-ui-kit';
const loading = ref(true);
useAuth().onAuthResolve(() => {
  loading.value = false;
}
)
</script>
<template>
  <div class="w-full min-h-screen" v-show="!loading">
    <OverlayToast />
    <OverlayModal />
    <nuxt-page />
  </div>
</template>
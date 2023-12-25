<script setup lang="ts">
import useAudio from "~/composables/useAudio";
import { OverlayToast, OverlayModal, BaseButton } from 'kneekeetah-vue-ui-kit';
const loading = ref(true);
useAuth().onAuthResolve(() => {
  loading.value = false;
}
)
if (process.client) {
  try {
    await useAudio().add('6a897efd83627af', 'chess-move');
  } catch (e) {
    console.error(e);
  }
}
</script>
<template>
  <div class="w-full min-h-screen" v-show="!loading">
    <OverlayToast />
    <OverlayModal />
    <nuxt-page />
  </div>
</template>
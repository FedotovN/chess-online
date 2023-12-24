<script setup lang="ts">
import { BaseCheckbox, BaseButton, useModal, BaseLoader } from 'kneekeetah-vue-ui-kit';
const { create, join } = useGame();
const { close } = useModal();
const loading = ref(false);
const form = ref({
  isBlack: false,
});
async function createGame() {
  loading.value = true;
  const { id } = await create();
  await join(id, form.value.isBlack ? 'black' : 'white');
  await useRouter().push({
    name: 'game-id',
    params: { id: id },
  });
  loading.value = false;
  close();
}
</script>
<template>
  <div class="flex flex-col w-full gap-4 text-gray-300">
    <div class="flex justify-between items-center">
      <p>Play as black</p>
      <BaseCheckbox v-model="form.isBlack" />
    </div>
    <BaseButton rounded @click="createGame">
      <BaseLoader v-if="loading" color="white"></BaseLoader>
      <p v-else>Create</p>
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import LeaveForm from '~/components/chess/molecule/LeaveForm.vue';
import { BaseLoader, useModal, useToast } from 'kneekeetah-vue-ui-kit';
const { id } = useRoute().params;
const loading = ref(true);
const { add: addModal, open, close } = useModal();
const { join, leave, create } = useGame();
const { add } = useToast()
addModal({ id: 'leave-form', header: 'Are you sure?', component: LeaveForm });
useAuth().onAuthResolve(async user => {
  if (!user) {
    add({ content: "Let's login first!", color: "secondary", delay: 5000 });
    return navigateTo({ path: "/auth/login", query: { redirect: useRoute().path } });
  }
  try {
    await join(id as string);
    add({ content: `You've connected to the game`, color: "primary", delay: 5000 });

  } catch (e) {
    await navigateTo("/");
    add({ content: `Error while connecting to the game`, color: "alert", delay: 5000 });
    console.error(e);
  } finally {
    loading.value = false;
  }
});
async function toLeave() {
  await leave();
  useRouter().push('/');
  useToast().add({ content: 'You left the game' });
  close();
}
function onLeave() {
  open({
    id: 'leave-form',
    emits: {
      leave: toLeave
    }
  });
}
async function onRematch() {
  await toLeave();
  const { id } = await create();
  useRouter().push(`game/${id}`);
}
</script>
<template>
  <div class="h-d-screen w-full bg-neutral-800">
    <div class="h-full flex flex-col gap-2 items-center justify-center text-gray-300" v-if="loading">
      <BaseLoader label="Joining room..."></BaseLoader>
    </div>
    <ChessTemplateGameOnline @leave="onLeave" @rematch="onRematch" />
  </div>
</template>

<script setup lang="ts">
    import LeaveForm from '~/components/chess/molecule/LeaveForm.vue';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    const { add, open, close } = useModal();
    add({ id: 'leave-form', header: 'Are you sure?', component: LeaveForm });
    function onLeave() {
        open({ 
            id: 'leave-form',
            emits: {
                leave: async () => {
                    await useRouter().push('/');
                    close();
                }
            },
        })
    }
</script>
<template>
    <div class="flex flex-col max-w-screen w-screen h-d-screen bg-neutral-800">
        <ChessTemplateGameSingleplayer @leave="onLeave" />
    </div>
</template>
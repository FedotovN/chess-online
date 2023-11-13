<script setup lang="ts">
    import { BaseButton, useToast, useModal } from 'kneekeetah-vue-ui-kit';
    import ConfigForm from '~/components/app/organism/ConfigForm.vue';
    import JoinForm from '~/components/chess/organism/JoinForm.vue';
    const { add: toast } = useToast();
    const { add, open } = useModal();
    const { create } = useGame();
    const { push } = useRouter();
    add({ component: ConfigForm, id: 'config-form', header: 'Configuration' });
    add({ component: JoinForm, id: 'join-form', header: 'Join game' });
    async function createGame() {
        try {
            const { id } = await create();
            push(`game/${id}`);
        } catch (e) {
            toast({ content: "Something went wrong during game creation.", color: 'alert' })
            console.error(e);
        }
    }
    function onJoin() {
        open('join-form');
    }
    function onConfig() {
        open('config-form');

        console.log('config');
    }
</script>
<template>
    <div class="flex items-center h-12 backdrop-blur-md border-t px-3 justify-between">
        <div @click="onConfig" class="flex items-center justify-center h-full w-16 cursor-pointer group hover:bg-gray-100">
            <i class="fa-solid fa-gear text-gray-700 group-hover:text-gray-800"></i>
        </div>
        <div class="flex gap-3">
            <BaseButton @click="onJoin" width="125px">Join</BaseButton>
            <BaseButton @click="createGame" width="100px" color="secondary" outlined>Create</BaseButton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Chat from '~/components/chat/organism/Chat.vue';
    import LeaveForm from '~/components/chess/molecule/LeaveForm.vue';
    import { useModal, useToast } from 'kneekeetah-vue-ui-kit';
    const { leave, create, join } = useGame();
    const { currGame } = storeToRefs(useGame());
    const { user } = storeToRefs(useAuth());
    const { add, open, close } = useModal();
    async function leaveGame() {
        try {
            await leave();
            await useRouter().push('/');
            close();
            useToast().add({ content: "You left the game" });
        } catch(e) {
            console.error(e);
            useToast().add({ content: "Error while leaving the game", color: "alert" });
        }
    };
    async function onRematch() {
        try {
            await leaveGame();
            const { id } = await create();
            useRouter().push(`/game/${id}`);
        } catch(e) {
            console.error(e);
            useToast().add({ content: "Error while rematching", color: "alert" });
        }
    }
    add({ component: Chat, id: 'chat-modal', header: 'Chat' });
    add({ component: LeaveForm, id: 'leave-modal', emits: { leave: leaveGame }, header: 'Leave the game' });;
    const onChat = () => { open({ id: 'chat-modal', props: { uid: user.value?.uid, chatId: currGame.value?.id }}) };
    const onLeave = () => { open({ id: 'leave-modal' }) };
</script>
<template>
    <div class="flex flex-col w-full h-full" v-if="currGame && user">
        <ChessMoleculeBoardHeader />
        <div class="overflow-hidden flex-1 flex justify-center items-center gap-2">
            <div class="lg:block hidden w-full h-full justify-center items-center shadow rounded overflow-hidden border border-neutral-700">
                <ChatOrganismChat :chat-id="currGame.id" :uid="user.uid" />    
            </div>
            <ChessTemplateBoard @leave="leaveGame" @rematch="onRematch" />
        </div>
        <ChessMoleculeBoardFooter @chat="onChat" @leave="onLeave" />
    </div>
</template>
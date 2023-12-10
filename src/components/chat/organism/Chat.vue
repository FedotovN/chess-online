<script setup lang="ts">
    import { BaseButton, BaseInput } from 'kneekeetah-vue-ui-kit';
    import { DeliveryStatus } from '~/types/chat/Message';
    import type Message from '~/types/chat/Message';
    import ChatService from "~/services/chat";
    const props = defineProps<{
        uid: string,
        chatId: string
    }>();
    const messages: Ref<Message[]> = ref([]);
    const newMessage = ref('');
    async function send() {
        if (!newMessage.value) return;
        const n = { content: newMessage.value, createdAt: new Date(), createdByUid: props.uid, deliveryStatus: DeliveryStatus.SENDED, id: Math.random().toString(), updatedAt: new Date() } as Message;
        messages.value.push(n);
        await ChatService.send(props.chatId, n);
        newMessage.value = '';
    }
    ChatService.listen(props.chatId, m => {
        messages.value = m;
    });
</script>
<template>
    <div class="bg-white w-full px-2 flex flex-col h-full">
        <main class="flex flex-col justify-start items-start w-full gap-2 flex-1 overflow-y-scroll no-scrollbar py-2 px-2" v-if="messages.length">
            <ChatMoleculeMessage v-for="message in messages" :content="message.content" :is-our="uid === message.createdByUid" />
        </main>
        <div class="flex justify-center items-center flex-1 w-full" v-else>
            <p class="text-sm text-gray-700">No messages</p>
        </div>
        <footer class="py-2">
            <form @submit.prevent="send" class="flex gap-2 mt-3">
                <BaseInput v-model="newMessage" placeholder="New message..."></BaseInput>
                <BaseButton>Send</BaseButton>
            </form>
        </footer>
    </div>
</template>
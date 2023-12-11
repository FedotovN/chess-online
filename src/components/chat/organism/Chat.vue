<script setup lang="ts">
    import { BaseButton, BaseLoader } from 'kneekeetah-vue-ui-kit';
    import { DeliveryStatus } from '~/types/chat/Message';
    import type Message from '~/types/chat/Message';
    import ChatService from "~/services/chat";
    const messagesContainer: Ref<HTMLElement | null> = ref(null);
    const textarea: Ref<any | null> = ref(null);
    const props = defineProps<{
        uid: string,
        chatId: string
    }>();
    const messages: Ref<Message[]> = ref([]);
    const newMessage = ref('');
    const loading = ref(false);
    onMounted(() => checkHeight());
    async function send() {
        if (!newMessage.value) return;
        loading.value = true;
        const n = { content: newMessage.value, createdAt: new Date(), createdByUid: props.uid, deliveryStatus: DeliveryStatus.SENDED, id: Math.random().toString(), updatedAt: new Date() } as Message;
        messages.value.push(n);
        checkHeight();
        if (textarea.value) {
            nextTick(() => textarea.value.checkHeight());
        }
        newMessage.value = '';
        await ChatService.send(props.chatId, n);
        loading.value = false;
    }
    function checkHeight() {
        if (messagesContainer.value) {
            const { scrollHeight } = messagesContainer.value;
            const { height } = messagesContainer.value.getBoundingClientRect();
            messagesContainer.value.scrollTo({ top: scrollHeight - height, behavior: 'smooth'}); 
        }
    }
    ChatService.listen(props.chatId, m => {
        messages.value = m;
        nextTick(() => checkHeight());
    });
</script>
<template>
    <div class="bg-white w-full px-2 flex flex-col h-full">
        <main class="flex flex-col justify-start items-start w-full gap-2 flex-1 overflow-y-scroll no-scrollbar py-2 px-2" v-if="messages.length" ref="messagesContainer">
            <ChatMoleculeMessage v-for="message in messages" :content="message.content" :is-our="uid === message.createdByUid" />
        </main>
        <div class="flex justify-center items-center flex-1 w-full" v-else>
            <p class="text-sm text-gray-700">No messages</p>
        </div>
        <footer class="py-2">
            <form @submit.prevent="send" class="flex gap-2 h-full">
                <ChatMoleculeTextarea v-model="newMessage" @enter="send" ref="textarea" />
                <BaseButton :disabled="loading" class="h-full">
                    <BaseLoader v-if="loading" />
                    <p v-else>Send</p>
                </BaseButton>
            </form>
        </footer>
    </div>
</template>
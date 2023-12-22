<template>
    <div class="flex justify-between items-center w-full text-gray-300 h-12">
        <BaseButton @click="onLeave" color="alert" flat>Leave</BaseButton>
        <div class="lg:hidden">
            <BaseButton @click="onChat" flat>Chat</BaseButton>
        </div>  
    </div>
</template>

<script setup lang="ts">
    import { BaseButton } from "kneekeetah-vue-ui-kit";
    const emit = defineEmits<{
        (e: 'leave'): void,
        (e: 'chat'): void,
    }>()
    const onLeave = () => emit('leave');
    const onChat = () => emit('chat');
</script>
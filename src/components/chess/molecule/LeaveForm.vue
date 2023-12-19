<script setup lang="ts">
    import { BaseButton, BaseLoader, useModal } from 'kneekeetah-vue-ui-kit';
    const loading = ref(false);
    const { close } = useModal();
    const emit = defineEmits<{ (e: 'leave'): void }>();
    const onLeave = () => {
        loading.value = true;
        emit('leave');
    }
</script>
<template>
    <div class="flex flex-col text-gray-300 gap-4">
        <p class="text-gray-400">Are you sure you want to leave?</p>
        <div class="flex gap-2">
            <BaseButton color='alert' flat @click="onLeave" width="125px">
                <BaseLoader v-if="loading" color="white"></BaseLoader>
                <p v-else>Leave</p>
            </BaseButton>
            <BaseButton @click="close">Cancel</BaseButton>
        </div>
    </div>
</template>

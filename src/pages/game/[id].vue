<script setup lang="ts">
    import { BaseLoader } from 'kneekeetah-vue-ui-kit';
    const { id } = useRoute().params;
    const loading = ref(true);
    useGameRoom(id as string).then(() => {
        loading.value = false;
    });
</script>
<template>
    <div class="overflow-hidden h-screen flex justify-center items-center flex-col bg-neutral-800 px-2">
        <div class="flex flex-col gap-2 items-center text-gray-300" v-if="loading">
            <BaseLoader label="Joining room..."></BaseLoader>
        </div>
        <ChessTemplateGame v-else />
    </div>
</template>

<script setup lang="ts">
    const { id } = useRoute().params;
    const loading = ref(true);
    useGameRoom(id as string).then(() => {
        loading.value = false;
    })
</script>
<template>
    <div class="overflow-hidden h-screen flex justify-center items-center flex-col bg-neutral-800 px-2" v-show="!loading">
        <ChessTemplateGame />
    </div>
</template>

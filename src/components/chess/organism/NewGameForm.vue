<script setup lang="ts">
    import { BaseToggle, BaseButton, useModal, BaseLoader } from 'kneekeetah-vue-ui-kit';
    const { create } = useGame();
    const { close } = useModal();
    const loading = ref(false);
    const form = ref({
        isWhite: true,
    });
    async function createGame() {
        loading.value = true;
        const { id } = await create();
        await useRouter().push(`/game/${id}`);
        loading.value = false;
        close();
    }
</script>
<template>
    <div class="flex flex-col w-full gap-4 text-gray-300">
        <div class="flex justify-between">
            <p>Your side</p>
            <BaseToggle v-model="form.isWhite" truthy-label="White" falsy-label="Black" />
        </div>     
        <BaseButton rounded @click="createGame">
            <BaseLoader v-if="loading" color="white"></BaseLoader>
            <p v-else>Create</p>
        </BaseButton>
    </div>
</template>
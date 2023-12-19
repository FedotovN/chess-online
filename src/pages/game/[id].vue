<script setup lang="ts">
    import { BaseLoader, useToast } from 'kneekeetah-vue-ui-kit';
    const { id } = useRoute().params;
    const loading = ref(true);
    const { join } = useGame();
    const { add } = useToast()
    useAuth().onAuthResolve(async user => {
        if (!user) {
            add({ content: "Let's login first!", color: "secondary", delay: 5000 });
            return navigateTo("/auth/login");
        }
        try {
            await join(id as string);
            add({ content: `You've connected to the game`, color: "primary", delay: 5000 });
            
        } catch (e) {
            await navigateTo("/");
            add({ content: `Error while connecting to the game`, color: "alert", delay: 5000 });
            console.error(e);
        } finally {
            loading.value = false;
        }
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

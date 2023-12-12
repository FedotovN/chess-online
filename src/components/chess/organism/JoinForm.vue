<script setup lang="ts">
    import { BaseInput, BaseButton, useModal } from 'kneekeetah-vue-ui-kit';
    const { push } = useRouter();
    const id = ref('');
    const error = ref('');
    const joinGame = () => { 
        if (!id.value) {
            error.value = "Game id is required";
            return;
        };
        useModal().close();
        push(`/game/${id.value}`)
    }
</script>
<template>
    <div class="flex flex-col pb-6 text-gray-300">
        <p class="text-sm">Enter game id to join the game!</p>
        <form @submit.prevent="joinGame" class="flex gap-2 pt-6">
            <BaseInput v-model="id" :error-message="error" placeholder="Game id"></BaseInput>
            <BaseButton width="125px">Join</BaseButton>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { BaseInput, BaseButton, useModal } from 'kneekeetah-vue-ui-kit';
    const { push } = useRouter();
    const id = ref('');
    const joinGame = () => { 
        useModal().close();
        push(`/game/${id.value}`)
    }
</script>
<template>
    <div class="flex flex-col">
        <p class="text-gray-700">Enter game id to join the game!</p>
        <form @submit.prevent="joinGame" class="flex gap-2 pt-6">
            <BaseInput v-model="id" placeholder="Game id"></BaseInput>
            <BaseButton width="125px">Join</BaseButton>
        </form>
    </div>
</template>

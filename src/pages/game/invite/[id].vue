<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    import ChessService from "~/services/chess";
    const { id } = useRoute().params;
    const room = await ChessService.getChessRoom(id as string);
    const invitedBy = room.players.find(player => player !== null);
</script>
<template>
    <div class="flex h-screen w-full justify-center items-center w-92">
        <div class="flex flex-col gap-5 border rounded shadow px-4 py-2 items-center">
                <h1 class="text-lg">Invite from {{ invitedBy?.displayName }}</h1>
                <BaseButton width="100%">Connect to the game</BaseButton>
                <NuxtLink to="/">Main page</NuxtLink>
        </div>
    </div>
</template>

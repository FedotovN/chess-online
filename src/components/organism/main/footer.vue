<script setup lang="ts">
    import GameService from '~/services/chess/';
    import { BaseButton, useToast } from 'kneekeetah-vue-ui-kit';
    const { user } = storeToRefs(useAuth());
    const { add } = useToast();
    async function createGameRoom() {
        if (!user.value) {
            add({ content: "Login first", delay: 4000 }); 
            return;
        }
        const room = await GameService.createChessRoom(user.value);
        if (!room) {
            add({ content: "Error while creating a room", delay: 4000 }); 
            return;
        }
        useRouter().push(`game/${room.id}`);
    }
</script>
<template>
    <div class="h-12 border-t w-full backdrop-blur px-3 z-10">
        <div class="h-full flex w-full items-center justify-between">
            <div class="flex gap-2">
                <small class="text-gray-500">
                    Chess Icons By Cburnett - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1499806
                </small>
            </div>
            <div class="flex gap-2 items-center">
                <BaseButton width="200px">Enter game</BaseButton>
                <BaseButton @click="createGameRoom" width="150px" color="secondary">Create game</BaseButton>
            </div>
        </div>
    </div>
</template>

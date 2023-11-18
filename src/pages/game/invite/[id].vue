<script setup lang="ts">
    import { BaseButton, useToast } from 'kneekeetah-vue-ui-kit';
    import type ChessRoom from '~/models/chess/room/ChessRoom';
    import ChessService from "~/services/chess";
    const { push } = useRouter();
    const { id } = useRoute().params;
    const { add } = useToast();
    const loading = ref(true);
    const room: Ref<ChessRoom | null> = ref(null);
    try {
        if (process.client) {
            room.value = await ChessService.getChessRoom(id as string);            
            loading.value = false;
        }
    } catch (e) {
        add({ content: "Error while getting the game. Does it exists?", color: 'alert' });
        navigateTo("/")
        console.error(e);
    }
    const invitedBy = computed(() => {
        if(!room.value) return null;
        return room.value.players.find(player => player !== null);
    });
    const onJoin = () => {
        push(`/game/${id}`);
    };
    const onDismiss = () => {
        console.log("should send dismiss message to firestore");
        push("/");
    }
</script>
<template>
    <div class="flex h-screen w-full justify-center items-center w-92" v-show="!loading">
        <div class="flex flex-col gap-3 border rounded px-2 py-1 text-gray-700 w-96">
            <div class="flex justify-between items-center py-2 border-b">
                <p>Invite from <span class="text-blue-500 cursor-pointer">{{ invitedBy?.displayName }}</span></p>    
                <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="flex gap-3 items-center">
                <small class="text-sm">To play as <span class="font-bold">{{ invitedBy?.side === 'white' ? 'black ♛' : 'white ♕' }}</span></small>
                <span class="h-1 w-1 rounded bg-gray-500"/>
                <small>Time per move <span class="font-bold">{{ 5 }} min</span> <i class="fa-solid fa-clock pl-1"></i></small>
            </div>
            <div class="flex gap-2 w-full pb-1">
                <div class="flex flex-col gap-2 w-full">
                    <BaseButton width="100%" @click="onJoin">Join</BaseButton>
                    <NuxtLink class="text-xs" to="/">Ignore and go to main page</NuxtLink>
                </div>
                    <BaseButton width="85px" color="alert" flat @click="onDismiss">Dismiss</BaseButton>
            </div>
        </div>
    </div>
</template>

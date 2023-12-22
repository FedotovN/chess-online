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
        room.value = await ChessService.getChessRoom(id as string);            
        loading.value = false;
    } catch (e) {
        add({ content: "Error while getting the game. Does it exists?", color: 'alert' });
        navigateTo("/")
        console.error(e);
    }
    const invitedBy = computed(() => {
        if(!room.value) return null;
        return room.value.players.find(player => player !== null);
    });
    const ourSide = invitedBy.value?.side === 'white' ? 'black' : 'white';
    useSeoMeta({
        title: `Play chess with ${ invitedBy.value?.displayName }`,
        ogTitle: 'Play chess',
        description: `You\'ve been invited to chess room with id ${ room.value?.id }`,
        ogDescription: `You\'ve been invited to chess room with id ${ room.value?.id }`,
        ogImage: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpZTvydV.png',
        twitterCard: 'summary_large_image',
    })
    const onJoin = () => {
        push(`/game/${id}`);
    };
</script>
<template>
    <div class="flex h-d-screen w-full justify-center items-center bg-neutral-800 max-w-full px-2" v-if="!loading">
        <div class="flex flex-col gap-3 border border-neutral-600 rounded px-2 py-1 text-gray-300 bg-neutral-700 w-96 max-w-full shadow">
            <div class="flex justify-between items-center py-2 border-b">
                <p>Invite from <span class="text-purple-300 cursor-pointer">{{ invitedBy?.displayName }}</span></p>    
                <i class="fa-solid fa-envelope"></i>
            </div>
            <main class="flex flex-col flex-1 justify-between gap-3">
                <small class="text-sm">Your side will be <span class="font-bold">{{ invitedBy?.side === 'white' ? 'black ♛' : 'white ♕' }}</span></small>
                <div class="flex w-full justify-between">
                    <small>Opponent EXP. <span class="font-bold text-purple-300">{{ invitedBy?.stats?.score }}</span> <i class="fa-solid fa-star pl-1"></i></small>
                    <small>Games played: <span class="font-bold text-purple-300">{{ invitedBy?.stats?.gamesPlayed }}</span> <i class="fa-solid fa-chess"></i></small>
                </div>
                <div class="w-full flex flex-col gap-2 items-center">
                    <small class="text-green-300">Current board state:</small>
                    <div class="w-full px-8">
                        <ChessOrganismBoard :side="ourSide" disabled :value="room?.board" v-if="room" />
                    </div>
                </div>
            </main>
            <div class="flex flex-col gap-2 w-full pb-1">
                <BaseButton width="100%" @click="onJoin" raised outlined large>Fight!</BaseButton>
                <BaseButton width="100%" color="alert" raised outlined large @click="useRouter().push('/')">Cancel</BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useToast, BaseButton } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    import type ChessRoom from '~/models/chess/room/ChessRoom';
    import GameService from "~/services/chess"
    const loading = ref(true);
    const { join, listen, leave, send } = useGame();
    const { currGame } = storeToRefs(useGame());
    const { add } = useToast();
    const { id } = useRoute().params;
    const { push } = useRouter();
    const { onAuthResolve } = useAuth();
    const board = ref(new Board());
    onAuthResolve(async user => {
        if (!user) {
            add({ content: "Let's login first!", color: "secondary", delay: 5000 });
            return navigateTo("/auth/login");
        }
        try {
            await join(id as string);
            add({ content: `You've connected to the game`, color: "primary", delay: 5000 });
            loading.value = false;
            listen(room => {
                board.value = room.board;
            });
        } catch (e) {
            await navigateTo("/");
            add({ content: `Error while connecting to the game`, color: "alert", delay: 5000 });
            console.error(e);
        }
    });
    async function quit() {
        await push("/");
        await leave();
        add({ content: `You've left the game`, delay: 5000 });
    }
    async function onUpdate(board: Board) {
        const newRoom = { board: { ...board } }
        await send(newRoom as ChessRoom);
    }
    const getBoard = computed(() => board.value) as ComputedRef<Board>;
</script>
<template>
    <div class="h-screen w-full flex flex-col justify-center items-center" v-show="!loading">
        <p>Current players: {{ currGame?.players.map(player => `${player?.displayName} (${player?.side})`).join(', ')  }}</p> 
        <p>Game id: {{ currGame?.id  }}</p>
        <div class="flex w-92 gap-2">
            <BaseButton raised color="alert" @click="quit">Leave</BaseButton>
        </div>
        <div class="h-[370px] w-[370px]">
            <ChessOrganismBoard :model-value="getBoard" @update:model-value="board = $event" @update="onUpdate" />
        </div>
    </div>
</template>

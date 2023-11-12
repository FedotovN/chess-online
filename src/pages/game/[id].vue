<script setup lang="ts">
    import { useToast, BaseButton } from 'kneekeetah-vue-ui-kit';
    import type ChessRoom from '~/models/chess/room/ChessRoom';
    const loading = ref(true);
    const { join, listen, leave, send } = useGame();
    const { currGame } = storeToRefs(useGame());
    const { add } = useToast();
    const { id } = useRoute().params;
    const { push } = useRouter();
    const { onAuthResolve } = useAuth();
    onAuthResolve(async user => {
        if (!user) {
            add({ content: "Let's login first!", color: "secondary", delay: 5000 });
            return navigateTo("/auth/login");
        }
        try {
            await join(id as string);
            add({ content: `You've connected to the game`, color: "primary", delay: 5000 });
            loading.value = false;
            listen(() => {
                add({ content: 'Some game event' });
            });
        } catch (e) {
            await navigateTo("/");
            add({ content: `Error while connecting to the game`, color: "alert", delay: 5000 });
        }
    });
    async function quit() {
        await push("/");
        await leave();
        add({ content: `You've left the game`, delay: 5000 });
    }
    async function sendEvent() {
        const newRoom = { ...currGame.value, newField: Math.random() }
        await send(newRoom as ChessRoom);
    }
</script>
<template>
    <div class="h-screen w-full flex flex-col justify-center items-center" v-show="!loading">
        <p>Current players: {{ currGame?.players.map(player => `${player?.displayName} (${player?.side})`).join(', ')  }}</p> 
        <p>Game id: {{ currGame?.id  }}</p>
        <div class="flex w-92 gap-2">
            <BaseButton raised color="alert" @click="quit">Leave</BaseButton>
            <BaseButton rounded @click="sendEvent">Push event</BaseButton>

        </div>
        <div class="h-[370px] w-[370px]">
            <OrganismChessBoard />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useToast } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    import type { Color } from '~/types/chess/Color';
    const { id } = useRoute().params;
    const { leave, updateBoard } = useGame();
    const { getOpponent, getBoard, getPlayerSide, getCurrentSide } = storeToRefs(useGame());
    const { add } = useToast();
    const { push } = useRouter();
    const { loading } = useGameRoom(id as string);
    const board = computed({
        get() {
            return getBoard.value
        },
        async set(board: Board | null) {
            if (!board) return;
            const newSide = getCurrentSide.value === 'white' ? 'black' : 'white';
            await updateBoard(board, newSide);
        }
    })
    async function quit() {
        loading.value = true;
        await push("/");
        await leave();
        add({ content: `You've left the game`, delay: 5000 });
    }
</script>
<template>
    <div class="h-screen w-full flex flex-col" v-show="!loading">
        <ChessOrganismHeader :opponent="getOpponent" :current-side="getCurrentSide" @quit="quit" /> 
        <div class="flex-1 flex justify-center items-center">
            <div class="flex gap-2">
                <div class="h-[500px] w-[500px]" v-if="board">
                    <ChessOrganismBoard v-model="board" :player-side="getPlayerSide" :current-side="getCurrentSide" />
                </div>
            </div>
        </div>
    </div>
</template>

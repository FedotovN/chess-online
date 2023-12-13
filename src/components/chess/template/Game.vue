<script setup lang="ts">
    import PromotedPawnForm from '../molecule/PromotedPawnForm.vue';
    import GameOverOverview from '../molecule/GameOverOverview.vue';
    import ChatOrganismChat from '~/components/chat/organism/Chat.vue';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    import Board from '~/models/chess/Board';
    import type Figure from '~/models/chess/figures/Figure';
    const { getPlayerSide, getMovingSide, getOpponent, getBoard, currGame } = storeToRefs(useGame());
    const { move, setGameOver } = useGame();
    const ourMove = computed(() => getMovingSide.value === getPlayerSide.value);
    const toDisableBoard = computed(() => !getOpponent.value || !ourMove.value);
    const canPromote = computed(() => board.value?.getPromotedPawn(getPlayerSide.value!));
    const isGameOver = computed(() => !!board.value?.isGameOver());
    const { add, open, close } = useModal();
    const footer = ref(null);
    add({ header: 'Promote a pawn', component: PromotedPawnForm, id: 'promote-pawn' });
    add({ header: 'Game over', component: GameOverOverview, id: 'game-over' });    
    add({ header: `Chat`, component: ChatOrganismChat, id: 'chat'});
    async function promotePawn() {
        const pawn = board.value.getCell(canPromote.value.position).figure;
        open('promote-pawn', { 'pawn': pawn, side: getPlayerSide.value }, { promote: async (figure: Figure) => {
                board.value.getCell(figure.position).figure = figure;
                await move({ board: board.value, movingSide: getMovingSide.value === 'white' ? 'black' : 'white' });
                close();
            }
        })
    }
    const board = computed({
        get() {
            return getBoard.value as Board
        },
        async set(board: Board) {
            if (canPromote.value) promotePawn();
            else {
                await move({ board, movingSide: getMovingSide.value === 'white' ? 'black' : 'white' });
            }
        }
    })
    watch(isGameOver, async v => {
        if (!v) return;
        await setGameOver();
        open('game-over', { gameOverInfo: board.value?.isGameOver() });
    })
</script>
<template>
    <div class="flex flex-col w-full h-full" v-if="currGame && useAuth().user">
        <ChessMoleculeBoardHeader @chat="open('chat', { chatId: currGame!.id, uid: useAuth().user!.uid })" />
        <div class="overflow-hidden flex-1 flex justify-center items-center gap-2" v-if="board">
            <div class="lg:block hidden w-full h-full justify-center items-center shadow rounded overflow-hidden border border-neutral-700">
                <ChatOrganismChat :uid="useAuth().user!.uid" :chat-id="currGame.id" />
            </div>
            <div class="w-full h-full items-center justify-center flex flex-col">
                <ChessOrganismBoard
                    v-model="board"
                    :disabled="toDisableBoard"
                    :player-side="getPlayerSide"
                    :current-side="getMovingSide"
                />
            </div>
        </div>
        <ChessMoleculeBoardFooter ref="footer" />
    </div>
</template>
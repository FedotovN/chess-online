<script setup lang="ts">
    import Board from '~/models/chess/Board';
    import { useModal } from 'kneekeetah-vue-ui-kit';
    import GameOverOverview from '../../molecule/GameOverOverview.vue';
    const { add, open } = useModal();
    const { getBoard, getMovingSide, getOurSide, currGame  } = storeToRefs(useGame());
    const { move, setGameOver } = useGame();
    const emit = defineEmits<{
        (e: 'leave'): void,
        (e: 'rematch'): void,
    }>();
    add({ id: 'game-over', component: GameOverOverview, header: 'Game over' });
    async function onBoardUpdate(board: Board) {
        await move(board);
    }
    async function onGameOver() {
        await setGameOver();
        if (!currGame.value?.gameOverInfo) return;
        open({
            id: 'game-over',
            props: {
                gameOverInfo: currGame.value.gameOverInfo
            },
            emits: {
                leave: () => emit('leave'),
                rematch: () => emit('rematch'),
            }
        })
    }
</script>
    <template>
    <div class="flex flex-col h-full w-full" v-if="getBoard && getOurSide">
        <ChessMoleculeOnlineHeader />
        <div class="px-3 h-full">
            <ChessTemplateBoard
                :disabled="getMovingSide !== getOurSide"
                :side="getOurSide"
                :board="getBoard"
                @update="onBoardUpdate"
                @game-over="onGameOver"
            />
        </div>
        <ChessMoleculeOnlineFooter @leave="emit('leave')" />
    </div>
</template>
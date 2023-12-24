<script setup lang="ts">
import Board from '~/models/chess/Board';
import { useModal, useToast } from 'kneekeetah-vue-ui-kit';
import GameOverOverview from '../../molecule/GameOverOverview.vue';
import type Message from '~/types/chat/Message';
const { user } = storeToRefs(useAuth());
const { getBoard, getMovingSide, getOurSide, currGame, getOpponent } = storeToRefs(useGame());
const { move, setGameOver } = useGame();
const { add, open } = useModal();
add({ id: 'game-over', component: GameOverOverview, header: 'Game over' });
const emit = defineEmits<{
  (e: 'leave'): void,
  (e: 'rematch'): void,
}>();
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
function onNewMessage(message: Message) {
  const isOur = message.createdByUid === user.value?.uid;
  if (isOur) return;
  const toastText = `${getOpponent.value?.displayName}: ${message.content}`
  useToast().add({ content: toastText, delay: 2000 });
}
</script>
<template>
  <div class="flex flex-col items-center w-full h-full"
    v-if="getBoard && getOurSide && currGame && currGame.id && user && user.uid">
    <ChessMoleculeOnlineHeader @leave="emit('leave')" />
    <div class="flex flex-col h-full w-full p-3 gap-3 overflow-hidden">
      <ChessTemplateBoard :disabled="getMovingSide !== getOurSide" :side="getOurSide" :board="getBoard"
        @update="onBoardUpdate" @game-over="onGameOver" />
      <ChessMoleculeOnlineFooter :game-id="currGame.id" :user-id="user.uid" @new-message="onNewMessage" />
    </div>
  </div>
</template>
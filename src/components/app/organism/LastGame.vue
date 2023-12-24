<script setup lang="ts">
import { BaseTooltip, useToast, BaseButton } from 'kneekeetah-vue-ui-kit';
import { getPositionNameByPosition } from '~/types/chess/Position';
import UserService from "~/services/users"
import ChessService from "~/services/chess";
import type ChessRoom from '~/models/chess/room/ChessRoom';
import type { Color } from '~/types/chess/Color';
const { user } = storeToRefs(useAuth());
const lastGame: Ref<ChessRoom | null> = ref(null);
if (user.value) {
  const id = await UserService.getLastGame(user.value.uid);
  if (id) {
    try {
      lastGame.value = await ChessService.getChessRoom(id);
    } catch (e) {
      useToast().add({ content: 'Error while looking for last game', color: 'alert', delay: 5000 });
    }
  }
}
const userId = computed(() => user.value?.uid);
const gameOverInfo = computed(() => lastGame.value?.gameOverInfo);
const players = computed(() => gameOverInfo?.value?.players);
const winner = computed(() => gameOverInfo.value?.winner);
const player = computed(() => players.value?.find(p => p?.uid === userId.value));
const wonTheGame = computed(() => winner.value && winner.value?.uid === userId.value);
const playerSide = computed(() => player.value?.side);
const moves = computed(() => lastGame.value?.board.moves.toReversed());
const playerBySide = (side: Color) => players.value?.find(p => p.side === side);
</script>
<template>
  <div class="flex flex-col justify-center gap-4 max-w-full overflow-hidden h-72 text-gray-300 w-full">
    <div class="flex w-full justify-center">
      <h1 class="text-2xl whitespace-nowrap text-ellipsis overflow-hidden">Last game</h1>
    </div>
    <div class="w-full border border-neutral-800 rounded shadow px-3 py-2 overflow-hidden max-w-full"
      v-if="lastGame && gameOverInfo">
      <div class="flex flex-col gap-3 w-full max-w-full">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl sm:text-3xl">
            {{ gameOverInfo?.type }}
          </h2>
          <i class="text-4xl sm:text-5xl fa-solid fa-smile text-green-300" v-if="wonTheGame === true"></i>
          <i class="text-4xl sm:text-5xl fa-solid fa-face-sad-cry text-red-300" v-else-if="wonTheGame === false"></i>
          <i class="text-4xl sm:text-5xl fa-solid fa-chess text-blue-300" v-else></i>
        </div>
        <div class="flex w-full justify-between">
          <div class="flex gap-2 items-center text-md sm:text-xl">
            <h2 class="text-green-300" v-if="wonTheGame === true">Win</h2>
            <h2 class="text-red-300" v-else-if="wonTheGame === false">Lose</h2>
            <h2 class="text-blue-300" v-else>Draw</h2>
            <span class="h-2 w-2 bg-gray-300 rounded-full"></span>
            <p class="text-xs sm:text-sm"><span class="font-bold">{{ moves?.length }}</span> moves</p>
          </div>
        </div>
        <div class="flex flex-col gap-2 overflow-hidden max-w-full">
          <div class="flex gap-2 items-center">
            <p class="sm:text-lg text-md font-bold">Moves made</p>
          </div>
          <div class="flex gap-4 overflow-x-scroll no-scrollbar max-w-full rounded-lg shadow-inner shadow-black p-3"
            v-if="moves">
            <div class="relative flex justify-center items-center rounded-full h-10 aspect-square border-2"
              :class="{ 'border-green-300': move.side === playerSide }" v-for="(move, ind) in moves">
              <img :src="getSvgSrcFromFigure(move.side, move.figure.name)" class="relative h-[85%] z-10">
              <span v-if="ind !== moves.length - 1" class="absolute h-1 w-4 -right-1/2 mr-px"
                :class="{ 'bg-green-300': move.side === playerSide, 'bg-gray-300': move.side !== playerSide }"></span>
              <BaseTooltip allow-h-t-m-l>
                <p>{{ playerBySide(move.side)?.displayName }} moves his {{ move.figure.name }} from {{
                  getPositionNameByPosition(move.from) }} to {{ getPositionNameByPosition(move.to) }}</p>
              </BaseTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 items-center w-full border border-neutral-800  rounded shadow px-3 py-2 overflow-hidden max-w-full"
      v-else>
      <p class="text-gray-400">There's no games yet <i class="fa-solid fa-wind pl-2"></i></p>
      <small>Go ahead and start your <span class="text-purple-400 font-bold">game master</span> journey! <i
          class="fa-solid fa-arrow-up text-green-300 pl-2"></i></small>
    </div>
  </div>
</template>
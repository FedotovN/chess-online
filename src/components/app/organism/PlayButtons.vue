<script setup lang="ts">
import NewGameForm from '~/components/chess/organism/NewGameForm.vue';
import JoinGameForm from "~/components/chess/organism/JoinForm.vue";
import { useModal } from "kneekeetah-vue-ui-kit";
const { add, open } = useModal();
add({ header: 'Create a game', component: NewGameForm, id: 'create-game' });
add({ header: 'Join a game', component: JoinGameForm, id: 'join-game' });
const props = defineProps<{
  isLoggedIn: boolean,
}>();
type Button = { title?: string, icon?: string, description?: string, callback?: () => void, requireLogin?: boolean };
const buttons: Array<Array<Button>> = [
  [
    {
      title: 'Create a game',
      icon: 'fa-solid fa-play',
      description: 'And use invite link to play with your friend',
      callback: () => open({ id: 'create-game' }),
      requireLogin: true,
    },
    {
      title: 'Join game',
      icon: 'fa-solid fa-door-open',
      description: 'Using your friend\'s room\'s ID',
      callback: () => open({ id: 'join-game' }),
      requireLogin: true,
    },
  ],
  [
    {
      title: 'Create a Board',
      icon: 'fa-solid fa-chess-board',
      description: 'Play offline.',
      callback: () => useRouter().push(`/game/singleplayer`),
    },
  ]
]
function handleClick(button: Button) {
  if (!button.callback) return;
  if (!button.requireLogin) return button.callback();
  if (props.isLoggedIn) button.callback();
}
const toDisable = (button: Button) => {
  return button.requireLogin && !props.isLoggedIn;
}
</script>
<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex w-full justify-center">
      <h1 class="text-4xl whitespace-nowrap text-ellipsis overflow-hidden">Play chess</h1>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="row in buttons" class="flex gap-2">
        <div v-for="button in row" @click="handleClick(button)" class="flex-1 h-full w-full relative">
          <div
            class="h-full flex flex-col gap-2 border border-neutral-800 bg-neutral-900 py-2 px-3 shadow-sm rounded cursor-pointer select-none hover:border-green-200 hover:shadow-green-900 transition-all group relative hover:z-10 hover:shadow-2xl"
            :class="{ 'opacity-25 pointer-events-none': toDisable(button) }">
            <div class="flex justify-between items-center group-hover:text-green-300 transition-all">
              <h2 class="text-lg sm:text-xl">{{ button.title }}</h2>
              <i :class="button.icon"></i>
            </div>
            <p class="sm:text-sm text-xs text-neutral-400">{{ button.description }}</p>
          </div>
          <div
            class="absolute border rounded border-red-300 w-full h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 select-none"
            v-if="toDisable(button)">
            <div class="h-full w-full justify-center items-center flex flex-col">
              <i class="fa-solid fa-lock text-2xl"></i>
              <small class="text-red-300">Requires login</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
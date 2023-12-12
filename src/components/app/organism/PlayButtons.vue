<script setup lang="ts">
    import NewGameForm from '~/components/chess/organism/NewGameForm.vue';
    import JoinForm from '~/components/chess/organism/JoinForm.vue';
    import { useModal } from "kneekeetah-vue-ui-kit";
    const { add, open } = useModal();
    add({ header: 'Create a game', component: NewGameForm, id: 'create-game' });
    add({ header: 'Join game', component: JoinForm, id: 'join-game' });
    const createGame = () => open('create-game');
    const joinGame = () => open('join-game');
    const buttons = [
        [ 
            {
                title: 'Create a game',
                icon: 'fa-solid fa-play',
                description: 'And use invite link to play with your friend',
                callback: createGame
            },
            {
                title: 'Join game',
                icon: 'fa-solid fa-door-open',
                description: 'Using your friend\'s room\'s ID',
                callback: joinGame
            },
        ],
        [
            {
                title: 'Create a Board',
                icon: 'fa-solid fa-chess-board',
                description: 'Play offline.',
            },
        ]
    ]
</script>
<template>
    <div class="w-full flex flex-col gap-4 px-3">
                <div class="flex w-full justify-center">
                    <h1 class="text-4xl whitespace-nowrap text-ellipsis overflow-hidden">Play chess</h1>
                </div>
                <div class="flex flex-col gap-2">
                    <div v-for="row in buttons" class="flex gap-2">
                        <div v-for="button in row" @click="button.callback" class="flex-1 flex flex-col border border-neutral-800 py-2 px-3 shadow-sm rounded gap-2 cursor-pointer select-none hover:border-green-200 hover:shadow-green-900 transition-all group hover:z-10 relative hover:shadow-2xl">
                            <div class="flex justify-between items-center group-hover:text-green-300 transition-all">
                                <h2 class="text-xl">{{ button.title }}</h2>
                                <i :class="button.icon"></i>
                            </div>
                            <p class="text-sm text-neutral-400">{{ button.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
</template>
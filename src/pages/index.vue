<script setup lang="ts">
    const { user } = storeToRefs(useAuth());
    import { BaseButton, useToast } from 'kneekeetah-vue-ui-kit';
    async function leave() {
        await useRouter().push('/auth/login');
        await nextTick();
        useAuth().logout();
        useToast().add({ content: 'You left dojo', delay: 5000 });
    }
    const toAuthPage = (key: string) => useRouter().push(`/auth/${key}`);
</script>
<template>
    <div class="flex flex-col h-screen w-full justify-center items-center bg-neutral-900 text-gray-300">
        <header class="w-full flex items-center justify-between text-2xl py-1 px-3 shadow bg-neutral-800 h-14">
            <div class="flex items-center gap-4">
                <h1 class="border-neutral-700 sm:text-2xl text-xl">
                    <span class="text-green-300">Nuxt</span>Chess
                </h1>
                <a href="https://github.com/FedotovN/chess-online" target="_blank" class="text-gray-300 cursor-pointer group hidden sm:inline">
                    <i class="fa-brands fa-github group-hover:scale-[1.1] group-hover:text-green-300 transition-all"></i>
                </a>
            </div>
            <div class="flex-1 gap-2 flex justify-end items-center">
                <div class="flex items-center gap-2 text-sm whitespace-nowrap text-ellipsis overflow-hidden" v-if="user">
                    <BaseButton @click="leave" flat color="alert">Leave dojo</BaseButton>
                    <p>
                        <span class="font-bold">
                            {{ user.displayName }}
                        </span>
                    </p>
                </div>
                <div class="text-sm flex text-ellipsis overflow-hidden items-center gap-2" v-else>
                    <BaseButton flat color="success">Enter dojo</BaseButton>
                </div>
                <UserAtomPhoto v-if="user" :photo-url="user.photoURL" />
            </div>
        </header>
        <main class="flex-col flex flex-1 w-full px-2 justify-center items-center">
            <div class="flex flex-col gap-6" v-if="user">
                <AppOrganismPlayButtons />
                <AppOrganismLastGame />
            </div>
            <div class="flex flex-col border border-neutral-800 rounded shadow px-2 py-1 gap-4 text-center" v-else>
                <h2 class="text-xl border-b border-neutral-800 py-1">Welcome, <span class="text-purple-400">web traveler</span></h2>
                <p>You have to <nuxt-link to="/auth/login" class="text-green-300">login</nuxt-link> to start your first game</p>
                <div class="flex w-full gap-2">
                    <BaseButton width="100%" flat color="success" @click="toAuthPage('login')" >Login</BaseButton>
                    <BaseButton width="100%" flat color="success" @click="toAuthPage('signup')" >Signup</BaseButton>
                </div>
            </div>
        </main>
    </div>
</template>
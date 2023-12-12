<script setup lang="ts">
    const { user } = storeToRefs(useAuth());
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    const toAuthPage = (key: string) => useRouter().push(`/auth/${key}`);
</script>
<template>
    <div class="flex flex-col h-screen w-full justify-center items-center bg-neutral-900 text-gray-300">
        <AppOrganismHeader />
        <main class="flex-col flex flex-1 w-full px-2 justify-center items-center">
            <div class="max-w-full justify-center items-center flex flex-col gap-6" v-if="user">
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
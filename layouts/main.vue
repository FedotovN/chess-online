<script setup lang="ts">
    import { BaseButton, BaseLoader, useToast } from 'kneekeetah-vue-ui-kit';
    import { useAuth } from "@/stores/auth";
    import { storeToRefs } from "pinia";
    const { loading, getUser } = storeToRefs(useAuth());
    const { logout } = useAuth();
    function goToAuthPage(name: string) {
        useRouter().push({ name });
    }
    async function onLogout() {
        await logout();
        useRouter().push('/auth/login');
        useToast().add({ content: "Вы вышли из аккаунта", delay: 5000 });
    }
</script>
<template>
    <div class="flex flex-col bg-gray-100 w-full h-screen">
        <div class="flex w-full h-12 border-b shadow items-center px-2 py-1 justify-between">
            <h1 class="text-2xl text-gray-700">Chess Online</h1>
            <div class="flex items-center gap-2" v-if="loading">
                <BaseLoader></BaseLoader>
                <small>Getting authentication info...</small>
            </div>
            <div class="flex gap-2 items-center" v-else-if="!!getUser">
                <div class="rounded-full h-16 w-16 overflow-hidden bg-gray-100" v-if="getUser.photoURL">
                    <img :src="getUser.photoURL">
                </div>
                <small>{{ getUser.displayName }}</small>
                <BaseButton flat color='alert' @click="onLogout">Logout</BaseButton>
            </div>
            <div class="flex gap-2" v-else>
                <BaseButton @click="goToAuthPage('auth-index-login')">Login</BaseButton>
                <BaseButton @click="goToAuthPage('auth-index-signup')" flat color='secondary'>Signup</BaseButton>
            </div>
        </div>
        <nuxt-page/>
    </div>
</template>
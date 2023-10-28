<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    function goToAuthPage(name: string) {
        useRouter().push({ name });
    }
</script>
<template>
    <div class="flex flex-col bg-gray-100 w-full h-screen">
        <div class="flex w-full h-12 border-b shadow items-center px-2 py-1 justify-between">
            <h1 class="text-2xl text-gray-700">Chess Online</h1>
            <div class="flex gap-2">
                <BaseButton @click="goToAuthPage('auth-index-login')" >Login</BaseButton>
                <BaseButton @click="goToAuthPage('auth-index-signup')" flat color='secondary'>Signup</BaseButton>
            </div>
        </div>
        <nuxt-page/>
    </div>
</template>
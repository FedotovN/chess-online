<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    function goToStartPage() {
        useRouter().push({ name: 'another' });
    }
</script>
<template>
    <div class="flex justify-center items-center flex-col gap-3 p-3 bg-gray-100 w-full h-screen">
        <div class="w-[450px] text-center flex flex-col gap-5">
            <h1 class="text-2xl  text-gray-700">Chess Online</h1>
            <BaseButton outlined fill @click="goToStartPage">Start</BaseButton>
            <div class="flex gap-2">
                <nuxt-link to="https://github.com/FedotovN">Github</nuxt-link>
                <nuxt-link to="https://t.me/nikitofedotov">Telegram</nuxt-link> 
            </div>
        </div>
    </div>
</template>

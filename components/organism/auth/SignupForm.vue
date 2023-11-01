<script setup lang="ts">
    import { BaseButton, BaseInput } from 'kneekeetah-vue-ui-kit';
</script>
<template>
    <div class="flex flex-col px-2 py-1 bg-white shadow h-full w-full min-w-[350px]">
        <div class="flex justify-center py-2">
            <p class="text-gray-700">Sign Up</p>
        </div>
        <div class="flex flex-col gap-6 mb-8 mt-6">
            <BaseInput placeholder="Email" />
            <BaseInput placeholder="Nickname" />
            <BaseInput placeholder="Password" />
            <BaseInput placeholder="Repeat password" />
        </div>
        <div class="flex flex-col gap-2 w-full mb-4">
            <BaseButton width="100%">Sign Up</BaseButton>
            <small class="">Already have an account? <NuxtLink to="/auth/login/">Login</NuxtLink></small>
        </div>
    </div>
</template>
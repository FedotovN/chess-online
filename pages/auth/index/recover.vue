<template>
    <div class="auth-card w-[350px]">
        <div class="flex flex-col gap-2 py-5">
            <div class="flex flex-col gap-5 ">
                <BaseInput placeholder="Enter your email"></BaseInput>
            </div>
            <BaseButton>Login</BaseButton>
            <div class="flex gap-2">
                <nuxt-link to="/auth/login">Login</nuxt-link>   
                <nuxt-link to="/auth/signup">Signup</nuxt-link>   
            </div>
        </div>
    </div>
</template>
<script setup>
import { BaseInput, BaseButton } from 'kneekeetah-vue-ui-kit';
    definePageMeta({
        title: "Password Recover",
    })
</script>
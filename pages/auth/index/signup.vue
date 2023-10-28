<template>
    <div class="auth-card w-[350px]">
        <div class="flex flex-col gap-5 py-5">
            <div class="flex flex-col gap-5 ">
                <BaseInput placeholder="Email"></BaseInput>
                <BaseInput placeholder="Nickname"></BaseInput>
                <BaseInput placeholder="Password"></BaseInput>
                <BaseInput placeholder="Repeat password"></BaseInput>
            </div>
            <BaseButton>Login</BaseButton>
            <nuxt-link to="/auth/Login">Login</nuxt-link>   
        </div>
    </div>
</template>
<script setup>
    import { BaseButton, BaseInput } from 'kneekeetah-vue-ui-kit';
    definePageMeta({
        title: "Signup",
    })
</script>
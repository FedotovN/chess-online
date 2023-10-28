<template>
    <div class="auth-card w-[350px]">
        <div class="flex flex-col gap-5 py-5">
            <div class="flex flex-col gap-5 ">
                <BaseInput placeholder="Your email"></BaseInput>
                <div class="flex flex-col items-end gap-1">
                    <BaseInput placeholder="Your password"></BaseInput>
                    <nuxt-link to="/auth/recover">Forgot your password?</nuxt-link>   
                </div>
            </div>
            <BaseButton>Login</BaseButton>
            <nuxt-link to="/auth/signup">Signup</nuxt-link>   
        </div>
    </div>
</template>
<script setup lang="ts">
    import { BaseInput, BaseButton } from 'kneekeetah-vue-ui-kit';
    definePageMeta({
        title: "Login",
    })
</script>
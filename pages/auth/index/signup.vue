<template>
    <div class="auth-card w-[350px]">
        <div class="flex flex-col gap-5 py-5">
            <div class="flex flex-col gap-5 ">
                <BaseInput v-model="form.email" placeholder="Email"></BaseInput>
                <BaseInput v-model="form.nickname" placeholder="Nickname"></BaseInput>
                <BaseInput v-model="form.password" placeholder="Password"></BaseInput>
                <BaseInput v-model="form.repeatedPassword" placeholder="Repeat password"></BaseInput>
            </div>
            <BaseButton @click="submit">Sign Up</BaseButton>
            <nuxt-link to="/auth/Login">Login</nuxt-link>
            <base-loader v-if="loading"></base-loader>   
        </div>
    </div>
</template>
<script setup>
    import { BaseButton, BaseInput, BaseLoader, useToast } from 'kneekeetah-vue-ui-kit';
    definePageMeta({
        title: "Signup",
    })
    const validate = () => { 
        return form.value.repeatedPassword === form.value.password;
    };
    const form = ref({ email: '', password: '', repeatedPassword: '', nickname: '' });
    const loading = ref(false);
    const { add } = useToast();
    async function submit() {
        if (!validate()) {
            add({ color: 'alert', content: 'С валидацией вот то-то не так!' });
            return;
        };
        loading.value = true;
        const { email, password, nickname } = form.value;
        try {
            await useAuth().signup(nickname, email, password);
            add({ color: 'success', content: 'Регистрация прошла успешно.', delay: 5000 });
            useRouter().push('/auth/login');
        } catch (e) {
            console.error(e);
            add({ color: 'alert', content: 'Ошибка при попытке регистрации.', delay: 5000 });
        } finally {
            loading.value = false;
        }
    }
</script>
<template>
    <div class="auth-card w-[350px]">
        <div class="flex flex-col gap-5 py-5">
            <div class="flex flex-col gap-5 ">
                <BaseInput placeholder="Your email" v-model="form.email"></BaseInput>
                <div class="flex flex-col items-end gap-1">
                    <BaseInput placeholder="Your password" v-model="form.password"></BaseInput>
                    <nuxt-link to="/auth/recover">Forgot your password?</nuxt-link>   
                </div>
            </div>
            <BaseButton @click="submit">Login</BaseButton>
            <nuxt-link to="/auth/signup">Signup</nuxt-link>   
        </div>
    </div>
</template>
<script setup lang="ts">
    import { BaseButton, BaseInput, useToast } from 'kneekeetah-vue-ui-kit';
    definePageMeta({
        title: "Login",
    })
    const validate = () => { 
        return form.value.email !== 'BEPIS';
    };
    const form = ref({ email: '', password: '' });
    const loading = ref(false);
    const { add } = useToast();
    async function submit() {
        if (!validate()) {
            add({ color: 'alert', content: 'С валидацией вот то-то не так!' });
            return;
        };
        loading.value = true;
        const { email, password } = form.value;
        try {
            await useAuth().login(email, password);
            console.log('success');
            await useRouter().push('/');
            add({ color: 'success', content: 'Добро пожаловать.', delay: 5000 });
        } catch (e) {
            console.error(e);
            add({ color: 'alert', content: 'Ошибка при попытке входа.', delay: 5000 });
        } finally {
            loading.value = false;
        }
    }
</script>
<script setup lang="ts">
    import { useToast } from 'kneekeetah-vue-ui-kit';
    const { login, signInWithGoogle } = useAuth();
    const { push } = useRouter();
    const { add } = useToast()
    const form = ref({
        email: '',
        password: '',
    });
    const loading = ref(false);
    async function signIn(usingGoogle?: boolean) {
        loading.value = true;
        const { email, password } = form.value
        if (usingGoogle) await signInWithGoogle();
        else await login(email, password);
        loading.value = false;
    }
    async function onSubmit(usingGoogle?: boolean) {
        try {
            await signIn(usingGoogle)
            await push('/');
            const { getUser } = useAuth();
            add({ content: `Welcome, ${ getUser?.displayName }`, color: 'success', delay: 5000 });
        } catch (e) {
            console.error(e);
            add({ content: 'Something went wrong.', color: 'alert', delay: 5000 });
        }
    }
</script>
<template>
    <div class="h-full">
        <OrganismAuthLoginForm v-model="form" :loading="loading" @submit="onSubmit" @goggle="onSubmit(true)" />
    </div>
</template>


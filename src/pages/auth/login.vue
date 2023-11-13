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
        const { email, password } = form.value
        if (usingGoogle) await signInWithGoogle();
        else await login(email, password);
    }
    async function onSubmit(usingGoogle?: boolean) {
        loading.value = true;
        try {
            await signIn(usingGoogle)
            await push('/');
            const { user } = useAuth();
            add({ content: `Welcome, ${ user?.displayName || ' ...who are you?' }`, color: 'success', delay: 5000 });
        } catch (e) {
            console.error(e);
            add({ content: 'Something went wrong.', color: 'alert', delay: 5000 });
        }
        loading.value = false;
    }
</script>
<template>
    <div class="h-full">
        <AuthOrganismLoginForm v-model="form" @submit="onSubmit" @goggle="onSubmit(true)" />
    </div>
</template>


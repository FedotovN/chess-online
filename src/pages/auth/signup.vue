<script setup lang="ts">
    import { useToast } from 'kneekeetah-vue-ui-kit';
    const { signup } = useAuth();
    const { add } = useToast();
    const { push } = useRouter();
    const form = ref({
        email: '',
        password: '',
        name: '',
    })
    const loading = ref(false);
    async function onSubmit() {
        const { email, password, name } = form.value;
        try {
            loading.value = true;
            await signup(name, email, password);
            await push({ name: "auth-login" });
            add({ content: 'You signed up', color: 'success', delay: 5000 });
        } catch (e) {
            console.error(e);
            add({ content: 'Something went wrong', color: 'alert', delay: 5000 });
        }
        loading.value = false;
    }
</script>
<template>
    <div class="h-full">
        <AuthOrganismSignupForm v-model="form" @submit="onSubmit" :loading="loading"  />
    </div>
</template>

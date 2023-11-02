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
    async function onSubmit() {
        const { email, password, name } = form.value;
        try {
            await signup(name, email, password);
            await push({ name: "auth-login" });
            add({ content: 'You signed up', color: 'success', delay: 5000 });
        } catch (e) {
            console.error(e);
            add({ content: 'Something went wrong', color: 'alert', delay: 5000 });
        }
    }
</script>
<template>
    <div class="h-full">
        <OrganismAuthSignupForm v-model="form" @submit="onSubmit" />
    </div>
</template>

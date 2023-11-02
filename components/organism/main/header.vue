<script setup lang="ts">
    import { BaseButton, BaseTooltip, useToast } from 'kneekeetah-vue-ui-kit';
    import User from '~/models/auth/User';
    const { logout } = useAuth();
    const { push } = useRouter();
    const { add } = useToast();
    defineProps<{currentUser: User | null}>();
    const onAuthButtonsClick = (type: 'login' | 'signup') => {
        push({ name: `auth-${type}` });
    };
    const signOut = async () => {
        await push({ name: 'auth-login' });
        await nextTick();
        await logout();
        add({ content: "You logged out", delay: 5000 });
    }
</script>
<template>
    <div class="h-10 border-b backdrop-blur bg-[rgba(50, 50, 50, 0.1)]">
        <div class="flex h-full px-2 items-center justify-between">
            <h1 class="text-gray-700 cursor-pointer" @click="push('/')">
                <p>Chess Online</p>
                <BaseTooltip>To home page</BaseTooltip>
            </h1>
            <div class="flex gap-3 items-center" v-if="currentUser">
                <MoleculeAvatar :user="currentUser" />
                <BaseButton color="alert" flat @click="signOut">Sign Out</BaseButton>
            </div>
            <MoleculeAuthButtons @trigger="onAuthButtonsClick" v-else />
        </div>
    </div>
</template>

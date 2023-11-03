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
        await logout();
        add({ content: "You logged out", delay: 5000 });
    }
</script>
<template>
    <ClientOnly>
        <div class="h-12 border-b backdrop-blur-md">
            <div class="flex h-full px-3 items-center justify-between">
                <h1 class="cursor-pointer bg-[rgba(0,0,0,.02)] border border-[rgba(0,0,0,.025)] px-2 py-1" @click="push('/')">
                    <p class="text-gray-700">Chess Online ☕</p>
                    <BaseTooltip>To home page</BaseTooltip>
                </h1>
                <div class="flex gap-3 items-center" v-if="currentUser">
                    <MoleculeAvatar :user="currentUser" />
                    <BaseButton color="alert" flat @click="signOut">Sign Out</BaseButton>
                </div>
                <MoleculeAuthButtons @trigger="onAuthButtonsClick" v-else />
            </div>
        </div>
    </ClientOnly>
</template>

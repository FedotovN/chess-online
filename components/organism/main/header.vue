<script setup lang="ts">
    import User from '~/models/auth/User';
    const router = useRouter();
    defineProps<{currentUser: User | null}>();
    const onAuthButtonsClick = (type: 'login' | 'signup') => {
        router.push({ name: `auth-${type}` });
    };
</script>
<template>
    <div class="h-10 border-b backdrop-blur bg-[rgba(50, 50, 50, 0.1)]">
        <div class="flex h-full px-2 items-center justify-between">
            <h1 class="text-gray-700">Chess Online</h1>
            <MoleculeAvatar v-if="currentUser" :user="currentUser" />
            <MoleculeAuthButtons @trigger="onAuthButtonsClick" />
        </div>
    </div>
</template>

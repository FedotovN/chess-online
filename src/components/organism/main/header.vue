<script setup lang="ts">
    import { BaseTooltip } from 'kneekeetah-vue-ui-kit';
    import User from '~/models/auth/User';
    const { push } = useRouter();
    defineProps<{currentUser: User | null}>();
    const onAuthButtonsClick = (type: 'login' | 'signup') => {
        push({ name: `auth-${type}` });
    };
</script>
<template>
    <div class="h-12 border-b backdrop-blur-md">
        <div class="flex h-full px-3 items-center justify-between">
            <h1 class="cursor-pointer bg-[rgba(0,0,0,.02)] border border-[rgba(0,0,0,.025)] px-2 py-1" @click="push('/')">
                <p class="text-gray-700">Chess Online ☕</p>
                <BaseTooltip>To home page</BaseTooltip>
            </h1>
            <div class="flex gap-3 items-center" v-if="currentUser">
                <MoleculeAuthAvatarControls :current-user="currentUser" />
            </div>
            <MoleculeAuthButtons @trigger="onAuthButtonsClick" v-else />
        </div>
    </div>
</template>

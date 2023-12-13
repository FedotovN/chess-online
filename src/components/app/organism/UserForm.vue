<script setup lang="ts">
    import { useToast, useModal, BaseButton } from 'kneekeetah-vue-ui-kit';
    const { user } = storeToRefs(useAuth());
    const { close } = useModal();
    async function leave() {
        await useRouter().push('/auth/login');
        await nextTick();
        await useAuth().logout();
        useToast().add({ content: 'You left dojo', delay: 5000 });
        close();
    }
</script>
<template>
    <div class="flex flex-col text-gray-300">
        <header class="flex items-center gap-2 h-10">
            <UserAtomPhoto :photo-url="user?.photoURL"></UserAtomPhoto>
            <p>{{ user?.displayName }}</p>
        </header>
        <main class="flex-1 w-full py-1">
            <BaseButton @click="leave" flat color="alert" width="100%">Leave</BaseButton>
        </main>    
    </div>
</template>

<script setup lang="ts">
    import { useToast, BaseButton } from 'kneekeetah-vue-ui-kit';
    const { user } = storeToRefs(useAuth());
    async function leave() {
        await useRouter().push('/auth/login');
        await nextTick();
        useAuth().logout();
        useToast().add({ content: 'You left dojo', delay: 5000 });
    }
</script>
<template>
<header class="w-full flex items-center justify-between text-2xl py-1 px-3 shadow bg-neutral-800 h-14 border-b border-neutral-700">
    <div class="flex items-start gap-3 select-none">
        <h1 class="border-neutral-700 sm:text-xl text-lg">
            <span class="text-green-300">Nuxt</span> <i class="fa-solid fa-chess-knight text-green-300"></i> Chess
        </h1>
    </div>
    <div class="flex-1 gap-2 flex justify-end items-center overflow-hidden">
        <div class="flex items-center gap-2 text-sm whitespace-nowrap text-ellipsis overflow-hidden" v-if="user">
            <BaseButton @click="leave" flat color="alert">Leave dojo</BaseButton>
            <p class="overflow-hidden text-ellipsis">
                <span class="font-bold overflow-hidden text-ellipsis">
                    {{ user.displayName }}
                </span>
            </p>
        </div>
        <div class="text-sm flex text-ellipsis overflow-hidden items-center gap-2" v-else>
            <BaseButton flat color="success">Enter dojo</BaseButton>
        </div>
        <UserAtomPhoto v-if="user" :photo-url="user.photoURL" />
    </div>
</header>    
</template>

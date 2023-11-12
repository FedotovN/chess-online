<script setup lang="ts">
    import { useToast } from 'kneekeetah-vue-ui-kit';
    const loading = ref(true);
    const { add } = useToast();
    useAuth().onAuthResolve(user => {
        if (!user) {
            add({ content: "Let's login first!", color: "secondary", delay: 5000 });
            return navigateTo("/auth/login");
        }
        add({ content: "You've connected the game", color: "primary", delay: 5000 });
        loading.value = false;
    });
</script>
<template>
    <div class="h-screen w-full flex justify-center items-center" v-show="!loading">
        <div class="h-[370px] w-[370px]">
            <OrganismChessBoard />
        </div>
    </div>
</template>

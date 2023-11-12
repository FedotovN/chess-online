<script setup lang="ts">
    const loading = ref(true);
    useAuth().onAuthResolve(user => {
        if (!user) return navigateTo("/")
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

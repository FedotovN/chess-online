<template>
    <div class="flex flex-col gap-5 h-screen w-full bg-gray-700 justify-center items-center">
        <div class="flex flex-col gap-2">
            <div class="w-full flex flex-col items-between justify-center gap-1">
                <h1 class="text-gray-200 text-xl" v-if="title">{{ title }}</h1>
                <nuxt-link to="/" class="text-blue-600">To main page</nuxt-link>
            </div>
            <div class="h-[400px] flex justify-center items-center">
                <slot />
            </div>
        </div>
    </div>
</template>
<script setup> 
    const title = ref(useRoute().meta.title);
    onBeforeRouteUpdate((to) => {
        title.value = to.meta.title;
    })
</script>
<template>
    <div class="flex flex-col gap-5 h-screen w-full bg-gray-100 justify-center items-center">
        <div class="flex flex-col gap-5">
            <div class="w-full flex justify-between items-center">
                <h1 class="text-2xl" v-if="title">{{ title  }}</h1>
                <nuxt-link to="/">Back to main page</nuxt-link>
            </div>
            <slot />
        </div>
    </div>
</template>
<script setup> 
    const title = ref(useRoute().meta.title);
    onBeforeRouteUpdate((to) => {
        title.value = to.meta.title;
    })
</script>
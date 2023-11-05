<script setup lang="ts">
    defineProps<{
        photoUrl?: string | null,
        size?: string,
    }>();
</script>
<template>
    <div class="flex gap-2">
        <div class="h-8 w-8 rounded-full overflow-hidden bg-gray-100 border border-gray-300" :style="{ height: size, width: size }">
            <img :src="photoUrl" v-if="photoUrl" />
        </div>
    </div>
</template>
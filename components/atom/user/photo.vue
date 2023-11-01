<script setup lang="ts">
    const props = defineProps<{
        photoUrl?: string | null
    }>();
</script>
<template>
    <div class="flex gap-2">
        <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
            <img :src="photoUrl" v-if="photoUrl" />
        </div>
    </div>
</template>
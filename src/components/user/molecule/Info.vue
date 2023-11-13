<script setup lang="ts">
    import type User from '~/models/auth/User';
    defineProps<{ user: User }>();
</script>
<template>
    <div class="flex gap-2 items-center overflow-hidden">
        <UserAtomPhoto :photo-url="user.photoURL" />
        <small class="whitespace-nowrap overflow-hidden text-ellipsis text-gray-700">{{ user.displayName }}</small>
    </div>
</template>
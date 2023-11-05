<script setup lang="ts">
import type User from '~/models/auth/User';
    const props = defineProps<{
        user: User
    }>();
</script>
<template>
    <div class="flex gap-2 items-center">
        <AtomUserPhoto :photo-url="user.photoURL" />
        <small class="text-gray-700">{{ user.displayName }}</small>
    </div>
</template>
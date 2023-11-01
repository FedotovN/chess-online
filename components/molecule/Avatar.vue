<script setup lang="ts">
import type User from '~/models/auth/User';
    const props = defineProps<{
        user: User
    }>();
</script>
<template>
    <div class="flex gap-2">
        <AtomUserPhoto :photo-url="user.photoURL" />
        <p>{{ user.displayName }}</p>
    </div>
</template>
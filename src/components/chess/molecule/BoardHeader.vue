<template>
    <div class="flex justify-between items-center py-2 w-full text-gray-300">
        <div class="flex items-center gap-2">
            <UserAtomPhoto :photo-url="getOpponent?.photoURL" />
            <small class="text-sm">{{ getOpponent?.displayName }}</small>
        </div>
        <small class="text-xs">
            <span :class="getCurrentSide === getPlayerSide ? 'text-green-300' : 'text-red-300'">{{ uppercasedCurrentSide }}</span>
            to move
        </small>
    </div>
</template>

<script setup lang="ts">
    const { getCurrentSide, getOpponent, getPlayerSide } = storeToRefs(useGame());
    const uppercasedCurrentSide = computed(() => getCurrentSide.value ? getCurrentSide.value[0].toUpperCase() + getCurrentSide.value.slice(1) : '' );
</script>
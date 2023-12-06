<template>
    <div class="flex justify-between items-center py-2 w-full text-gray-300 h-10">
        <div class="flex items-center gap-2" v-if="getOpponent">
            <UserAtomPhoto :photo-url="getOpponent.photoURL" />
            <small class="text-sm">{{ getOpponent.displayName }}</small>
        </div>
        <div class="flex items-center gap-2" v-else>
            <BaseLoader />
            <small class="text-sm">Waiting for opponent</small>
        </div>
        <small class="text-xs" v-if="getOpponent">
            <span :class="getCurrentSide === getPlayerSide ? 'text-green-300' : 'text-red-300'">{{ uppercasedCurrentSide }}</span>
            to move
        </small>
        <small v-else>Game ID: {{ currGame!.id }}</small>
    </div>
</template>

<script setup lang="ts">
    import { BaseLoader } from "kneekeetah-vue-ui-kit"
    const { getCurrentSide, getOpponent, getPlayerSide, currGame } = storeToRefs(useGame());
    const uppercasedCurrentSide = computed(() => getCurrentSide.value ? getCurrentSide.value[0].toUpperCase() + getCurrentSide.value.slice(1) : '' );
</script>
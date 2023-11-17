<script setup lang="ts">
    import { BaseButton, BaseLoader } from 'kneekeetah-vue-ui-kit';
    import { type Player } from '~/models/chess/room/ChessRoom';
    import { type Color } from '~/types/chess/Color';
    const props = defineProps<{
        opponent: Player | null,
        currentSide: Color | null,
    }>();
    defineEmits<{
        (event: 'quit'):void;
    }>();
    const side = computed(() => {
        if (!props.currentSide) return "";
        const uppercased = props.currentSide.slice(0, 1).toUpperCase() + props.currentSide.slice(1)
        return `${uppercased} to move.`
    });
</script>
<template>
    <div class="px-3 py-1 h-12 border-b flex items-center justify-between bg-gray-100">
            <div class="flex items-center gap-3" v-if="opponent">
                <small>Game against</small>
                <div class="flex gap-2 items-center">
                    <UserAtomPhoto :photo-url="opponent.photoURL" />
                    <p class="text-sm text-gray-700">{{ opponent.displayName }}</p>
                </div>
                <small class="text-gray-700 font-bold">as {{ opponent.side === 'black' ? 'white' : 'black' }}</small>
            </div>
            <div class="flex items-center gap-2" v-else>
                <BaseButton color="success" rounded>Send invite</BaseButton>
                <small>Waiting for opponent</small>
                <base-loader></base-loader>
            </div>
            <div class="flex items-center gap-3">
                <small class="text-gray-700 font-semibold">{{ side }}</small>
                <BaseButton width="100px" color="alert" @click="$emit('quit')">Leave</BaseButton>
            </div>
        </div>
</template>

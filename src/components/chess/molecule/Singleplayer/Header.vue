<template>
    <div class="flex h-10 items-center justify-between px-3">
        <div class="flex gap-2 items-center">
            <p class="text-green-300 sm:text-lg text-sm">Singleplayer mode</p>
            <small class="m:text-sm text-xs">Move to <span class="text-purple-300">{{ side }}</span></small>
        </div>
        <BaseButton :disabled="disabled" outlined @click="emit('undo')">Undo move</BaseButton>
    </div>
</template>

<script setup lang="ts">
    import { BaseButton } from 'kneekeetah-vue-ui-kit';
    import type { Color } from '~/types/chess/Color';
    const emit = defineEmits<{
        (e: 'undo'): void;
    }>();
    defineProps<{
        side: Color,
        disabled: boolean,
    }>();
</script>
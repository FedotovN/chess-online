<template>
    <div class="flex gap-2 items-center justify-center px-2">    
        <img
            :src="getSvgKey(name)"
            class="h-full py-2 px-1 flex-1 cursor-pointer hover:opacity-90 transition-all"
            @click="getPromotedFigureInstance(name)"
            v-for="name in canPromoteToName" 
        />
    </div>
</template>

<script setup lang="ts">
    import figures from '~/models/chess/figures';
    import type Figure from '~/models/chess/figures/Figure';
    import type Pawn from '~/models/chess/figures/Pawn';
    import type { Color } from '~/types/chess/Color';
    import type { FigureName } from '~/types/chess/FigureName';
    const emit = defineEmits<{
        (e: 'promote', value: Figure): void,
    }>();
    const props = defineProps<{
        side: Color,
        pawn: Pawn,
    }>();
    const canPromoteToName = ['queen', 'bishop', 'rook', 'knight'] as const
    const getSvgKey = (name: FigureName) => getSvgSrcFromFigure(props.side, name);
    function getPromotedFigureInstance(name: typeof canPromoteToName[number]) {
        emit('promote', new figures[name](props.pawn.position, props.side));
    }
</script>
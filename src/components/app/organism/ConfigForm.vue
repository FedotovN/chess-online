<script setup lang="ts">
    import { hexToRGB } from "~/utils"
    import { BaseButton, RangeInput, useColor } from 'kneekeetah-vue-ui-kit';
    const { setColor } = useColor();
    function onColorInput(event: Event) {
        const { value } = event.target as HTMLInputElement;
        const color = hexToRGB(value);
        setColor(color, 'primary');
    }
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex w-full justify-between flex-col gap-5">
            <div class="flex gap-2 items-center">
                <p class="text-gray-700 whitespace-nowrap">Color theme</p>
                <input type="color" class="w-full rounded-full overflow-hidden" @input="onColorInput">
            </div>
            <div class="flex gap-2">
                <p class="text-gray-700 whitespace-nowrap">Bla bla bla</p>
                <RangeInput :step="1" :limit="10" />
            </div>
            <BaseButton raised>Do something? I dont know?</BaseButton>
        </div>
    </div>
</template>

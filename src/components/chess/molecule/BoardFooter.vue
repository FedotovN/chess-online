<template>
    <div class="flex justify-between items-center w-full text-gray-300 h-12">
        <BaseButton @click="onLeave" color="alert" flat>Leave</BaseButton>
    </div>
</template>

<script setup lang="ts">
    import { BaseButton, useToast } from "kneekeetah-vue-ui-kit";
    const { leave } = useGame();
    async function onLeave() {
        await useRouter().push("/");
        useToast().add({ content: "You've leaved the game" });
        await leave();
    }
    defineExpose({ onLeave });
</script>
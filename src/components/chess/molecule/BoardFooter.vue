<template>
    <div class="flex justify-between items-center w-full text-gray-300 h-12">
        <BaseButton @click="onLeave" color="alert" flat>Leave</BaseButton>
        <div class="px-4 rounded shadow bg-gray-300 overflow-hidden">
            <p class="text-gray-700">
                4:30
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { BaseButton, useToast } from "kneekeetah-vue-ui-kit";
    const { leave } = useGame();
    async function onLeave() {
        await leave();
        useRouter().push("/");
        useToast().add({ content: "You've leaved the game" });
    }
</script>
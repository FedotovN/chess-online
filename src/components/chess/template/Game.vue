<script setup lang="ts">
    const { currGame } = storeToRefs(useGame());
    const { user } = storeToRefs(useAuth());
</script>
<template>
    <div class="flex flex-col w-full h-full" v-if="currGame && user">
        <ChessMoleculeBoardHeader />
        <div class="overflow-hidden flex-1 flex justify-center items-center gap-2">
            <div class="lg:block hidden w-full h-full justify-center items-center shadow rounded overflow-hidden border border-neutral-700">
                <ChatOrganismChat :chat-id="currGame.id" :uid="user.uid" />    
            </div>
            <ChessTemplateBoard />
            
        </div>
        <ChessMoleculeBoardFooter ref="footer" />
    </div>
</template>
<script setup lang="ts">
    import { useToast } from 'kneekeetah-vue-ui-kit';
    import GameService from '~/services/chess/GameService';
    const { user } = storeToRefs(useAuth());
    const { add } = useToast();
    const { id } = useRoute().params;
    if (!user.value) {
        add({ content: "Login first" });
        navigateTo("/")
    }
    const room = await GameService.getChessRoom(id as string);        
    if (!room) {
        add({ content: "No room was found" });
        navigateTo("/");
    }
    const listener = await GameService.addUserToChessRoom(room!.id, user.value!);
    listener(() => {
        add({ content: "Room event!", delay: 4000 });
    })
</script>
<template>
    <div class="flex h-screen w-full justify-center items-center">
        <div class="h-[370px] w-[370px]">
            <OrganismChessBoard />
        </div>
    </div>
</template>

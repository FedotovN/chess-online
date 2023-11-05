<script lang="ts" setup>
    import { BaseInput, BaseButton,  } from 'kneekeetah-vue-ui-kit';
    const { user } = storeToRefs(useAuth());
</script>
<template>
    <div class="flex flex-col p-2">
        <div class="flex flex-col gap-3" v-if="user">
            <div class="flex justify-center gap-4">
                <AtomUserPhoto :photo-url="user.photoURL" size="60px" />
            </div>
            <div class="flex justify-center">
                <small class="text-xs text-gray-400">{{ user.uid }}</small>
            </div>
            <div class="flex flex-col w-full gap-6 pt-4">
                <BaseInput placeholder="Nickname" :value="user.displayName || undefined"  />
                <BaseInput placeholder="About" value="Bluh bluh bluh"  />
            </div>
            <div class="flex gap-2 items-center pt-2">
                <BaseButton raised width="100%">Save</BaseButton>
            </div>
        </div>
    </div>
</template>
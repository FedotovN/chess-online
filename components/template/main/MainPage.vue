<script setup lang="ts">
    import { BaseTabs, BaseTab } from 'kneekeetah-vue-ui-kit';
</script>
<template>
    <div class="flex h-screen w-full px-3 pt-3">
        <div class="flex-1">
            <BaseTabs v-slot="{ toggle }" width="750px" height="100%" default-first no-wrapper>
                <BaseTab :id="0" @toggle="toggle" title="Leaderboard">
                    <OrganismMainLeaderboard />
                </BaseTab>
            </BaseTabs>
        </div>
        <div class="flex-1 flex flex-col gap-2 h-full mt-9">
            <MoleculeMainLastGameStats />
            <OrganismMainChat />
        </div>
    </div>
</template>

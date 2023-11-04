<script setup lang="ts">
    import { BaseTabs, BaseTab } from 'kneekeetah-vue-ui-kit';
</script>
<template>
    <div class="flex h-flex w-full px-3 pt-3">
        <div class="flex-1">
            <BaseTabs v-slot="{ toggle }" width="750px" height="100%" default-first no-wrapper>
                <BaseTab :id="0" @toggle="toggle" title="Leaderboard">
                    <OrganismMainLeaderboard />
                </BaseTab>
                <BaseTab :id="1" @toggle="toggle" title="Waiting Hall" color="alert">
                    <OrganismMainWaitingList />
                </BaseTab>
                <BaseTab :id="2" @toggle="toggle" title="Your friends" color="alert">
                    <OrganismMainWaitingList />
                </BaseTab>
                <BaseTab :id="3" @toggle="toggle" title="Your games" color="alert">
                    <OrganismMainWaitingList />
                </BaseTab>
            </BaseTabs>
        </div>
        <div class="flex-1 flex flex-col gap-2 h-full mt-9">
            <MoleculeMainLastGameStats />
            <div class="h-[calc(0.2530rem_*_73)] border rounded px-2 py-1">
                <p class="text-gray-700">Chat</p>
            </div>
        </div>
    </div>
</template>

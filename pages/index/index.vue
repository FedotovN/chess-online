<script setup lang="ts">
    import { BaseTabs, BaseTab } from 'kneekeetah-vue-ui-kit';
</script>
<template>
    <div class="flex h-screen w-full px-3 pt-3">
        <BaseTabs v-slot="{ toggle }" width="100%" height="100%" default-first no-wrapper>
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
</template>

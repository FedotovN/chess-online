<script setup lang="ts">
    import User from '~/models/auth/User';
    import UserService from "@/services/users/";
    import { BaseTable, BaseTableColumn } from 'kneekeetah-vue-ui-kit';
    const place = -1
    const items: Ref<User[]> = ref([]);
    const loading = ref(true);
    const getUsers = async () => {
        return UserService.getLeaderboard(15);
    };
    items.value = await getUsers() || [];
    loading.value = false;
</script>
<template>
    <div class="flex flex-col gap-3" v-if="!loading">
        <ClientOnly>
            <BaseTable :items="items" items-per-page="10" :show-footer="false" width="100%">
                <BaseTableColumn :id="0" title="Nickname" field="displayName"></BaseTableColumn>
                <BaseTableColumn :id="1" title="Score" field="stats.score"></BaseTableColumn>
                <BaseTableColumn :id="2" title="Played" field="stats.gamesPlayed"></BaseTableColumn>
                <BaseTableColumn :id="3" title="Won" field="stats.won"></BaseTableColumn>
                <BaseTableColumn :id="4" title="Lose" field="stats.defeated"></BaseTableColumn>
                <BaseTableColumn :id="5" title="Draw" field="stats.draw"></BaseTableColumn>
            </BaseTable>
        </ClientOnly>
        <p class="text-gray-700">Your place is <span class="font-semibold">{{ place }}</span></p>
    </div>
</template>

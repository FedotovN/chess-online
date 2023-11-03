<script setup lang="ts">
import players from "../../../players.json";
import { BaseTable, BaseTableColumn } from 'kneekeetah-vue-ui-kit';
const items = ref(players);

</script>
<template>
    <div class="flex flex-col gap-3">
        <BaseTable :items="items" items-per-page="10" :show-footer="false" width="100%">
            <BaseTableColumn :id="0" title="Nickname" field="displayName"></BaseTableColumn>
            <BaseTableColumn :id="1" title="Played" field="stats.gamesPlayed"></BaseTableColumn>
            <BaseTableColumn :id="2" title="Won" field="stats.won"></BaseTableColumn>
            <BaseTableColumn :id="3" title="Draw" field="stats.draw"></BaseTableColumn>
            <BaseTableColumn :id="4" title="Defeat" field="stats.defeated"></BaseTableColumn>
            <BaseTableColumn :id="5" title="Total score" field="stats.score"></BaseTableColumn>
        </BaseTable>
    </div>
</template>

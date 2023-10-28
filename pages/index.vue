<script setup lang="ts">
    import list from "../players.json";
    import { BaseButton, BaseTable, BaseTableColumn, BaseTabs, BaseTab } from 'kneekeetah-vue-ui-kit';
    const players = ref(list);
    definePageMeta({
        layout: 'main',
    })
</script>
<template>
    <div class="flex h-full w-full">
        <div class="flex w-full justify-center items-center">
            <div class="flex flex-col">
                <div class="flex items-center justify-between gap-2">
                    <div class="h-full gap-2">
                        <BaseTabs v-slot="{ toggle }" width="100%" default-first>
                            <BaseTab id="0" @toggle="toggle" title="Leaderboard">
                                <div class="flex gap-2 p-3">
                                    <BaseTable :items="players">
                                        <base-table-column title="ID" field="id"></base-table-column>
                                        <base-table-column title="Name" field="name"></base-table-column>
                                        <base-table-column title="Played" field="stats.played"></base-table-column>
                                        <base-table-column title="Total Score" field="stats.score"></base-table-column>
                                    </BaseTable>
                                </div>
                            </BaseTab>
                            <BaseTab id="1" @toggle="toggle" title="Friends list">
                                Friends list
                            </BaseTab>
                        </BaseTabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

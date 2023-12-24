<script setup lang="ts">
import { BaseLoader } from 'kneekeetah-vue-ui-kit';
const { user } = storeToRefs(useAuth());
</script>
<template>
  <div class="flex flex-col h-d-screen w-full justify-center items-center bg-neutral-900 text-gray-300 relative">
    <AppOrganismHeader class="sticky top-0" />
    <main class="flex-col flex flex-1 w-full px-2 justify-center items-center">
      <div class="max-w-full justify-center items-center flex flex-col gap-6 w-[525px]">
        <AppOrganismPlayButtons ref="buttons" :is-logged-in="!!user" />
        <Suspense v-if="user">
          <template #default>
            <AppOrganismLastGame />
          </template>
          <template #fallback>
            <div class="flex justify-center items-center h-72">
              <BaseLoader label="Getting last game info" size="50px"></BaseLoader>
            </div>
          </template>
        </Suspense>
      </div>
    </main>
  </div>
</template>
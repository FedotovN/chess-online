<script setup lang="ts">
import UserForm from "~/components/app/organism/UserForm.vue"
import { useModal, BaseButton } from 'kneekeetah-vue-ui-kit';
const { user } = storeToRefs(useAuth());
const { add, open } = useModal();
add({ header: 'Settings', id: 'user-modal', component: UserForm });
</script>
<template>
  <header
    class="w-full flex items-center justify-between px-3 shadow bg-neutral-800 bg-opacity-75 backdrop-blur h-14 border-b border-neutral-700 z-20">
    <div class="flex items-start gap-3 select-none">
      <h1 class="border-neutral-700 sm:text-xl text-lg">
        <span class="text-green-300">Nuxt</span> <i class="fa-solid fa-chess-knight text-green-300"></i> Chess
      </h1>
    </div>
    <div class="flex-1 gap-2 flex justify-end items-center overflow-hidden h-full pl-6">
      <div
        class="flex items-center gap-2 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer h-full hover:opacity-75 transition-all"
        v-if="user" @click="open({ id: 'user-modal' })">
        <p class="inline-flex gap-2 items-center overflow-hidden text-ellipsis text-xs sm:text-sm">
          <span class="inline-block text-purple-400 font-bold text-ellipsis">
            {{ user?.stats?.score }} exp.
          </span>
          <span class="font-bold overflow-hidden text-ellipsis">
            {{ user.displayName }}
          </span>
        </p>
        <UserAtomPhoto :photo-url="user.photoURL" />
      </div>
      <div class="text-sm flex text-ellipsis overflow-hidden items-center gap-2" v-else>
        <BaseButton flat @click="useRouter().push('/auth/signup')">Signup</BaseButton>
        <BaseButton flat @click="useRouter().push('/auth/login')">Login</BaseButton>
      </div>
    </div>
  </header>
</template>

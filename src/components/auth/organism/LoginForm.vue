<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from '@vuelidate/validators';
import { BaseButton, BaseInput, BaseLoader } from 'kneekeetah-vue-ui-kit';
import type Form from "@/types/props/auth/LoginFormProps";
const props = defineProps<{
  modelValue: Form,
  loading?: boolean,
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: Form): void,
  (e: 'submit'): void,
  (e: 'goggle'): void,
}>();
const localValue = toRef(props.modelValue);
watch(localValue, () => {
  emit('update:modelValue', localValue.value);
});
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}
const v$ = useVuelidate(rules, localValue.value);
const onSubmit = async () => {
  if (!await v$.value.$validate()) return
  emit('submit');
}
</script>
<template>
  <form @submit.prevent="onSubmit"
    class="flex flex-col px-2 py-1 shadow-md h-full w-full sm:min-w-[380px] max-w-full text-gray-300 md:border-2 border-neutral-700 rounded">
    <div class="flex justify-center py-2">
      <p class="text-gray-300">Chess online ♟️</p>
    </div>
    <div class="pb-5 pt-3 w-full">
      <BaseButton @click.stop="emit('goggle')" type="button" width="100%" color='alert'>Log in using Google</BaseButton>
    </div>
    <div class="w-full relative mt-4 mb-2">
      <span class="w-full border border-neutral-700 absolute top-1/2 -translate-y-1/2"></span>
      <small
        class="absolute w-28 text-gray-300 bg-neutral-800 z-10 top-1/2 -translate-y-1/2 text-center left-1/2 -translate-x-1/2 border-2 border-neutral-700 rounded py-1">Using
        email</small>
    </div>
    <div class="flex flex-col gap-10 my-8">
      <BaseInput :error-message="v$.email.$errors[0]?.$message.toString()" v-model="localValue.email" placeholder="Email"
        autocomplete="email" />
      <BaseInput :error-message="v$.password.$errors[0]?.$message.toString()" v-model="localValue.password"
        placeholder="Password" type="password" />
    </div>
    <div class="flex flex-col gap-2 w-full mb-4">
      <BaseButton width="100%" :disabled="loading">
        <BaseLoader v-if="loading" color="white"></BaseLoader>
        <p v-else>Login</p>
      </BaseButton>
      <div class="flex justify-between items-center">
        <small class="">Don't have an account yet? <NuxtLink to="/auth/signup/">Sign up</NuxtLink></small>
        <small>
          <NuxtLink to="/">Home page</NuxtLink>
        </small>
      </div>

    </div>
  </form>
</template>
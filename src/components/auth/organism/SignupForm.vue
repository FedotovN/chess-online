<script setup lang="ts">
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, sameAs, minLength } from '@vuelidate/validators';
    import { BaseButton, BaseInput, BaseLoader } from 'kneekeetah-vue-ui-kit';
    import { type LocalForm, type Form } from "@/types/props/auth/SignupFormProps";
    const props = defineProps<{ modelValue: Form, loading?: boolean, }>();
    const emit = defineEmits<{ (e: 'update:modelValue', value: Form): void, (e: 'submit'): void, }>();

    const localValue = toRef(props.modelValue || {}) as Ref<Form & LocalForm>;
    watch(localValue, () => {
        const { email, name, password } = localValue.value;
        emit('update:modelValue', { email, name, password });
    });
    const rules = {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        repeatPassword: { required, sameAs: sameAs(computed(() => localValue.value.password)) }
    }
    const v$ = useVuelidate(rules, localValue);
    const onSubmit = async () => {
        if (!await v$.value.$validate()) { 
            console.log(localValue.value.repeatPassword);
            console.log(localValue.value.password);
            return;
        }
            emit('submit');
    }
</script>
<template>
    <form @submit.prevent="onSubmit" class="flex flex-col px-2 py-1 shadow-md border-neutral-700 h-full w-full max-w-full sm:min-w-[380px] text-gray-300 md:border-2 rounded">
        <div class="flex justify-center py-2">
            <p class="text-gray-300">Sign Up</p>
        </div>
        <div class="flex flex-col gap-10 mb-8 mt-6">
            <BaseInput  autocomplete="off" :error-message="v$.email.$errors[0]?.$message.toString()" v-model="localValue.email" placeholder="Email" />
            <BaseInput autocomplete="nickname" :error-message="v$.name.$errors[0]?.$message.toString()" v-model="localValue.name" placeholder="Nickname" />
            <BaseInput type="password" :error-message="v$.password.$errors[0]?.$message.toString()" v-model="localValue.password" placeholder="Password" />
            <BaseInput type="password" :error-message="v$.repeatPassword.$errors[0]?.$message.toString()" v-model="localValue.repeatPassword" placeholder="Repeat password" />
        </div>
        <div class="flex flex-col gap-2 w-full mb-4">
            <BaseButton width="100%" :disabled="loading">
                <BaseLoader v-if="loading" color="white"></BaseLoader>
                <p v-else>Sign Up</p>
            </BaseButton>
            <div class="flex justify-between items-center">
                <small class="">Already have an account? <NuxtLink to="/auth/login/">Login</NuxtLink></small>
                <small><NuxtLink to="/">Home page</NuxtLink></small>
            </div>
        </div>
    </form>
</template>
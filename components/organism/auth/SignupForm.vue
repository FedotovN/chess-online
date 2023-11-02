<script setup lang="ts">
    import { BaseButton, BaseInput } from 'kneekeetah-vue-ui-kit';
    type Form = {
            email: string,
            name: string,
            password: string,
        }
    type LocalForm = Form & { repeatPassword: string };
    const props = defineProps<{
        modelValue: Form
    }>();
    const emit = defineEmits<{ 
        (e: 'update:modelValue', value: Form): void,
        (e: 'submit'): void,
    }>();
    const localValue: Ref<LocalForm> = toRef(props.modelValue || {}) as Ref<Form & LocalForm>;
    watch(localValue, () => {
        const { email, name, password } = localValue.value as Exclude<Form, LocalForm>;
        emit('update:modelValue', { email, name, password });
    });
    const onSubmit = () => emit('submit');
</script>
<template>
    <form @submit.prevent="onSubmit" class="flex flex-col px-2 py-1 bg-white shadow h-full w-full min-w-[380px]">
        <div class="flex justify-center py-2">
            <p class="text-gray-700">Sign Up</p>
        </div>
        <div class="flex flex-col gap-6 mb-8 mt-6">
            <BaseInput v-model="localValue.email" placeholder="Email" />
            <BaseInput v-model="localValue.name" active-color='success' placeholder="Nickname" />
            <BaseInput v-model="localValue.password" active-color="warning" placeholder="Password" />
            <BaseInput active-color='secondary' placeholder="Repeat password" />
        </div>
        <div class="flex flex-col gap-2 w-full mb-4">
            <BaseButton width="100%">Sign Up</BaseButton>
            <div class="flex justify-between items-center">
                <small class="">Already have an account? <NuxtLink to="/auth/login/">Login</NuxtLink></small>
                <small><NuxtLink to="/">Home page</NuxtLink></small>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
    import { BaseButton, BaseTooltip } from 'kneekeetah-vue-ui-kit';
    const emit = defineEmits<{
        (e: "signup" | "login"): void,
        (e: "trigger", value: 'signup' | 'login'): void,
    }>();
    const emitClickEvent = (type: 'login' | 'signup') => {
        emit('trigger', type);
        emit(type);
    }
</script>
<template>
    <div class="flex h-full items-center gap-2">
        <BaseButton width="100px" @click="emitClickEvent('login')">
            <p>Login</p>
            <BaseTooltip>Welcome back!</BaseTooltip>
        </BaseButton>
        <BaseButton width="100px" @click="emitClickEvent('signup')" outlined>
            <p>Sign Up</p>
            <BaseTooltip>Join us!</BaseTooltip>
        </BaseButton>
    </div>
</template>

<script setup lang="ts">
    import { BaseTooltip, BaseButton, useToast } from 'kneekeetah-vue-ui-kit';
    import User from '~/models/auth/User';
    const { push } = useRouter();
    const { logout } = useAuth();
    const { add } = useToast();
    defineProps<{currentUser: User | null | undefined}>();
    async function signOut() {
        await logout();
        await push("/auth/login");
        add({ content: "You logged out", delay: 5000 });
    }
    const onLogin = () => push("/auth/login");
    const onSignup = () => push("/auth/signup");
    function openInfo() {
        console.log('opened info');
    }
</script>
<template>
    <div class="h-12 border-b backdrop-blur-md">
        <div class="flex sm:justify-between justify-center h-full px-3 items-center">
            <h1 class="whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer bg-[rgba(0,0,0,.02)] border border-[rgba(0,0,0,.025)] px-2 py-1" @click="push('/')">
                <p class="text-gray-700">Chess Online ☕</p>
                <BaseTooltip>To home page</BaseTooltip>
            </h1>
            <div class="sm:block hidden h-full">
                <div class="flex h-full gap-3 items-center" v-if="currentUser">
                    <UserMoleculeInfo @click="openInfo" class="h-full cursor-pointer hover:bg-gray-100 px-2" :user="currentUser" />
                    <BaseButton flat color="alert" @click="signOut">Sign out</BaseButton>
                </div>
                <div class="flex h-full gap-3 items-center" v-else>
                    <BaseButton width="100px" @click="onLogin">
                        <div class="flex w-full items-center justify-between">
                            <p>Login</p>
                            <i class="fa-solid fa-right-to-bracket"></i>
                        </div>
                    </BaseButton>
                    <BaseButton width="100px" outlined color="secondary" @click="onSignup">
                        <div class="flex w-full items-center justify-between">
                            <p>Signup</p>
                            <i class="fa-solid fa-user-plus"></i>
                        </div>
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

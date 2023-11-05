<script setup lang="ts">
    import type User from "~/models/auth/User";
    import { BaseButton, BaseDropdown, BaseToggle, useToast, useModal } from "kneekeetah-vue-ui-kit";
    import OrganismUserProfileForm from "@/components/organism/user/ProfileForm.vue";
    defineProps<{ currentUser: User }>();
    const statuses = ref([
        { id: 0, label: 'Want to play', color: 'primary' },
        { id: 1, label: 'Dont want to play', color: 'alert' },
        { id: 2, label: 'Support Joe Biden', color: 'secondary' },
    ]);
    const status = ref(statuses.value[0]);
    const notificationSound = ref(false);
    const { logout } = useAuth();
    const { add, open } = useModal();
    const signOut = async () => {
        await useRouter().push({ name: 'auth-login' });
        await logout();
        useToast().add({ content: "You logged out", delay: 5000 });
    }
    const openUserEdit = () => {
        add({ id: 'user-edit', component: OrganismUserProfileForm, header: 'User edit' });
        open('user-edit');
    }
</script>
<template>
    <div class="flex items-center gap-4">
        <BaseToggle truthy-label="Notification sound on" falsy-label="No notification sound" v-model="notificationSound" /> 
        <BaseDropdown :items="statuses" v-model="status" width="150px" />
        <div class="flex gap-2 items-center">
            <MoleculeAvatar :user="currentUser" @click="openUserEdit" class="cursor-pointer" />
            <BaseButton color="alert" flat @click="signOut">Sign Out</BaseButton>
        </div>
    </div>
</template>

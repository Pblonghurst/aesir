<template>
  <Dialog v-model:open="authStore.profileDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>My Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <!-- update profile Form -->
      <form @submit.prevent="updateProfile" ref="profileForm" class="space-y-4">
        <div class="space-y-2">
          <Label for="avatar">Avatar</Label>
          <Input type="file" :placeholder="profile?.avatar || ''" />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input type="email" :model-value="user?.email || ''" disabled />
        </div>
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <Input type="text" v-model="formData.username" required />
        </div>
        <div class="space-y-2">
          <Label for="first_name">First Name</Label>
          <Input type="text" v-model="formData.first_name" required />
        </div>
        <div class="space-y-2">
          <Label for="last_name">Last Name</Label>
          <Input type="text" v-model="formData.last_name" required />
        </div>
        <DialogFooter>
          <!-- save button -->
          <Button @click="updateProfile" :disabled="isLoading || saveStatus">
            <span v-if="isLoading">Saving...</span>
            <span v-else-if="saveStatus">Saved</span>
            <span v-else>Save Changes</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const profile = computed(() => authStore.profile);
const user = computed(() => authStore.user);
const isLoading = computed(() => authStore.loading);
const saveStatus = computed(() => authStore.saveStatus);

// form data
const formData = reactive({
  username: '',
  first_name: '',
  last_name: '',
});

// update profile
async function updateProfile() {
  await authStore.updateProfile(formData);
}
</script>

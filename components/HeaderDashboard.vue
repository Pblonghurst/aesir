<template>
  <nav class="shadow-md p-2 bg-gray-900 h-[100px] flex items-center">
    <div class="max-w-7xl mx-auto py-4 w-full">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <nav class="flex gap-6">
            <NuxtLink to="/" class="text-white hover:text-gray-400">Home</NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <!-- User Info Section -->
          <div class="flex items-center gap-3">
            <!-- User Details -->
            <div class="text-right flex items-end flex-col gap-1">
              <Skeleton v-if="!profile" class="h-4 w-[100px]" />
              <div v-else class="text-sm font-medium text-white">
                {{ profile?.username }}
              </div>
              <Skeleton v-if="!profile" class="h-4 w-[150px]" />
              <div v-else class="text-xs text-gray-400">
                {{ user?.email }}
              </div>
              <div class="flex items-center space-x-4"></div>
            </div>
            <!-- Avatar with Popup -->
            <div class="relative">
              <Dialog>
                <DropdownMenu>
                  <!-- dropdown menu trigger -->
                  <DropdownMenuTrigger>
                    <Skeleton v-if="!profile" class="h-12 w-12 rounded-full" />
                    <button
                      v-else
                      class="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-green-400 focus:outline-none"
                    >
                      <img
                        v-if="profile?.avatar"
                        :src="profile.avatar"
                        :alt="profile?.email"
                        class="w-full h-full object-cover"
                      />
                      <span v-else class="text-white font-medium text-sm">
                        {{ initial }}
                      </span>
                    </button>
                  </DropdownMenuTrigger>

                  <!-- dropdown menu -->
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel class="flex items-center justify-between px-2 py-1 gap-2">
                      <span class="text-black">Dark Mode</span>
                      <Switch id="theme-toggle" />
                    </DropdownMenuLabel>
                    <DialogTrigger as-child>
                      <DropdownMenuItem class="cursor-pointer"> Edit Profile </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="onSignOut" class="cursor-pointer">
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>My Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  <!-- update profile Form -->
                  <Label for="avatar">Avatar</Label>
                  <Input type="file" :placeholder="profile.avatar" />

                  <Label for="email">Email</Label>
                  <Input type="email" :model-value="user.email" disabled />

                  <Label for="username">Username</Label>
                  <Input type="text" v-model="formData.username" />

                  <Label for="first_name">First Name</Label>
                  <Input type="text" v-model="formData.first_name" />

                  <Label for="last_name">Last Name</Label>
                  <Input type="text" v-model="formData.last_name" />

                  <DialogFooter>
                    <!-- save button -->
                    <Button @click="updateProfile" :disabled="isLoading || saveStatus">
                      <span v-if="isLoading">Saving...</span>
                      <span v-else-if="saveStatus">Saved</span>
                      <span v-else>Save Changes</span>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { user, handleSignOut, profile } = useAuth();
const isLoading = ref(false);
const saveStatus = ref(false);

// form data
const formData = reactive({
  username: '',
  first_name: '',
  last_name: '',
});

// watch profile
watch(
  () => profile.value,
  (newProfile) => {
    if (newProfile) {
      formData.username = newProfile.username;
      formData.first_name = newProfile.first_name;
      formData.last_name = newProfile.last_name;
    }
  },
  { immediate: true }
);

// update profile
async function updateProfile() {
  isLoading.value = true;
  saveStatus.value = false;
  try {
    const response = await $fetch(`/api/auth/profiles/${user.value.id}`, {
      method: 'PUT',
      body: {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
      },
    });
    if (response.success) {
      console.log('Profile was updated', response.profile);
      // Show success feedback
      saveStatus.value = true;
      setTimeout(() => {
        saveStatus.value = false;
      }, 1000);
    } else {
      console.error('Update failed', response);
    }
  } catch (error) {
    console.error('Update error:', error);
  } finally {
    isLoading.value = false;
  }
}

// sign out
const onSignOut = async () => {
  await handleSignOut('/');
};

// get initials from email
const initial = computed(() => {
  return user.value?.email?.charAt(0).toUpperCase() || '';
});
</script>

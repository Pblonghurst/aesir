<template>
  <nav class="shadow-md py-2 bg-gray-900 h-[100px] flex items-center px-8">
    <div class="max-w-7xl mx-auto py-4 w-full">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <nav class="flex gap-6">
            <NuxtLink to="/" class="text-white hover:text-gray-400 max-[500px]:hidden"
              >Home</NuxtLink
            >
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <!-- User Info Section -->
          <div class="flex items-center gap-3">
            <!-- User Details -->
            <div class="text-right flex items-end flex-col gap-1 max-[500px]:hidden">
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
                      class="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-orange-300 focus:outline-none"
                    >
                      <img
                        v-if="profile?.avatar"
                        :src="profile?.avatar"
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
                    <!-- <DropdownMenuLabel class="flex items-center justify-between px-2 py-1 gap-2">
                      <span class="text-black">Dark Mode</span>
                      <Switch id="theme-toggle" />
                    </DropdownMenuLabel> -->
                    <DialogTrigger as-child>
                      <DropdownMenuItem class="cursor-pointer" @click="authStore.openProfileDialog">
                        Edit Profile
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="authStore.handleSignOut('/')" class="cursor-pointer">
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <!-- view profile dialog -->
                <ViewProfile />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();

const user = computed(() => authStore.user);
const profile = computed(() => authStore.profile);

// get initials from email
const initial = computed(() => {
  return user.value?.email?.charAt(0).toUpperCase() || '';
});
</script>

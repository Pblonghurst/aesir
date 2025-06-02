<template>
  <nav class="shadow-sm border-b bg-gray-900">
    <div class="max-w-7xl mx-auto py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <!-- <nav class="flex gap-6">
            <a href="#" class="text-blue-600 font-medium">Overview</a>
            <a href="#" class="text-gray-600  hover:text-gray-900">Analytics</a>
            <a href="/dashboard/settings" class="text-gray-600 hover:text-gray-900">Settings</a>
          </nav> -->
        </div>
        <div class="flex items-center gap-4">
          <!-- User Info Section -->
          <div class="flex items-center gap-3">
            <!-- User Details -->
            <div class="text-right">
              <div class="text-sm font-medium text-white">
                {{ profile?.username || user?.email }}
              </div>
              <div class="text-xs text-gray-400">
                {{ user?.email }}
              </div>
            </div>
            <!-- Avatar with Popup -->
            <div class="relative">
              <button
                @click="togglePopup"
                class="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <img
                  v-if="user?.avatar"
                  :src="user.avatar"
                  :alt="user?.email"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-white font-medium text-sm">
                  {{ initial }}
                </span>
              </button>

              <!-- Settings Popup -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { user, handleSignOut, profile } = useAuth();

const onSignOut = async () => {
  await handleSignOut('/');
};
console.log(profile);
// get initials from email
const initial = computed(() => {
  return user.value?.email?.charAt(0).toUpperCase() || '';
});
</script>

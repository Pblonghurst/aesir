<template lang="">
  <nav class="shadow-sm border-b bg-gray-900">
    <div class="max-w-7xl mx-auto px-6 py-4">
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
          <div class="text-sm text-gray-600">
            {{ user?.email }}
          </div>
          <button
            @click="onSignOut"
            class="bg-primary-500 text-black bg-green-400 px-5 py-3 hover:bg-green-200 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
const { handleSignOut } = useAuth();

const onSignOut = async () => {
  await handleSignOut('/');
};
</script>

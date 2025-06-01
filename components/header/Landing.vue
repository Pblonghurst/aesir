<template lang="">
  <nav class="p-6 bg-gray-900">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">SubChecker</h1>
      <div v-if="user" class="flex items-center gap-4">
        <span class="text-gray-700">Welcome, {{ user.email }}</span>
        <NuxtLink
          to="/dashboard"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Dashboard
        </NuxtLink>
        <button @click="onSignOut" class="text-gray-600 hover:text-gray-800">Sign Out</button>
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

<template lang="">
  <nav class="p-6 bg-gray-900">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">SubChecker</h1>
      <div v-if="user" class="flex items-center gap-4">
        <span class="text-gray-700">Welcome, {{ user.email }}</span>
        <Button @click="onSignOut">Sign Out</Button>
      </div>
    </div>
  </nav>
</template>
<script setup>
const { user, handleSignOut } = useAuth();

const onSignOut = async () => {
  await handleSignOut('/');
};
</script>

<template lang="">
  <nav class="p-6 bg-gray-900 h-[100px] flex items-center">
    <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
      <h1 class="text-2xl font-bold text-white">BoardGameHub</h1>
      <div v-if="user" class="flex items-center gap-4">
        <span class="text-white">Welcome, {{ user.email }}</span>
        <Button @click="authStore.handleSignOut('/')">Sign Out</Button>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>

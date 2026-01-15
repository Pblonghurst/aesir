<template>
  <div class="max-w-7xl mx-auto px-6 py-20">
    <!-- Hero Section -->
    <HeroLanding />

    <!-- Sign in/up form -->
    <Login />

    <!-- Logged in state -->
    <div v-if="user" class="text-center flex flex-col items-center justify-center gap-4">
      <Button class="bg-orange-300 text-black hover:bg-orange-400" @click="navigateTo('/dashboard')"
        >Go to Dashboard</Button
      >
    </div>

    <!-- pricing cards -->
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  layout: 'default',
});

import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
// Use the global auth composable
const user = computed(() => authStore.user);
</script>

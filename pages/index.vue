<template>
  <div class="max-w-7xl mx-auto px-6 py-20 max-[700px]:py-10">
    <!-- Hero Section -->
    <HeroLanding v-if="user" />

    <!-- Sign in/up form -->
    <Login />

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

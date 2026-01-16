<template lang="">
  <nav class="p-6 h-[100px] flex items-center">
    <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
      <h1
        class="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent animate-fade-in"
      >
        <Logo />
        Aesir
      </h1>
      <div v-if="user && !userLoading" class="flex items-center gap-4">
        <span class="text-white max-[500px]:hidden">Welcome, {{ user.email }}</span>
        <Button @click="authStore.handleSignOut('/')">Sign Out</Button>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from '@/store/authStore';
import Logo from '@/components/ui/logos/Logo.vue';
const authStore = useAuthStore();

const user = computed(() => authStore.user);
const userLoading = computed(() => authStore.loading);
</script>

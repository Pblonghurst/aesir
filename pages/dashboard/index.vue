<template>
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto py-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Welcome back, {{ user?.email }}!</h2>
      <p class="text-white">Here's what's happening with your account today.</p>
    </div>

    <!-- Content Sections -->
    <Button>Settings</Button>
  </main>
</template>

<script setup>
const { user } = useAuth();

// Protect this page - redirect to login if not authenticated
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
});
</script>

<template>
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto py-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Welcome back, {{ user?.email }}!</h2>
      <p class="text-white">Here's what's happening with your account today.</p>
    </div>
    <div class="flex items-center space-x-4">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
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

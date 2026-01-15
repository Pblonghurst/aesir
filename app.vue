<script setup>
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';

const pinia = createPinia();
const app = createApp({});

app.use(pinia);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster position="bottom-center" :duration="2000" :richColors="true" />
  </NuxtLayout>
</template>

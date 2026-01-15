<template>
  <div class="min-h-screen animated-gradient">
    <HeaderLanding />
    <slot />
    <Footer />
  </div>
</template>

<script setup></script>

<style scoped>
.animated-gradient {
  background: linear-gradient(-45deg, #111827, #1e293b, #0f172a, #1e293b);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

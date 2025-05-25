<template>
  <div class="py-16 px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Our Pricing Plans</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      <PricingCard
        title="Starter"
        price="$19/mo"
        :features="['1 Project', 'Basic Analytics', 'Email Support']"
        buttonLabel="Get Started"
      />
      <PricingCard
        title="Pro"
        price="$49/mo"
        :features="['10 Projects', 'Advanced Analytics', 'Priority Support']"
        buttonLabel="Choose Pro"
      />
      <PricingCard
        title="Enterprise"
        price="$99/mo"
        :features="['Unlimited Projects', 'Custom Reports', 'Dedicated Support']"
        buttonLabel="Contact Us"
      />
    </div>
  </div>
</template>

<script setup>
    import PricingCard from '../ui/card/Pricing.vue'
</script>

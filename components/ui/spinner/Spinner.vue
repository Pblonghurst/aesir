<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  class?: HTMLAttributes['class'];
  size?: 'sm' | 'default' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'destructive';
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'default',
  variant: 'default',
});

const sizeClasses = {
  sm: 'h-4 w-4',
  default: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const variantClasses = {
  default: 'border-gray-300 dark:border-gray-600',
  primary: 'border-primary',
  secondary: 'border-secondary-foreground',
  destructive: 'border-destructive',
};
</script>

<template>
  <div
    data-slot="spinner"
    :class="
      cn(
        'animate-spin rounded-full border-2 border-transparent',
        sizeClasses[size],
        variantClasses[variant],
        'border-t-current',
        props.class
      )
    "
    role="status"
    aria-label="Loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

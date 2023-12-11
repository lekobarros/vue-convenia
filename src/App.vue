<template>
  <v-app>
    <v-main>
      <!-- Header -->
      <TheHeader />

      <!-- View -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

// Components
import TheHeader from '@/components/Layout/TheHeader.vue'
</script>

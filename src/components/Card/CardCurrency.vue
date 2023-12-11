<script lang="ts">
export default {
  name: 'CardCurrency',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-text>
      <div class="mb-2 text-caption">{{ label }}</div>
      <p class="text-subtitle-1"><slot /></p>
    </v-card-text>
  </v-card>
</template>

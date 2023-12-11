<script lang="ts">
// Store
import { useTipsStore } from '@/store/tips'

// Components
import VCurrencyInput from '@/components/VCurrencyInput.vue'

export default {
  components: {
    VCurrencyInput
  },
  data: () => ({
    fields: {
      currency: {
        usd: 'USD',
        eur: 'EUR'
      },
      tips: {
        min: 10,
        max: 20,
        step: 1
      },
      people: {
        min: 2,
        max: 16,
        step: 1
      }
    }
  }),
  mounted() {
    // Default Values
    const form = { amount: 0, currency: 'EUR', people: 2, tips: 10 }

    // Set in Store
    this.tipsStore.$patch({ form })
  },
  setup: () => ({
    tipsStore: useTipsStore()
  })
}
</script>

<template>
  <v-card>
    <v-form>
      <v-container>
        <!-- Form: Header -->
        <v-row>
          <v-col>
            <h1>Calculadora</h1>
            <p>Uma calculadora de gorjeta para simplificar o cálculo da gratificação adequada para diversos serviços.</p>
          </v-col>
        </v-row>

        <!-- Form: Fields -->
        <v-row>
          <!-- form.cuyrrency -->
          <v-col cols="12">
            <div class="text-caption">Moeda</div>
            <div class="d-flex align-center ga-4">
              <div class="text-caption">{{ fields.currency.eur }}</div>
              <div class="flex-grow-0">
                <v-switch v-model="tipsStore.form.currency" :true-value="fields.currency.usd" :false-value="fields.currency.eur" hide-details />
              </div>
              <div class="text-caption">{{ fields.currency.usd }}</div>
            </div>
          </v-col>
          <!-- form.amount -->
          <v-col cols="12">
            <v-currency-input label="Valor" v-model="tipsStore.form.amount" :options="{ currency: tipsStore.form.currency }" />
          </v-col>
          <!-- form.tips -->
          <v-col cols="12">
            <div class="text-caption">Gorjeta: {{ `${tipsStore.form.tips}%` }}</div>
            <v-slider v-model="tipsStore.form.tips" :max="fields.tips.max" :min="fields.tips.min" :step="fields.tips.step" thumb-label hide-details>
              <!-- Slot: Prepent -->
              <template v-slot:prepend>
                <span>{{ fields.tips.min }}</span>
              </template>
              <!-- Slot: Append -->
              <template v-slot:append>
                {{ fields.tips.max }}
              </template>
            </v-slider>
          </v-col>
          <!-- form.people -->
          <v-col cols="12">
            <div class="text-caption">Pessoas: {{ `${tipsStore.form.people}` }}</div>
            <v-slider v-model="tipsStore.form.people" :max="fields.people.max" :min="fields.people.min" :step="fields.people.step" thumb-label hide-details>
              <!-- Slot: Prepent -->
              <template v-slot:prepend>
                {{ fields.people.min }}
              </template>
              <!-- Slot: Append -->
              <template v-slot:append>
                {{ fields.people.max }}
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

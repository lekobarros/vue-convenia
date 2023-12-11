// Utilities
import { defineStore } from 'pinia'

export const useTipsStore = defineStore('tips', {
  state: () => ({
    form: {
      currency: 'EUR',
      tips: 0,
      people: 0,
      amount: 0
    },
  }),
})

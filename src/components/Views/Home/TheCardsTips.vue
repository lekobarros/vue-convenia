<script lang="ts">
// Store
import { mapState } from 'pinia'
import { useTipsStore } from '@/store/tips'

// API Control
import $_api from '@/api'
import { abortController } from '@/api/rates'

// Components
import CardCurrency from '@/components/Card/CardCurrency.vue'

export default {
  components: {
    CardCurrency
  },
  data: () => ({
    exchangeRates: 0,
    loading: false
  }),
  computed: {
    ...mapState(useTipsStore, ['form']),
    // Format Amount
    formattedAmount: function () {
      const { amount, currency } = this.form
      return this.currencyFormat(amount, currency)
    },
    // Format Tips
    formattedTips: function () {
      const { amount, currency, tips } = this.form
      const calc = amount * (tips / 100)
      return this.currencyFormat(calc, currency)
    },
    // Format Total
    formattedTotal: function () {
      const { amount, tips, currency } = this.form
      const calc = amount + amount * (tips / 100)
      return this.currencyFormat(calc, currency)
    },
    // Format PerPerson
    formattedPerPerson: function () {
      const { amount, currency, people, tips } = this.form
      const calc = (amount + amount * (tips / 100)) / people
      return this.currencyFormat(calc, currency)
    },
    // Format ExchangeRates
    formatExchangeRates: function () {
      const { amount, tips } = this.form
      const { exchangeRates } = this

      // 
      const calcTips = amount * (tips / 100)
      const calcExchangeRates = calcTips * exchangeRates
      return this.currencyFormat(calcExchangeRates, 'BRL')
    }
  },
  watch: {
    'form.amount': function () {
      if (this.loading) abortController.abort()
      this.fetchRates()
    },
    'form.currency': function () {
      if (this.loading) abortController.abort()
      this.fetchRates()
    }
  },
  methods: {
    currencyFormat: function (value: number, currency: string) {
      const USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
      const EUEuro = new Intl.NumberFormat('sfb', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })
      const BRReal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

      switch (currency) {
        case 'USD':
          return USDollar.format(value)
        case 'EUR':
          return EUEuro.format(value)
        case 'BRL':
          return BRReal.format(value)
        default:
          return value
      }
    },
    // Fetch Rates
    fetchRates: async function () {
      const { currency } = this.form

      try {
        this.loading = true
        let data = null

        if (currency == 'EUR') ({ data } = await $_api.rates.getRatesEurToBrl())
        else if (currency == 'USD') ({ data } = await $_api.rates.getRatesUsdToBrl())
        else alert('Moeda não suportada')

        this.exchangeRates = data.quote
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
  setup: () => ({
    tipsStore: useTipsStore()
  })
}
</script>

<template>
  <v-container class="pa-0">
    <v-row>
      <!-- card.amount -->
      <v-col cols="12">
        <card-currency label="Conta"> {{ formattedAmount }}</card-currency>
      </v-col>
      <!-- card.tips -->
      <v-col cols="12">
        <card-currency label="Gorjeta">{{ formattedTips }}</card-currency>
      </v-col>
      <!-- card.total -->
      <v-col cols="12">
        <card-currency label="Total"> {{ formattedTotal }} </card-currency>
      </v-col>
      <!-- card.perPerson -->
      <v-col cols="12">
        <card-currency label="Por Pessoa"> {{ formattedPerPerson }}</card-currency>
      </v-col>
      <!-- card.perBrl -->
      <v-col cols="12">
        <card-currency label="Em R$"> {{ formatExchangeRates }}</card-currency>
      </v-col>
    </v-row>
  </v-container>
</template>

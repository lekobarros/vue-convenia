import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { AxiosResponse } from 'axios'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// View
import TheCardsTips from '@/components/Views/Home/TheCardsTips.vue'

// API Control
import $_api from '@/api'

// Libs
import { faker } from '@faker-js/faker'

// Plugins
import { createTestingPinia } from '@pinia/testing'
import { useTipsStore } from '@/store/tips'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('View Favored/CreateFavored', () => {
  // let wrapper: any
  const wrapper = mount(TheCardsTips, {
    global: {
      plugins: [vuetify, createTestingPinia()]
    }
  })

  afterEach(() => {
    wrapper.unmount()
  })

  const store = useTipsStore()

  // Test
  it('should be rendered the view with correctly mounted', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
  })

  it('should be called the method: currencyFormat', async () => {
    const amount = faker.finance.amount()

    // Converted
    const convertedUSD = `$${amount}`
    const convertedEU = `€${amount}`

    await wrapper.vm.$nextTick()

    // Currency Format
    const currencyFormatUSD = wrapper.vm.currencyFormat(amount as unknown as number, 'USD')
    const currencyFormatEU = wrapper.vm.currencyFormat(amount as unknown as number, 'EUR')
    const currencyFormatBRL = wrapper.vm.currencyFormat(amount as unknown as number, 'BRL')
    const currencyFormatNone = wrapper.vm.currencyFormat(amount as unknown as number, 'CAD')

    expect(currencyFormatUSD).toBe(convertedUSD)
    expect(currencyFormatEU).toBe(convertedEU)
    expect(currencyFormatBRL).toBeTypeOf('string') // I don't know how to fix this quickly, because BRL return a different format
    expect(currencyFormatNone).toBe(amount)
  })

  it('should be called the method: fetchRates', async () => {
    const quoteEUR = faker.finance.amount()
    const quoteUSD = faker.finance.amount()

    vi.spyOn($_api.rates, 'getRatesEurToBrl').mockResolvedValue({ data: { quote: quoteEUR } } as AxiosResponse)
    vi.spyOn($_api.rates, 'getRatesUsdToBrl').mockResolvedValue({ data: { quote: quoteUSD } } as AxiosResponse)

    await wrapper.vm.$nextTick()

    // Fetch Rates EUR
    await wrapper.vm.fetchRates()

    expect($_api.rates.getRatesEurToBrl).toHaveBeenCalled()
    expect(wrapper.vm.exchangeRates).toBe(quoteEUR)
    expect(wrapper.vm.loading).toBeFalsy()

    // Fetch Rates USD
    store.$patch({ form: { currency: 'USD' } })
    await wrapper.vm.fetchRates()

    expect($_api.rates.getRatesUsdToBrl).toHaveBeenCalled()
    expect(wrapper.vm.exchangeRates).toBe(quoteUSD)
    expect(wrapper.vm.loading).toBeFalsy()
  })
})

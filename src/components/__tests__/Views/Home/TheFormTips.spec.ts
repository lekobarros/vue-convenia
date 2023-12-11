import { describe, it, expect, vi, beforeEach, afterEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// View
import TheFormTips from '@/components/Views/Home/TheFormTips.vue'

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
  const wrapper = mount(TheFormTips, {
    global: {
      plugins: [vuetify, createTestingPinia()]
    }
  })

  afterEach(() => {
    wrapper.unmount()
  })

  const store = useTipsStore()

  // Test
  it('should be rendered the view with correctly mounted state', async () => {
    const defaultStoreValues = { amount: 0, currency: 'EUR', people: 2, tips: 10 }

    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(store.$patch).toHaveBeenCalledTimes(1)
    expect(store.form).toEqual(defaultStoreValues)
  })
})

<script lang="ts">
// Components
import TheFormTips from '@/components/Views/Home/TheFormTips.vue'
import TheCardsTips from '@/components/Views/Home/TheCardsTips.vue'

export default {
  components: {
    TheFormTips,
    TheCardsTips
  },
  data: () => ({
    isPanelActive: false
  })
}
</script>

<template>
  <v-container class="relative pt-4 pt-md-12 overflow-x-hidden">
    <!-- Painels -->
    <v-row id="painel-container" :class="['flex-nowrap flex-md-wrap', isPanelActive ? 'panel-active' : null]">
      <v-col cols="12" md="8">
        <the-form-tips />
      </v-col>
      <v-col cols="12" md="4">
        <the-cards-tips />
      </v-col>
    </v-row>

    <div class="d-block d-md-none btn-toggle">
      <v-btn :icon="isPanelActive ? 'mdi-arrow-left' : 'mdi-arrow-right'" size="large" @click="isPanelActive = !isPanelActive" />
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
#painel-container {
  position: relative;
  transition: transform 0.3s ease;

  @media screen and (max-width: $breakpoint-screen-lg) {
    &.panel-active {
      transform: translateX(-100%);
    }
  }
}

.relative {
  position: relative;
}

.btn-toggle {
  position: absolute;
  right: 16px;
  bottom: 16px;
}
</style>

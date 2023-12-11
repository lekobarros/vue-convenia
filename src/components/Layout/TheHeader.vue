<template>
  <header class="c-header">
    <div class="c-container d-flex">
      <div class="d-flex">
        <img src="@/assets/convenia.svg" width="110" height="28" alt="Convenia Le/Tip" />
      </div>

      <div class="c-header-title">
        <div class="font-weight-medium">LE/Tip</div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.c-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 4rem;
  color: $color-rhino-800;
  font-family: 'Roboto Slab', serif;
  background-color: $color-white;
  box-shadow: 0 2px 18px rgba($color-rhino-800, 0.05);
}

.c-header-title {
  position: relative;
  padding-left: 1rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: rgba($color-rhino-800, 0.05);
  }
}
</style>

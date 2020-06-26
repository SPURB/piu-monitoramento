<template>
  <div class="arquivos-display-counter">
    <span class="arquivo-display-counter__number" :class="estado">{{ itens }}</span>
    <svg
      class="arquivo-display-counter__icon"
      :class="estado"
      width="27"
      height="22"
      viewBox="0 0 27 22"
      fill="none"
    >
      <path
        d="M1.0135 2.75082V2.75C1.0135 1.76581 1.79096 1 2.7 1H10.3804L12.7864 3.45059L13.0804 3.75H13.5H24.3C25.2155 3.75 26 4.52241 26 5.5V19.25C26 20.2276 25.2155 21 24.3 21H2.7C1.78461 21 1.00018 20.2278 1 19.2503C1 19.2502 1 19.2501 1 19.25L1.0135 2.75082Z"
        stroke="black"
        stroke-width="1"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "ArquivoDisplayCounter",
  props: {
    itens: {
      type: Number,
      default: 0
    },
    estado: {
      type: String,
      validator: val => ['posterior', 'atual', 'anterior', ''].includes(val)
    },
    computed: {
      opacity () {
        return this.estado === 'atual' ? '1' : '0.4'
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.arquivo-display-counter {
  &__number {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    font-size: 10px;
    color: black
  }
  &__icon,
  &__number {
    opacity: 0.4;
    &.atual {
      opacity: 1;
    }
  }
  &__number {
    &.posterior {
      opacity: 0;
    }
  }
}
</style>
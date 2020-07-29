<template>
  <div
    class="preloader"
    :style="`height:calc(${width} + 42px); margin-bottom: 24px`"
  >
    <svg
      class="preloader__svg"
      width="100%"
      viewBox="0 0 500 500"
      :style="`height:${width}`"
    >
      <path
        class="preloader__path"
        fill="none"
        :stroke="color"
        stroke-width="8.329"
        stroke-miterlimit="10"
        d="M174.071 81.447l-23.316-23.32H84.963l8.75 52.469h21.235l14.574 54.96-41.641 30.814 8.743 9.997 26.234-14.987 10.829 10.826-29.567 23.73v61.632l16.032 16.027-15.412 15.411v18.109l13.641 13.642v48.821H99.537v34.98l31.857 31.853h58.921l29.148-16.859V325.458l-19.152-31.645 12.909-12.909V248.42l32.059-17.066v-33.315l70.793 31.646h52.049v-79.532l17.698-17.694-13.115-20.617h-84.117l-28.732 21.237-7.91-25.4 20.404-66.21-10.41-6.246-42.476 46.012z"
      />
    </svg>
    <p class="preloader__message" :style="`color:${color}`">
      {{ message }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'Preloader',
  props: {
    width: {
      type: String,
      default: '200px'
    },
    color: {
      type: String,
      default: '#000'
    },
    message: {
      type: String,
      default: 'Aguarde. Carregando...'
    }
  }
}
</script>
<style lang="scss" scoped>
.preloader {
  position: relative;
  height: 0;
  padding: 0;
  &__svg {
    position: absolute;
    height: calc(100% - 24px);
    width: 100%;
    left: 0;
    top: 0;
  }
  &__path {
    stroke-dasharray: 1640;
    animation: draw-sao-paulo-externo 3.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
  &__message {
    width: 100%;
    position: absolute;
    bottom: -18px;
    text-align: center;
    height: 24px;
    animation: pulse-opacity 1.75s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    opacity: 0.5;
  }
}
@keyframes draw-sao-paulo-externo {
  from {
    stroke-dashoffset: -1640;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse-opacity {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>

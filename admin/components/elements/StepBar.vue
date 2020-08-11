<template>
  <ul class="step-progressbar">
    <li
      v-for="(item, index) in steps"
      :key="index"
      class="step-progressbar__item"
      :class="setClass(index)"
    >
      {{ item.nome }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'StepBar',
  props: {
    steps: {
      type: Array,
      required: true
    },
    step: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    setClass (index) {
      if (this.step > this.steps.length) {
        return 'step-progressbar__item--complete'
      }

      if (this.step === index) {
        return 'step-progressbar__item--active'
      } else if (index < this.step) {
        return 'step-progressbar__item--complete'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.step-progressbar {
  list-style: none;
  counter-reset: step;
  display: flex;
  padding: 0;
  margin-bottom: 1em;

  &__item {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;
    position: relative;

    &:before {
      width: 3em;
      height: 3em;
      content: counter(step);
      counter-increment: step;
      align-self: center;
      background: #999;
      color: #fff;
      border-radius: 100%;
      line-height: 3em;
      margin-bottom: 0.5em;
    }

    &:after {
      height: 2px;
      width: calc(100% - 4em);
      content: '';
      background: #999;
      position: absolute;
      top: 1.5em;
      left: calc(50% + 2em);
    }

    &:last-child {
      &:after {
        content: none;
      }
    }

    &--active {
      &:before {
        background: #ccc;
      }
    }

    &--complete {
      &:before {
        content: '✔';
        background: #008375;
      }
    }
  }
}
</style>

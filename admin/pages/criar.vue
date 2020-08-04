<template>
  <div class="flex flex-col lg:p-10 xg:p-10">
    <preloader v-if="fetching" />

    <div class="flex flex-col lg:flex-row xg:flex-row items-center justify-between py-3 pb-2 pl-2 text-gray-700">
      <h1 class="text-3xl">
        Monitoramento
      </h1>
      <div
        class="text-base font-bold flex items-center hover:text-gray-600"
      >
        Criar projeto
      </div>
    </div>
    <hr class="mb-5">
    <Projeto v-if="isReady" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Criar',
  computed: {
    ...mapState('home', {
      fetching: state => state.fetching,
      error: state => state.error
    }),
    isReady () {
      return !this.error && !this.fetching
    }
  },
  created () {
    this.setupOn()
  },
  methods: {
    ...mapActions('crud-projeto', ['getOrigens', 'getProponentes']),
    ...mapActions('home', ['getTramitacao']),
    setupOn () {
      this.getTramitacao()
      this.getOrigens()
      this.getProponentes()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

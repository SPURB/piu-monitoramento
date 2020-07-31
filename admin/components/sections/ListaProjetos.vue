<template>
  <div class="w-full">
    <div
      v-for="tramitacao in tramitacoes"
      :key="`tramitacao-${tramitacao.id}`"
      class="w-full"
    >
      <div class="w-full flex flex-col lg:flex-row xg:flex-row">
        <div class="w-full lg:w-2/5 xg:w-2/5 bg-white p-3">
          <h3 class="text-2xl text-gray-700">
            {{ tramitacao.nome }}
          </h3>
          <transition name="fade" mode="out-in">
            <p v-if="isOpen" class="text-justify text-gray-700 mt-2" v-html="tramitacao.descricao" />
          </transition>
        </div>
        <template v-if="tramitacao.nome != 'Suspenso' && tramitacao.projetos.length > 0">
          <div class="w-full flex flex-col lg:w-3/5 xg:w-3/5 bg-white p-2">
            <div
              v-for="projeto in tramitacao.projetos"
              :key="`projeto-${projeto.id}`"
            >
              <CardProjeto :is-open="isOpen" :projeto="projeto" />
            </div>
          </div>
        </template>
        <template v-else-if="tramitacao.nome === 'Suspenso'">
          <div class="w-full flex lg:w-3/5 xg:w-3/5 bg-white p-2">
            <button
              v-for="projeto in tramitacao.projetos"
              :key="`projeto-${projeto.id}`"
              type="button"
              class="bg-transparent mr-2 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            >
              {{ projeto.nome }}
            </button>
          </div>
        </template>
        <template v-else>
          <div class="w-full lg:w-3/5 xg:w-3/5  p-2">
            <div class="bg-blue-100 p-2 border-t border-b border-blue-700 px-6 py-4">
              <p class="px-3 py-1 text-sm font-semibold text-blue-700 mr-2">
                Nenhum projeto
              </p>
              <p class="px-3 py-1 text-sm text-blue-700">
                Nenhum projeto nesta etapa
              </p>
            </div>
          </div>
        </template>
      </div>
      <hr class="mb-5">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaProjetos',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    tramitacoes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>

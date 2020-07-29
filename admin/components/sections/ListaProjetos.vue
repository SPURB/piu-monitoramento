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
            <p v-if="isOpen" class="text-justify text-gray-700 mt-2">
              I - diagnóstico da área objeto de intervenção, com caracterização dos seus aspectos socioterritoriais;<br>
              II - programa de interesse público da futura intervenção, considerando a sua diretriz urbanística, viabilidade da transformação, impacto ambiental ou de vizinhança esperado, possibilidade de adensamento construtivo e populacional para a área e o modo de gestão democrática da intervenção proposta.
            </p>
          </transition>
        </div>
        <template v-if="tramitacao.projetos.length > 0">
          <div class="w-full flex flex-col lg:w-3/5 xg:w-3/5 bg-white p-2">
            <div
              v-for="projeto in tramitacao.projetos"
              :key="`projeto-${projeto.id}`"
            >
              <CardProjeto :is-open="isOpen" :projeto="projeto" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="w-full lg:w-/5 xg:w-3/5 bg-white p-2">
            <div class="px-6 py-4">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Nenhum projeto
              </span>
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

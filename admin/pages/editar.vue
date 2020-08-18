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
        Editar projeto
      </div>
    </div>
    <hr class="mb-5">

    <Projeto v-if="isReady" :create="false" :in-projeto="projeto" />
    <Etapa v-if="isReady" :etapa="etapa" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Editar',
  computed: {
    ...mapState('mix', {
      fetching: state => state.fetching,
      error: state => state.error
    }),
    ...mapState('crud-projeto', {
      origens: state => state.origens
    }),
    isReady () {
      return !this.error && !this.fetching
    },
    projeto () {
      return {
        id: 2,
        nome: 'PIU Vila Leopoldina',
        descricao: 'O PIU é de proposição privada e busca flexibilizar parâmetros de parcelamento, uso e ocupação do solo da área de aproximadamente 492 mil m² e de grande potencial de transformação localizada na várzea da margem direita do Rio Pinheiros (na Macroárea de Estruturação Metropolitana, Arco Pinheiros), junto à CEAGESP e próximo dos Parques Cândido Portinari e Villa Lobos.O Projeto busca, dentre outros ganhos, viabilizar solução para provisão de habitação social com reassentamento para os moradores das favelas da Linha e do Nove e das ocupações de áreas condominiais do conjunto habitacional Cingapura Madeirite -  melhorar as redes de equipamentos públicos, de drenagem e de arborização viária e aumentar as áreas verdes permeáveis.',
        consultaAberta: false,
        elementoMEM: 'MEM',
        areaTotal: 31.24,
        ultimaAtualizacao: '',
        id_origens: 2,
        proponentePrivado: true,
        id_proponentes: 6,
        id_tramitacao: 7
      }
    },
    etapa () {
      return {
        id: 2,
        nome: 'Preposição',
        arquivos: [{
          id: 3,
          id_projetos: 2,
          id_tramitacao: 2,
          id_grupo: 1,
          id_fonte: 2,
          data: '',
          documento: 'Diagnóstico',
          arquivo_url: 'http://minuta.gestaourbana.prefeitura.sp.gov.br/piu-leopoldina/wp-content/uploads/2016/08/02_MIP_PIU_Vila_Leopoldina-Villa-Lobos_diagnostico_e_programa.pdf',
          evento: ''
        },
        {
          id: 4,
          id_projetos: 2,
          id_tramitacao: 2,
          id_grupo: 2,
          id_fonte: 1,
          data: '',
          documento: 'Mapas',
          arquivo_url: 'http://minuta.gestaourbana.prefeitura.sp.gov.br/piu-leopoldina/wp-content/uploads/2016/08/03_MIP_PIU_Vila_Leopoldina-Villa-Lobos_mapas.pdf',
          evento: ''
        }]
      }
    }
  },
  created () {
    this.setupOn()
  },
  methods: {
    ...mapActions('mix', ['setupOn'])
  }
}
</script>

<style>

</style>

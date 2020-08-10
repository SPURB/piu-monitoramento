<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-col lg:flex-row xg:flex-row">
      <div class="w-full flex flex-col lg:w-1/3 xg:w-1/3 bg-white p-3">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="titulo">
            Título
          </label>
          <textarea
            v-model="projeto.nome"
            style="resize: none;"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>

        <div class="w-full flex items-center justify-between text-gray-700 mr-4 mb-4">
          <div class="flex items-center">
            <input v-model="projeto.consultaAberta" type="checkbox" class="cursor-pointer mr-2">
            <label class="flex items-center">
              Consulta aberta
            </label>
          </div>
          <div class="flex items-center">
            <input v-model="projeto.proponentePrivado" type="checkbox" class="cursor-pointer mr-2">
            <label class="flex items-center">
              Proponente privado
            </label>
          </div>
        </div>

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Tramitação
          </label>
          <Select
            :titulo="`Selecione uma tramitação`"
            :options="tramitacoes"
            @option="setTramitacao"
            @create="createTramitacao"
            @update="updateTramitacao"
            @send="sendTramitacao"
            @clear="clearTramitacao"
          />
        </div>

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Proponente
          </label>
          <Select
            :titulo="`Selecione uma proponente`"
            :options="proponentes"
            @option="setProponente"
            @create="createProponente"
            @update="updateProponente"
            @send="sendProponente"
            @clear="clearProponente"
          />
        </div>

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Elemento MEM
          </label>
          <input
            v-model="projeto.elementoMEM"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">
            Área total (km²)
          </label>
          <input
            v-model="projeto.areaTotal"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="0"
          >
        </div>

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Origem
          </label>
          <Select
            :titulo="`Selecione uma origem`"
            :options="origens"
            @option="setOrigem"
            @create="createOrigem"
            @update="updateOrigem"
            @send="sendOrigem"
            @clear="clearOrigem"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">
            Última atualização
          </label>
          <input
            v-model="projeto.ultimaAtualizacao"
            class="cursor-pointer appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
          >
        </div>

        <hr class="mb-4">

        <template v-if="isEdit">
          <div class="w-full mb-4">
            <label class="block text-gray-700 mb-2">
              Sistema Eletrônico de Informações (SEI)
            </label>
            <div class="w-full">
              <Arquivo />
            </div>
            <div class="flex flex-col items-center pt-4 pb-4 border-t border-b border-gray-400">
              <label for="file" class="cursor-pointer text-gray-500 flex items-center">
                <svg
                  viewBox="0 0 16 16"
                  class="fill-current mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM9 5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9H7V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V9H11C11.2652 9 11.5196 8.89464 11.7071 8.70711C11.8946 8.51957 12 8.26522 12 8C12 7.73478 11.8946 7.48043 11.7071 7.29289C11.5196 7.10536 11.2652 7 11 7H9V5Z"
                  />
                </svg>
                Incluir arquivo
              </label>
            </div>
          </div>
        </template>
      </div>

      <div class="flex flex flex-col lg:w-5/6 xg:w-5/6 bg-white p-2">
        <template v-if="isEdit">
          <div class="w-full mb-4">
            <label class="block text-gray-700 mb-2">
              Perímetro
            </label>

            <template v-if="geojson.length > 0">
              <mapa :data="geojson" />
              <file-kml :is-edit="true" @geojson="setGeojson" />
            </template>
            <template v-else>
              <file-kml @geojson="setGeojson" />
            </template>
          </div>
        </template>
        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Descrição
          </label>
          <client-only>
            <quill-editor
              ref="editor"
              v-model="projeto.descricao"
              :options="editorOption"
            />
          </client-only>
        </div>
      </div>
    </div>

    <div class="flex w-full bg-gray-100 justify-center p-5">
      <button
        class="font-simibold bg-spurb text-white rounded py-2 px-6 mr-2"
        type="button"
        @click.prevent="salvarProjeto"
      >
        Salvar
      </button>
      <button
        class="font-simibold border-gray-500 hover:bg-gray-500 border border-gray-500 rounded py-2 px-2 text-gray-700"
        type="button"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Projeto',
  props: {
    create: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => {
    return {
      isEdit: false,
      arquivos: [],
      geojson: [],
      projeto: {
        nome: '',
        consultaAberta: false,
        descricao: '',
        elementoMEM: '',
        areaTotal: '',
        ultimaAtualizacao: '',
        id_origens: 0,
        proponentePrivado: false,
        id_proponentes: 0,
        id_tramitacao: 0
      },
      editorOption: {
        theme: 'snow',
        placeholder: 'Insira a descrição aqui...',
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline']
          ]
        }
      },
      upTramitacao: [],
      upProponente: [],
      upOrigem: []
    }
  },
  computed: {
    ...mapState('crud-projeto', {
      fetching: state => state.fetching,
      error: state => state.error,
      origens: state => state.origens,
      proponentes: state => state.proponentes
    }),
    ...mapState('home', {
      tramitacoes: state => state.tramitacoes
    })
  },
  methods: {
    salvarProjeto () {
      if (
        this.projeto.nome && this.projeto.descricao &&
        this.projeto.elementoMEM && this.projeto.areaTotal &&
        this.projeto.ultimaAtualizacao && this.projeto.id_origens !== 0 &&
        this.projeto.id_proponentes !== 0 && this.projeto.id_tramitacao !== 0
      ) {
        console.log('tudo ok meu consagrado')
      } else {
        console.log('ta faltando coisa ai meu')
      }
    },
    setTramitacao (tramitacao) {
      this.projeto.id_tramitacao = tramitacao
    },
    setOrigem (origem) {
      this.projeto.id_origens = origem
    },
    setProponente (proponente) {
      this.projeto.id_proponentes = proponente
    },
    setGeojson (geojson) {
      this.geojson = [geojson]
    },
    /** metodos para os inputs :: Selects :: POST, PUT */
    createTramitacao (tramitacao) {
      return tramitacao
    },
    createProponente (proponente) {
      return proponente
    },
    createOrigem (origem) {
      return origem
    },
    updateTramitacao (tramitacao) {
      const inArray = this.upTramitacao.filter(up => up.id !== tramitacao.id)
      const { remove } = tramitacao

      if (remove) {
        this.upTramitacao = inArray
      } else {
        inArray.push(tramitacao)
        this.upTramitacao = inArray
      }
    },
    updateProponente (proponente) {
      const inArray = this.upProponente.filter(up => up.id !== proponente.id)
      const { remove } = proponente

      if (remove) {
        this.upProponente = inArray
      } else {
        inArray.push(proponente)
        this.upProponente = inArray
      }
    },
    updateOrigem (origem) {
      const inArray = this.upOrigem.filter(up => up.id !== origem.id)
      const { remove } = origem

      if (remove) {
        this.upOrigem = inArray
      } else {
        inArray.push(origem)
        this.upOrigem = inArray
      }
    },
    sendTramitacao () { return this.upTramitacao },
    sendProponente () { return this.upProponente },
    sendOrigem () { return this.upOrigem },
    clearTramitacao () { this.upTramitacao = [] },
    clearProponente () { this.upProponente = [] },
    clearOrigem () { this.upOrigem = [] }
  }
}
</script>

<style lang="scss" scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &--perimetro {
    & + label {
      background-color: none;
      display: inline-block;
    }
  }
}
</style>

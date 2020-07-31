<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex flex-col lg:flex-row xg:flex-row">
      <div class="w-full flex flex-col lg:w-1/3 xg:w-1/3 bg-white p-3">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="titulo">
            Título
          </label>
          <textarea
            v-model="novoProjeto.nome"
            style="resize: none;"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div class="w-full flex items-center justify-between text-gray-700 mr-4 mb-4">
          <div class="flex items-center">
            <input v-model="novoProjeto.consultaAberta" type="checkbox" class="cursor-pointer mr-2">
            <label class="flex items-center">
              Consulta aberta
            </label>
          </div>
          <div class="flex items-center">
            <input v-model="novoProjeto.proponentePrivado" type="checkbox" class="cursor-pointer mr-2">
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
            @option="getTramitacao"
          />
        </div>

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Proponente
          </label>
          <Select
            :titulo="`Selecione uma proponente`"
            :options="proponentes"
            @option="getProponente"
          />
        </div>

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Elemento MEM
          </label>
          <input
            v-model="novoProjeto.elementoMEM"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">
            Área total (km²)
          </label>
          <input
            v-model="novoProjeto.areaTotal"
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
            @option="getOrigem"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">
            Última atualização
          </label>
          <input
            v-model="novoProjeto.ultimaAtualizacao"
            class="cursor-pointer appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
          >
        </div>

        <hr class="mb-4">

        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Sistema Eletrônico de Informações (SEI)
          </label>
          <div class="flex flex-col items-center pt-4 pb-4 border-t border-b border-gray-400">
            <input id="file" type="file" class="inputfile cursor-pointer w-full h-full" multiple @change="getSEI">
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
            <template v-if="novoProjeto.sei.length > 0">
              <div
                v-for="(arquivo, index) in novoProjeto.sei"
                :key="index"
                class="flex"
              >
                <label class="font-bold text-gray-500 flex items-center">
                  <svg class="h-5 w-5 fill-current" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V7.414C14.9999 7.1488 14.8946 6.89449 14.707 6.707L9.293 1.293C9.10551 1.10545 8.8512 1.00006 8.586 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z"
                    />
                  </svg>
                  {{ arquivo.name }}
                </label>
                <button type="button" class="ml-2" @click="removerArquivo(index, 'sei')">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke="#EB5757"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 12L10 10L8 12ZM10 10L12 8L10 10ZM10 10L8 8L10 10ZM10 10L12 12L10 10ZM19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                    />
                  </svg>
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="flex flex flex-col lg:w-5/6 xg:w-5/6 bg-white p-2">
        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Perímetro
          </label>
          <button
            v-if="novoProjeto.kml.length > 0"
            type="button"
            class="flex items-center text-erro"
            @click="removerArquivo(0, 'kml')"
          >
            Remover arquivo
            <svg class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#EB5757"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 12L10 10L8 12ZM10 10L12 8L10 10ZM10 10L8 8L10 10ZM10 10L12 12L10 10ZM19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
              />
            </svg>
          </button>
          <div class="flex justify-center pt-4 pb-4 bg-gray-100">
            <input
              id="filePerimetro"
              type="file"
              name="file"
              class="inputfile inputfile--perimetro"
              @change="getKML"
            >
            <template v-if="novoProjeto.kml.length > 0">
              <label for="filePerimetro">
                MOSTRA O MAPA
              </label>
            </template>
            <template v-else>
              <label
                for="filePerimetro"
                class="bg-transparent mr-2 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white
                py-2 px-4 border border-gray-500 hover:border-transparent rounded cursor-pointer"
              >
                Incluir perímetro (geojson)
              </label>
            </template>
          </div>
        </div>
        <div class="w-full mb-4">
          <label class="block text-gray-700 mb-2">
            Descrição
          </label>
          <client-only>
            <quill-editor
              ref="editor"
              :options="editorOption"
            />
          </client-only>
        </div>
      </div>
    </div>
    <div class="flex w-full bg-gray-100 justify-center p-5">
      <button class="font-simibold bg-spurb text-white rounded py-2 px-6 mr-2" type="button">
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
  data: () => {
    return {
      novoProjeto: {
        nome: '',
        consultaAberta: false,
        elementoMEM: '',
        areaTotal: '',
        ultimaAtualizacao: '',
        id_origens: 0,
        proponentePrivado: false,
        id_proponentes: 0,
        id_tramitacao: 0,
        sei: [],
        kml: '',
        shape: '',
        file: 'Incluir arquivo'
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
      }
    }
  },
  computed: {
    ...mapState('criar-editar-projeto', {
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
    getSEI (event) {
      this.novoProjeto.sei = Array.from(event.target.files)
    },
    getKML (event) {
      this.novoProjeto.kml = Array.from(event.target.files)
    },
    getTramitacao (tramitacao) {
      this.novoProjeto.id_tramitacao = tramitacao
    },
    getOrigem (origem) {
      this.novoProjeto.id_origens = origem
    },
    getProponente (proponente) {
      this.novoProjeto.id_proponentes = proponente
    },
    removerArquivo (index, propriedade) {
      this.novoProjeto[propriedade] = this.novoProjeto[propriedade].filter((item, i) => i !== index)
    }
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

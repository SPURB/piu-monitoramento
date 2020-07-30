<template>
  <div class="w-full flex flex-col lg:flex-row xg:flex-row">
    <div class="w-full flex flex-col lg:w-1/3 xg:w-1/3 bg-white p-3">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="titulo">
          Título
        </label>
        <textarea
          style="resize: none;"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        />
      </div>
      <div class="w-full flex items-center justify-between text-gray-700 mr-4 mb-4">
        <div class="flex items-center">
          <input type="checkbox" class="cursor-pointer mr-2">
          <label class="flex items-center">
            Consulta aberta
          </label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" class="cursor-pointer mr-2">
          <label class="flex items-center">
            Proponente privado
          </label>
        </div>
      </div>
      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Tramitação
        </label>
        <Select title="Selecione uma tramitação" :options="tramitacoes" />
      </div>

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Proponente
        </label>
        <Select title="Selecione um proponente" :options="proponentes" />
      </div>

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Elemento MEM
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">
          Área total (km²)
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="0"
        >
      </div>

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Origem
        </label>
        <Select title="Selecione uma origem" :options="origens" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">
          Última atualização
        </label>
        <input
          class="cursor-pointer appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
        >
      </div>

      <hr class="mb-4">

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Sistema Eletrônico de Informações (SEI)
        </label>
        <div class="flex justify-center pt-4 pb-4 border-t border-b border-gray-400">
          <input id="file" type="file" class="inputfile cursor-pointer w-full h-full" @change="previewFiles">
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
            {{ novoProjeto.file }}
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex flex-col lg:w-5/6 xg:w-5/6 bg-white p-2">
      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Perímetro
        </label>
        <div class="flex justify-center pt-4 pb-4 bg-gray-100">
          <input id="filePerimetro" type="file" name="file" class="inputfile inputfile--perimetro">
          <label
            for="filePerimetro"
            class="bg-transparent mr-2 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white
            py-2 px-4 border border-gray-500 hover:border-transparent rounded cursor-pointer"
          >
            Incluir perímetro (geojson)
          </label>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Projeto',
  data: () => {
    return {
      novoProjeto: {
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
    previewFiles (event) {
      this.novoProjeto.file = event.target.files[0].name
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

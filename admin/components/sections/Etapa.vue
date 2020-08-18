<template>
  <div class="w-full flex flex-col lg:flex-row xg:flex-row mt-4 border-t border-gray-400 pt-2">
    <div class="w-full flex flex-col lg:w-1/3 xg:w-1/3 bg-white p-3">
      <h3 class="text-gray-700 text-2xl mb-4">
        {{ etapa.nome }}
      </h3>
      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Status
        </label>
        <client-only>
          <quill-editor
            ref="editor"
            :options="editorOption"
          />
        </client-only>
      </div>

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Registro SEI (primeiro)
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700
          leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="2020-06-12"
        >
      </div>

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Registro SEI (segundo)
        </label>
        <input
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700
          leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="2020-06-12"
        >
      </div>

      <div class="w-full mt-4 flex justify-center">
        <button
          class="font-simibold bg-spurb text-white rounded py-2 px-2 mr-2"
          type="button"
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

    <div class="flex flex flex-col lg:w-5/6 xg:w-5/6 bg-white p-2">
      <template v-if="etapa.arquivos.length > 0">
        <div class="w-full mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            Consulta Inicial
          </label>
          <Arquivo
            v-for="arquivo in etapa.arquivos"
            :key="arquivo.id"
            :in-arquivo="arquivo"
          />
        </div>
      </template>
      <template v-else>
        <div class="w-full p-2">
          <div class="bg-orange-100 p-1 border-t border-b border-orange-700 px-6 py-4">
            <p class="px-3 py-1 text-sm font-semibold text-orange-700 mr-2">
              Nenhum arquivo
            </p>
            <p class="px-3 py-1 text-sm text-orange-700">
              Nenhum arquivo associado à esta etapa
            </p>
          </div>
        </div>
      </template>
      <div class="w-full mb-4">
        <Arquivo v-for="index in countArquivos" :key="index" />
        <div
          class="flex flex-col items-center pt-4 pb-4 border-t border-b border-gray-400"
          @click.prevent="countArquivos++"
        >
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Etapa',
  props: {
    etapa: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      countArquivos: 0,
      editorOption: {
        theme: 'snow',
        placeholder: 'Insira o status aqui...',
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline']
          ]
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

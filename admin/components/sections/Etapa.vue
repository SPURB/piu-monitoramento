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

    <template v-if="etapa.arquivos.length > 0">
      <div class="flex flex flex-col lg:w-5/6 xg:w-5/6 bg-white p-2">
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

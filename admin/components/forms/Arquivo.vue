<template>
  <div v-if="isReady" class="arquivo bg-white mb-2">
    <label
      class="w-full font-semibold flex justify-between items-center bg-gray-500 text-white rounded p-1 cursor-pointer"
      @click="isOpen = !isOpen"
    >
      {{ arquivo.documento.length > 0 ? arquivo.documento : 'Texto da Consulta Pública' }}
      <svg
        class="h-4 w-4 fill-current"
        viewBox="0 0 17 17"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5858 2.58592C11.7703 2.3949 11.991 2.24254 12.235 2.13772C12.479 2.0329 12.7415 1.97773 13.007 1.97542C13.2726 1.97311 13.536 2.02371 13.7817 2.12428C14.0275 2.22484 14.2508 2.37334 14.4386 2.56113C14.6264 2.74892 14.7749 2.97222 14.8755 3.21801C14.976 3.4638 15.0266 3.72716 15.0243 3.99272C15.022 4.25828 14.9669 4.52072 14.862 4.76473C14.7572 5.00874 14.6049 5.22943 14.4138 5.41392L11.4138 8.41392C11.0388 8.78886 10.5302 8.99949 9.99984 8.99949C9.46951 8.99949 8.96089 8.78886 8.58584 8.41392C8.39723 8.23176 8.14463 8.13097 7.88244 8.13325C7.62024 8.13552 7.36943 8.24069 7.18402 8.4261C6.99861 8.61151 6.89344 8.86232 6.89116 9.12452C6.88888 9.38671 6.98968 9.63932 7.17184 9.82792C7.92195 10.5778 8.93918 10.9991 9.99984 10.9991C11.0605 10.9991 12.0777 10.5778 12.8278 9.82792L15.8278 6.82792C16.5565 6.07351 16.9596 5.0631 16.9505 4.01431C16.9414 2.96553 16.5207 1.96228 15.7791 1.22065C15.0375 0.479013 14.0342 0.0583372 12.9854 0.0492235C11.9367 0.0401098 10.9262 0.443287 10.1718 1.17192L8.67184 2.67192C8.57633 2.76417 8.50014 2.87451 8.44774 2.99652C8.39533 3.11852 8.36774 3.24974 8.36659 3.38252C8.36543 3.5153 8.39073 3.64698 8.44101 3.76987C8.4913 3.89277 8.56555 4.00442 8.65944 4.09831C8.75333 4.19221 8.86499 4.26646 8.98788 4.31674C9.11078 4.36702 9.24246 4.39232 9.37524 4.39117C9.50802 4.39002 9.63924 4.36243 9.76124 4.31002C9.88324 4.25761 9.99359 4.18143 10.0858 4.08592L11.5858 2.58592ZM6.58584 7.58592C6.96089 7.21098 7.46951 7.00035 7.99984 7.00035C8.53016 7.00035 9.03878 7.21098 9.41384 7.58592C9.50608 7.68143 9.61643 7.75761 9.73843 7.81002C9.86044 7.86243 9.99166 7.89002 10.1244 7.89117C10.2572 7.89232 10.3889 7.86702 10.5118 7.81674C10.6347 7.76646 10.7463 7.69221 10.8402 7.59832C10.9341 7.50442 11.0084 7.39277 11.0587 7.26987C11.1089 7.14698 11.1342 7.0153 11.1331 6.88252C11.1319 6.74974 11.1043 6.61852 11.0519 6.49652C10.9995 6.37451 10.9233 6.26417 10.8278 6.17192C10.0777 5.42204 9.06049 5.00077 7.99984 5.00077C6.93918 5.00077 5.92195 5.42204 5.17184 6.17192L2.17184 9.17192C1.7898 9.54091 1.48507 9.98229 1.27543 10.4703C1.06579 10.9583 0.95545 11.4832 0.950835 12.0143C0.946219 12.5454 1.04743 13.0722 1.24855 13.5637C1.44967 14.0553 1.74669 14.5019 2.12226 14.8775C2.49783 15.2531 2.94444 15.5501 3.43602 15.7512C3.92761 15.9523 4.45432 16.0535 4.98544 16.0489C5.51656 16.0443 6.04144 15.934 6.52945 15.7243C7.01747 15.5147 7.45885 15.21 7.82784 14.8279L9.32784 13.3279C9.42335 13.2357 9.49953 13.1253 9.55194 13.0033C9.60435 12.8813 9.63193 12.7501 9.63309 12.6173C9.63424 12.4845 9.60894 12.3529 9.55866 12.23C9.50838 12.1071 9.43412 11.9954 9.34023 11.9015C9.24634 11.8076 9.13469 11.7334 9.01179 11.6831C8.88889 11.6328 8.75721 11.6075 8.62443 11.6087C8.49166 11.6098 8.36044 11.6374 8.23843 11.6898C8.11643 11.7422 8.00608 11.8184 7.91384 11.9139L6.41384 13.4139C6.22934 13.6049 6.00865 13.7573 5.76465 13.8621C5.52064 13.9669 5.2582 14.0221 4.99264 14.0244C4.72708 14.0267 4.46372 13.9761 4.21793 13.8756C3.97214 13.775 3.74883 13.6265 3.56105 13.4387C3.37326 13.2509 3.22476 13.0276 3.12419 12.7818C3.02363 12.536 2.97303 12.2727 2.97534 12.0071C2.97764 11.7416 3.03282 11.4791 3.13763 11.2351C3.24245 10.9911 3.39482 10.7704 3.58584 10.5859L6.58584 7.58592Z"
        />
      </svg>
    </label>
    <div v-if="isOpen" class="w-full p-3 border border-gray-500 rounded">
      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Nome
        </label>
        <input
          v-model="arquivo.documento"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">
          Data do documento
        </label>
        <input
          v-model="arquivo.data"
          class="cursor-pointer appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        >
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 mb-2">
          Grupo
        </label>
        <Select
          titulo="Selecione um grupo"
          :options="grupos"
          :selected="arquivo.id_grupo"
          @options="setGrupo"
          @create="createGrupo"
          @update="updateGrupo"
          @send="sendGrupo"
          @clear="clearGrupo"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">
          Fontes
        </label>
        <Select
          titulo="Selecione uma fonte"
          :options="fontes"
          :selected="arquivo.id_fonte"
          @option="setFonte"
          @create="createFonte"
          @update="updateFonte"
          @send="sendFonte"
          @clear="clearFonte"
        />
      </div>

      <div class="w-full mb-4">
        <label class="block text-gray-700 mb-2">
          Url
        </label>
        <input
          v-model="arquivo.arquivo_url"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="url"
        >
      </div>
      <div class="w-full flex justify-between mb-4">
        <button
          class="font-simibold bg-spurb text-white rounded py-2 px-6 mr-2"
          type="button"
          @click.prevent="salvar"
        >
          Salvar
        </button>
        <button
          class="font-simibold border-gray-500 hover:bg-gray-500 border border-gray-500 rounded py-2 px-2 text-gray-700"
          type="button"
          @click.prevent="cancelar"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Arquivo',
  props: {
    inArquivo: {
      type: Object,
      default () {
        return undefined
      },
      required: false
    }
  },
  data: () => {
    return {
      isOpen: false,
      isEdit: false,
      arquivo: {},
      upGrupo: [],
      upFonte: []
    }
  },
  computed: {
    ...mapState('crud-projeto', {
      fetching: state => state.fetching,
      err: state => state.err,
      fontes: state => state.fontes,
      grupos: state => state.grupos
    }),
    isReady () {
      return !this.fetching && !this.err
    }
  },
  created () {
    this.setupOn()
    if (this.inArquivo) {
      this.arquivo = this.inArquivo
      this.isEdit = true
    } else {
      this.arquivo = {
        documento: '',
        data: '',
        arquivo_url: '',
        evento: '',
        id_grupo: 0,
        id_fonte: 0,
        id_projetos: 0
      }
    }
  },
  methods: {
    ...mapActions('crud-projeto', ['getFontes', 'getGrupos']),
    setupOn () {
      this.getFontes()
      this.getGrupos()
    },
    setGrupo (grupo) { // recebe valor selecionado no dropbox
      this.arquivo.id_grupo = grupo
    },
    setFonte (fonte) { // recebe valor selecionado no dropbox
      this.arquivo.id_fonte = fonte
    },
    createGrupo (grupo) { // criar grupo :: valor vem de um emit do componente Select
      return grupo
    },
    createFonte (fonte) { // criar fonte :: valor vem de um emit do componente Select
      return fonte
    },
    updateGrupo (grupo) { // altera e remove fonte :: valor vem de um emit do componente Select
      const inArray = this.upGrupo.filter(up => up.id !== grupo.id)
      const { remove } = grupo

      if (remove) {
        this.upGrupo = inArray
      } else {
        inArray.push(grupo)
        this.upGrupo = inArray
      }
    },
    updateFonte (fonte) { // altera e remove fonte :: valor vem de um emit do componente Select
      const inArray = this.upFonte.filter(up => up.id !== fonte.id)
      const { remove } = fonte

      if (remove) {
        this.upFonte = inArray
      } else {
        inArray.push(fonte)
        this.upFonte = inArray
      }
    },
    sendGrupo () { // envia as alterações para o database
      if (this.upGrupo.lenght > 0) {
        return this.upGrupo
      }
    },
    sendFonte () { // envia as alterações para o database
      if (this.upFonte.lenght > 0) {
        return this.upFonte
      }
    },
    clearGrupo () { this.upGrupo = [] },
    clearFonte () { this.upFonte = [] },
    salvar () {
      this.isEdit
        ? this.$emit('editar', this.arquivo) // PUT de dados do arquivo
        : this.$emit('salvar', this.arquivo) // POST de dados de novo arquivo
    },
    cancelar () {
      this.isEdit
        ? this.arquivo = this.inArquivo
        : this.arquivo = {
          documento: '',
          data: '',
          arquivo_url: '',
          evento: '',
          id_grupo: 0,
          id_fonte: 0,
          id_projetos: 0
        }
      this.isOpen = false
    }
  }
}
</script>

<style>

</style>

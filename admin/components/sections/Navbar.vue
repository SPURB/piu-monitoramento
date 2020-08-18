<template>
  <header class="bg-spurb lg:flex xg:flex items-center">
    <section class="flex justify-between py-4 px-3">
      <nuxt-link to="/" tag="div" class="cursor-pointer">
        <img class="h-10" src="../../assets/img/spurbanismo_mono-negativo.svg" alt="Logo da São Paulo Urbanismo">
      </nuxt-link>
      <div class="lg:hidden xg:hidden">
        <button
          type="button"
          class="hover:bg-spurb-dark border border-spurb-lighter hover:border-transparent rounded py-1 px-2"
          @click="isOpen = !isOpen"
        >
          <svg
            class="h-8 w-8"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="isOpen"
              d="M6 6L18 18M6 18L18 6L6 18Z"
              stroke="#FFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              v-else
              d="M4 18H20M4 6H20H4ZM4 12H20H4Z"
              stroke="#FFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
    <div
      :class="isOpen ? 'flex flex-col bg-spurb-dark' : 'hidden'"
      class="w-full lg:flex-row xg:flex-row lg:bg-spurb xg:bg-spurb lg:justify-between xg:justify-center
      text-white px-2 pt-3 pb-4"
    >
      <section class="h-full lg:self-center xg:self-center flex flex-col lg:flex-row xg:flex-row">
        <nuxt-link to="/" tag="a" class="font-simibold lg:hover:bg-spurb-dark xg:hover:bg-spurb-dark hover:bg-spurb rounded px-2 py-2">
          Lista de projetos
        </nuxt-link>
        <nuxt-link to="/criar" tag="a" class="font-simibold lg:hover:bg-spurb-dark xg:hover:bg-spurb-dark hover:bg-spurb rounded px-2 py-2">
          Criar projeto
        </nuxt-link>
      </section>
      <a
        href="#"
        class="font-simibold lg:hover:border-transparent xg:hover:border-transparent lg:self-end xg:self-end
        self-end
        border-spurb-lighter
        hover:bg-spurb-dark border border-spurb-lighter rounded py-2 px-2"
      >
        Sair
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => {
    return {
      isOpen: true
    }
  },
  created () {
    this.widthScreen()
  },
  methods: {
    widthScreen () {
      const { width } = window.screen
      if (width < 1024) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    }
  }
}
</script>

<style>

</style>

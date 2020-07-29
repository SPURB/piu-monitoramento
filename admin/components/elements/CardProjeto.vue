<template>
  <div class="w-full rounded border border-gray-400 overflow-hidden mb-2">
    <div class="px-6 py-4">
      <div class="flex text-gray-500">
        <section class="flex items-center mr-2">
          <svg
            class="h-3 w-3 fill-current mr-1"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 1.375V6.875C11 7.23967 10.8551 7.58941 10.5973 7.84727C10.3394 8.10513 9.98967 8.25 9.625 8.25H6.1875L2.75 11V8.25H1.375C1.01033 8.25 0.660591 8.10513 0.402728 7.84727C0.144866 7.58941 0 7.23967 0 6.875V1.375C0 1.01033 0.144866 0.660591 0.402728 0.402728C0.660591 0.144866 1.01033 0 1.375 0H9.625C9.98967 0 10.3394 0.144866 10.5973 0.402728C10.8551 0.660591 11 1.01033 11 1.375ZM3.4375 3.4375H2.0625V4.8125H3.4375V3.4375ZM4.8125 3.4375H6.1875V4.8125H4.8125V3.4375ZM8.9375 3.4375H7.5625V4.8125H8.9375V3.4375Z"
            />
          </svg>

          <p>Consulta aberta</p>
        </section>
        <section class="flex items-center">
          <svg
            class="h-3 w-3 fill-current mr-1"
            viewBox="0 0 11 11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5ZM6.1875 8.25C6.1875 8.43234 6.11507 8.6072 5.98614 8.73614C5.8572 8.86507 5.68234 8.9375 5.5 8.9375C5.31766 8.9375 5.1428 8.86507 5.01386 8.73614C4.88493 8.6072 4.8125 8.43234 4.8125 8.25C4.8125 8.06766 4.88493 7.8928 5.01386 7.76386C5.1428 7.63493 5.31766 7.5625 5.5 7.5625C5.68234 7.5625 5.8572 7.63493 5.98614 7.76386C6.11507 7.8928 6.1875 8.06766 6.1875 8.25ZM5.5 2.0625C5.31766 2.0625 5.1428 2.13493 5.01386 2.26386C4.88493 2.3928 4.8125 2.56766 4.8125 2.75V5.5C4.8125 5.68234 4.88493 5.8572 5.01386 5.98614C5.1428 6.11507 5.31766 6.1875 5.5 6.1875C5.68234 6.1875 5.8572 6.11507 5.98614 5.98614C6.11507 5.8572 6.1875 5.68234 6.1875 5.5V2.75C6.1875 2.56766 6.11507 2.3928 5.98614 2.26386C5.8572 2.13493 5.68234 2.0625 5.5 2.0625Z"
            />
          </svg>
          <p>Proponente público</p>
        </section>
      </div>
      <div class="font-bold text-xl text-gray-700 mb-2">
        {{ projeto.nome }}
      </div>
      <transition name="fade" mode="out-in">
        <p v-if="isOpen" class="text-gray-700 text-base">
          {{ projeto.descricao }}
        </p>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    projeto: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>

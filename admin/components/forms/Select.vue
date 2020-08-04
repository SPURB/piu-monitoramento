<template>
  <div class="select">
    <button
      class="flex items-center justify-between cursor-pointer appearance-none w-full border
      border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none
      focus:bg-white focus:border-gray-500 flex"
      @click="isOpen = !isOpen"
    >
      {{ value > 0 ? text : titulo }}
      <div v-if="!isOpen" class="pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      <div v-else class="pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M1.60005 6.24299C1.40748 6.38742 1.16927 6.45754 0.929158 6.44048C0.689049 6.42341 0.463151 6.32031 0.29294 6.1501C0.122729 5.97989 0.0196275 5.75399 0.0025634 5.51388C-0.0145007 5.27377 0.0556172 5.03557 0.200046 4.84299L4.20005 0.842993C4.38698 0.659766 4.63829 0.557136 4.90005 0.557136C5.1618 0.557136 5.41312 0.659766 5.60005 0.842993L9.60005 4.84299C9.74448 5.03556 9.8146 5.27377 9.79753 5.51388C9.78047 5.75399 9.67737 5.97989 9.50715 6.1501C9.33694 6.32031 9.11105 6.42341 8.87094 6.44048C8.63083 6.45754 8.39262 6.38742 8.20005 6.24299L4.90005 2.95299L1.60005 6.25299L1.60005 6.24299Z"
          />
        </svg>
      </div>
    </button>

    <transition-group
      v-if="isOpen"
      tag="ul"
      name="fade"
      class="list-inside"
    >
      <li
        v-for="option in options"
        :key="option.id"
        :class="isEdit ? 'flex items-center justify-between' : 'hover:text-white hover:bg-gray-500'"
        class="cursor-pointer border-b border-gray-500 text-gray-500"
      >
        <Option
          :option="option"
          :in-edit="isEdit"
          @option="setOption"
        />
      </li>
    </transition-group>

    <div v-if="isOpen" class="mt-5">
      <div
        v-if="!isEdit && !isCreate"
        class="flex justify-center items-center pb-2 pt-2 border-b border-gray-400"
        @click="isEdit = !isEdit"
      >
        <label class="cursor-pointer text-gray-500 flex items-center">
          <svg class="h-5 w-5 fill-current mr-1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.414 2.58594C17.0389 2.211 16.5303 2.00037 16 2.00037C15.4697 2.00037 14.9611 2.211 14.586 2.58594L7 10.1719V12.9999H9.828L17.414 5.41394C17.7889 5.03888 17.9996 4.53027 17.9996 3.99994C17.9996 3.46961 17.7889 2.96099 17.414 2.58594Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H8C8.26522 4 8.51957 4.10536 8.70711 4.29289C8.89464 4.48043 9 4.73478 9 5C9 5.26522 8.89464 5.51957 8.70711 5.70711C8.51957 5.89464 8.26522 6 8 6H4V16H14V12C14 11.7348 14.1054 11.4804 14.2929 11.2929C14.4804 11.1054 14.7348 11 15 11C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12V16C16 16.5304 15.7893 17.0391 15.4142 17.4142C15.0391 17.7893 14.5304 18 14 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V6Z"
            />
          </svg>
          Editar
        </label>
      </div>

      <template v-if="isCreate">
        <div
          class="w-full flex items-center justify-between bg-spurb-lighter p-2"
          @click.prevent="createNew"
        >
          <input
            v-model="body.nome"
            type="text"
            class="appearance-none border rounded w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
          <span class="pl-2 w-2/12 text-white flex justify-center">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 9H1M9 1V17V1Z"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </template>

      <div
        v-if="!isEdit && !isCreate"
        class="flex justify-center items-center pb-2 pt-2 border-b border-gray-400"
        @click.prevent="isCreate = !isCreate"
      >
        <label class="cursor-pointer text-gray-500 flex items-center">
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
          Criar
        </label>
      </div>

      <template v-if="isEdit || isCreate">
        <div
          :class="!isEdit ? 'border-t border-gray-400' : ''"
          class="flex justify-center items-center mt-2"
          @click.prevent="cancel"
        >
          <label class="cursor-pointer text-gray-500 flex items-center">
            <svg class="h-4 w-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM11.707 7.293L8.707 4.293C8.51947 4.10553 8.26516 4.00021 8 4.00021C7.73484 4.00021 7.48053 4.10553 7.293 4.293L4.293 7.293C4.11084 7.4816 4.01005 7.7342 4.01233 7.9964C4.0146 8.2586 4.11977 8.50941 4.30518 8.69482C4.49059 8.88023 4.7414 8.9854 5.0036 8.98767C5.2658 8.98995 5.5184 8.88916 5.707 8.707L7 7.414V11C7 11.2652 7.10536 11.5196 7.29289 11.7071C7.48043 11.8946 7.73478 12 8 12C8.26522 12 8.51957 11.8946 8.70711 11.7071C8.89464 11.5196 9 11.2652 9 11V7.414L10.293 8.707C10.4816 8.88916 10.7342 8.98995 10.9964 8.98767C11.2586 8.9854 11.5094 8.88023 11.6948 8.69482C11.8802 8.50941 11.9854 8.2586 11.9877 7.9964C11.99 7.7342 11.8892 7.4816 11.707 7.293Z"
              />
            </svg>
            Cancelar
          </label>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    titulo: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      value: 0,
      text: '',
      body: {
        nome: ''
      },
      isOpen: false,
      isEdit: false,
      isCreate: false
    }
  },
  watch: {
    isOpen () {
      if (!this.isOpen) {
        this.isEdit = false
      }
    }
  },
  methods: {
    setOption (option) {
      this.text = option.nome
      this.value = option.id
      this.$emit('option', this.value)

      this.isOpen = false
    },
    createNew () {
      this.$emit('create', this.body)
    },
    cancel () {
      this.isEdit = false
      this.isCreate = false
    }
  }
}
</script>

<style>
</style>

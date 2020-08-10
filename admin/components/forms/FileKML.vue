<template>
  <div class="flex" :class="!isEdit ? 'justify-center pt-4 pb-4 bg-gray-100' : 'justify-end pt-2'">
    <template v-if="!isEdit">
      <input
        id="filePerimetro"
        type="file"
        name="file"
        class="inputfile inputfile--perimetro"
        accept=".kml"
        @change="setFile"
      >
      <label
        for="filePerimetro"
        class="bg-transparent mr-2 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white
        py-2 px-4 border border-gray-500 hover:border-transparent rounded cursor-pointer"
      >
        Incluir perímetro (geojson)
      </label>
    </template>
    <template v-else>
      <input
        id="filePerimetro"
        type="file"
        name="file"
        class="inputfile inputfile--perimetro"
        accept=".kml"
        @change="setFile"
      >
      <label
        for="filePerimetro"
        class="py-2 px-4 text-gray-700 font-bold border border-gray-400 bg-gray-400 rounded cursor-pointer"
      >
        Atualizar perímetro (geojson)
      </label>
    </template>
  </div>
</template>

<script>
import { kml } from '@/libs/toGeoJSON.js'
export default {
  name: 'Filekml',
  props: {
    isEdit: {
      type: Boolean,
      required: false
    }
  },
  data: () => {
    return {
      geojson: {}
    }
  },
  watch: {
    geojson (value) {
      this.$emit('geojson', value)
    }
  },
  methods: {
    setFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', function (e) {
        const xml = e.target.result
        const geojson = kml(new DOMParser().parseFromString(xml, 'text/xml'))
        window.convertedGeojson = geojson.features[0]
      })

      reader.readAsBinaryString(file)

      setTimeout(() => {
        this.geojson = window.convertedGeojson
      }, 500)
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

<template>
  <vl-map
    :load-tiles-while-animating="true"
    :load-tiles-while-interacting="true"
    data-projection="EPSG:4326"
    style="height: 400px"
  >
    <vl-view
      ident="view"
      :zoom.sync="zoom"
      :min-zoom.sync="minZoom"
      :max-zoom.sync="maxZoom"
      :center.sync="center"
      :rotation.sync="rotation"
    />

    <vl-layer-tile>
      <vl-source-osm />
    </vl-layer-tile>

    <vl-layer-vector>
      <vl-source-vector :features.sync="features" />
      <vl-style-box>
        <vl-style-stroke color="#f7915f" :width="2" />
        <vl-style-fill color="rgba(255, 204, 179, 0.5)" />
      </vl-style-box>
    </vl-layer-vector>
  </vl-map>
</template>

<script>
export default {
  name: 'Mapa',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      features: [],
      center: [],
      zoom: 11.9,
      minZoom: 11.9,
      maxZoom: 19,
      rotation: 0
    }
  },
  created () {
    this.features = this.data
    this.getCenter()
  },
  methods: {
    getCenter () {
      const coordinates = this.features[0].geometry.coordinates[0]

      const x = coordinates.map(x => x[0])
      const y = coordinates.map(x => x[1])
      const cx = (Math.min(...x) + Math.max(...x)) / 2
      const cy = (Math.min(...y) + Math.max(...y)) / 2

      this.center = [cx, cy]
    }
  }
}
</script>

<style>
</style>

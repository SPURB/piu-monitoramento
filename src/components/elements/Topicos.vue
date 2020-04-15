<template>
  <div class="subtitle">
      <p>{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
    name: 'Topicos',
    props: {
        subtitle: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.subtitle {
    p {
        margin: 0 0 24px 0;
        font-size: 13px;
        line-height: 1.6;
        color: #333333;
    }
}
</style>
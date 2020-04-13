<template>
    <div class="bloco proposicao">
	    <div class="etapa">{{ etapas.title }}</div>
        <div :key="`etapas-${index}`" v-for="(etapa, index) in etapas.etapa">
			<div>
				<div class="marcadorEtapa">{{ etapa.marcadorNumber }}</div>
				<span>{{ etapa.marcadorTitle }}</span>
			</div>
			<div class="publicos">
				<section :key="`item-${etapa.marcadorTitle}-${index}`" v-for="(item, index) in etapa.publico">
					<a href="#">
						{{ item.id_nome }}
					</a>
				</section>
			</div>
            
			<div class="privados">
				<section :key="`item-${etapa.marcadorTitle}-${index}`" v-for="(item, index) in etapa.privado">
					<a href="#">
						{{ item.id_nome }}
					</a>
				</section>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    name: 'etapa',
    props: {
        etapas: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>
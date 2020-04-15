<template>
    <div class="aspectos">
		<h4>Aspectos técnico-urbanísticos</h4>

		<p>{{ descricao }}</p>

		<template v-if="testeVazio(elemento) != false">
			<div>
				<h6>Elemento da rede de estruturação urbana</h6>
                {{ elemento }}
			</div>
		</template>
		<template v-if="testeVazio(areaTotal) != false">
			<div>
				<h6>Área total</h6>
				{{ areaTotal }} ha
			</div>
		</template>
		<template v-if="testeVazio(zonaEspeciais) != false">
            <div>
				<h6>Zonas especiais</h6>
				{{ zonaEspeciais }}
			</div>
		</template>
		<template v-if="testeVazio(interessePublico) != false">
			<div>
			    <h6>Interesse público</h6>
				{{ interessePublico }}
            </div>
        </template>
		<template v-if="testeVazio(interessePrivado) != false">
			<div>
			    <h6>Interesse privado</h6>
				{{ interessePrivado }}
			</div>
        </template>
	</div>
</template>

<script>
export default {
    name: 'Aspectos',
    props: {
        descricao: { type: String },
        areaTotal: { type: String },
        zonaEspeciais: { type: String },
        interessePublico: { type: String },
        contraPartida: { type: String },
        interessePrivado: { type: String }
    },
    methods: {
        testeVazio(file) {
			if (file != undefined && file != null && file != '-' && file != '' && file != 'NA') {
				return true;
			} else { return false };
		},
    },
}
</script>

<style lang="scss" scoped>
.aspectos {
	width: 40%;
	margin-left: 16px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-webkit-hyphens: auto;
	-moz-hyphens: auto;
	hyphens: auto;
    
    p {
		font-size: 1em;
		line-height: 2em;
	}
	div {
		border-top: 1px solid #BCBCBC;
		padding: 1em 0;
		margin: 0;
		line-height: 1.6em;
        
        h6 { 
			font-size: 1em; 
			color: #BCBCBC;
			margin: 0;
			padding: 0;
			font-weight: 500;
		}
	}
}
</style>
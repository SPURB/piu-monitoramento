<template>
    <div class="ficha-aspectos">
		<h4>Aspectos técnico-urbanísticos</h4>

		<p>{{ descricao }}</p>

			<div>
				<h6>Elemento da rede de estruturação urbana</h6>
				{{ elemento }}
			</div>
			<div>
				<h6>Área total</h6>
				{{ areaTotal }} ha
			</div>
	</div>
</template>

<script>
export default {
	name: 'FichaAspectos',
	props: {
		idProjeto: {
			type: Number,
			required: true
		},
		elemento: {
			type: String,
			required: true
		},
		descricao: {
			type: String,
			required: true
		},
		areaTotal: {
			type: Number,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.ficha-aspectos {
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
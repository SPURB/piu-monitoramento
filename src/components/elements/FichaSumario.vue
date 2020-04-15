<template>
	<div class="ficha-sumario">
		<div class="indicador" :class="etapaClass" title="Etapa atual da tramitação do PIU">{{ etapaTag }}</div>
			<div class="indicador__group">
				<template v-if="isNotEmpty(this.projeto.id_iniciativa_da_proposta)">
					Natureza da proposta
					<div class="group__item">{{projeto.id_iniciativa_da_proposta}}</div>
				</template>
				<template v-if="isNotEmpty(projeto.id_proponente)">
					Proponente
					<div class="group__item">{{projeto.id_proponente}}</div>
				</template>
				<template v-if="isNotEmpty(projeto.id_origem)">
					Origem
					<div class="group__item">{{projeto.id_origem}}</div>
				</template>
				<template v-if="isNotEmpty(projeto.id_registro_administrativo)">
					Registro administrativo
					<div class="group__item" v-for="(link, index) in filteredLinks" :key="index">
						<a :class="{'item__last': index === filteredLinks.length - 1}" :href="link.arquivo" :title="link.nome_publico_do_arquivo" target="_blank">
							{{ link.nome_publico_do_arquivo }} <i class="material-icons">launch</i>
						</a>
					</div>
				</template>
			</div>
			<a v-if="linkPaginaCompleta" class="link_pag_completa" :href="linkPaginaCompleta.arquivo" :title="'Acesse a página completa de '+ linkPaginaCompleta.PIU" target="_blank">
				Página completa <i class="material-icons">launch</i>
			</a>
	</div>
</template>

<script>
export default {
	name: 'FichaSumario',
	props: {
		projeto: {
			type: Object,
			required: true
		},
		hiperlinks: {
			type: Array,
			required: true
		},
		etapaClass: {
			type: String,
			default: ''
		},
		etapaTag: {
			type: String,
			default: ''
		},
		clickedId: {
			type: Number,
			required: true
		}
	},
	computed: {
		filteredLinks () {
			return this.hiperlinks
				.filter(link => link.ID_etapa === 200 || link.ID_etapa === 250)
				.filter(link => link.ID === this.clickedId)
		},
		linkPaginaCompleta () {
			return this.hiperlinks.find(link => link.ID_etapa == 100 && link.ID === this.clickedId)
		}
	},
	methods: {
		isNotEmpty(file) {

			if (!file) return false

			else if (file === '-' && file === '' && file === 'NA') {
				return false
			}
			
			return true
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../scss/variables";

.ficha-sumario {
	width: 20%;
	font-size: 1em;
	line-height: 1.75em;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-webkit-hyphens: auto;
	-moz-hyphens: auto;
	hyphens: auto;
}

.indicador__group {
	border-radius: 2px;
	border: 1px solid #BDBDBD;
	padding: 4px 8px;
	margin-top: 16px;
	margin-bottom: 16px;
}

.group__item { 
	font-weight: 700;
	margin-bottom: 0;
	a {
		margin-bottom: 1rem;
		font-weight: 700;
		display: block;

		i {
			font-size: 16px;
			line-height: 13px;
			vertical-align: -3px;
		};

		&:not([href]) {
			color: initial;
			&:hover { text-decoration: none; cursor: default;};
			i { display: none; };
		}
		&.item__last {
			margin-bottom: 0
		}
	}
}


.link_pag_completa {
	display: flex;
	justify-content: center;
	align-items: center;
	hyphens: none;
	padding: .4em;
	border-radius: 2px;
	text-align: center;
	background-color: $vermelho-gestao;
	color: #FFFFFF;
	text-decoration: none;
	border: 1px solid $vermelho-gestao;
	transition: all 200ms;
	max-height: 40px;
	i { font-size: 16px; margin-left: 4px; };
	&:hover {
		background-color: transparent;
		color: $vermelho-gestao;
	}
}
</style>

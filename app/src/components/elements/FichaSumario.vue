<template>
	<div class="ficha-sumario">
		<div class="indicador" :class="etapaClass" title="Etapa atual da tramitação do PIU">{{ etapaTag }}</div>
			<div class="indicador__group" v-if="clickedId">
				<template>
					Natureza da proposta
					<div class="group__item">{{ publicoPrivado }}</div>
				</template>
				<template>
					Proponente
					<div class="group__item">{{ proponente.nome }}</div>
				</template>
				<template>
					Origem
					<div class="group__item">{{ origem.nome }}</div>
				</template>
				<template v-if="registrosAdministrativos.length">
					Registro administrativo
					<div class="group__item" v-for="(link, index) in registrosAdministrativos" :key="index">
						<a :class="{
								'item__last': index === registrosAdministrativos.length - 1
							}"
							:href="link.arquivo_url"
							:title="link.documento" target="_blank">{{ link.documento }} <i class="material-icons">launch</i>
						</a>
					</div>
				</template>
			</div>
			<a v-if="linkPaginaCompleta" class="link_pag_completa" :href="linkPaginaCompleta.arquivo_url" :title="'Acesse a página completa de '+ linkPaginaCompleta.nome_arquivo" target="_blank">
				Página completa <i class="material-icons">launch</i>
			</a>
	</div>
</template>

<script>
import { http } from '../../api'

export default {
	name: 'FichaSumario',
	mixins: [ http ],
	props: {
		projeto: {
			type: Object,
			required: true
		},
		arquivosTramitacao: {
			type: Array,
			required: true
		},
		etapaClass: {
			type: String,
			default: ''
		},
		proponentes: {
			type: Array,
			required: true
		},
		origens: {
			type: Array,
			required: true
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
		publicoPrivado () {
			return this.projeto.proponentePrivado ? 'Privado' : 'Público'
		},
		proponente (){
			if (this.proponentes.length) {
				return this.proponentes.find(proponente => proponente.id === this.projeto.id_proponentes)
			}
			else { return '' }
		},
		origem (){
			if (!this.origens.length) return ''
			return this.origens.find(origem => origem.id === this.projeto.id_origens)
		},
		registrosAdministrativos () {
			if (!this.arquivosTramitacao.length) return []
			return this.arquivosTramitacao.filter(arquivo => arquivo.id_tramitacao === 200 && arquivo.id_projetos === this.projeto.id)
		},
		linkPaginaCompleta () {
			return this.arquivosTramitacao.find(link => link.id_tramitacao == 12 && link.id_projetos === this.projeto.id)
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

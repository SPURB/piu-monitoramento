<template>
	<div class="ficha-tramitacao" @click="showTramitacao=!showTramitacao" :class="setLabelClass">
			<div class="periodoEtapaTramit">
				{{ dataTramitacao.registroSeiPrimeiro }} - {{ dataTramitacao.registroSeiUltimo }}
			</div>
			<div class="label" :class="setLabelClass">
				{{ `0${idTramitacao}` }}
				<span>{{ title }}</span>
				<ficha-tramitacao-counter class="label__counter" :itens="arquivos.length" :estado="setLabelClass"/>
			</div>
			<div class="content" :class="showTramitacao ? 'open' : 'close'">
				<p class="content__status" v-if="dataTramitacao.status">{{ dataTramitacao.status }}</p>
				<div v-for="(grupo, index) in arquivosPorGrupos" :key="index">
					<ficha-tramitacao-arquivos 
						:title="grupo.title"
						:arquivos="grupo.arquivos"
					/>
				</div>
			</div>
	</div>
</template>

<script>
import FichaTramitacaoArquivos from './FichaTramitacaoArquivos.vue'
import FichaTramitacaoCounter from './FichaTramitacaoCounter.vue'
export default {
	name: 'FichaTramitacao',
	components: {
		FichaTramitacaoArquivos,
		FichaTramitacaoCounter
	},
	data () {
		return {
			showTramitacao: false
		}
	},
	props: {
		clickedId:{
			type: Number,
			required: true
		},
		idTramitacao: {
			type: Number,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		arquivos: {
			type: Array,
			required: true
		},
		grupos: {
			type: Array,
			required: true
		},
		dataTramitacao: {
			type: Object,
			default: () => {
				return {
					id_projetos: 0,
					id_tramitacao: 0,
					registroSeiPrimeiro: '',
					registroSeiUltimo: ''
				}
			}
		},
		projetoTramitacao: {
			default: 0
		}
	},
	computed: {
		arquivosCount () {
			return this.arquivos.length
		},
		arquivosPorGrupos () {
			return this.grupos.map(grupo => {
				return {
					title: grupo.nome,
					arquivos: this.arquivos.filter(arquivo => arquivo.id_grupo === grupo.id)
				}
			})
			.filter(grupo => grupo.arquivos.length)
		},
		setLabelClass () {
			const etapa = this.idTramitacao
			let e = this.projetoTramitacao
			if (e < etapa) { return 'posterior' }
			if (e == etapa) { return 'atual' }
			if (e > etapa) { return 'anterior' }
			else return ''
		}
	},
	watch: {
		clickedId (id) {
			if (id) { this.showTramitacao = false }
		}
	},
	methods: {
		formatDataExcel (data) {
			let d = new Date((Math.floor(data - 25568))*86400000)
			let string = ('0' + d.getDate()).slice(-2)+'/'+('0' + (d.getMonth()+1)).slice(-2)+'/'+d.getFullYear()
			return string
		},
	}
}
</script>

<style lang="scss" scoped>
.content {
	&__status {
		white-space: pre-line;
		margin-top: 0;
	}
}

.ficha-tramitacao {
	border-top-width: 0.25em;
	border-top-style: solid;
	position: relative;
	display: flex;
	flex-direction: column;

	&:hover {
		cursor: pointer;
	}
	&.posterior:hover {
		cursor: not-allowed
	}

	.periodoEtapaTramit {
			color: rgba(0, 0, 0, 0.2);
			text-transform: uppercase;
			position: absolute;
			right: 0;
			line-height: 16px;
			font-size: 10px;
	}

	.label {
			border: 0;
			overflow: hidden;
			color: rgba(0, 0, 0, 0.4);
			display: flex;
			flex-direction: row;
			position: relative;
			line-height: 4.5em;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			&__counter {
				height: 68px;
				padding-top: 4px;
				margin-left: auto;
				position: relative;
			}
			&:active {
					background: #ececec;
			}

			span {
					font-weight: 700;
					text-transform: uppercase;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin: 0 4px;
					max-width: calc(100% - 48px);
			}
	}
	// .anterior::after {
	// 		font-family: "Material Icons";
	// 		font-size: 24px;
	// 		content: "check_box";
	// 		position: absolute;
	// 		right: 0;
	// }
	.atual {
			color: #333333;
	}
	// .atual::after {
	// 		font-family: "Material Icons";
	// 		font-size: 24px;
	// 		content: "indeterminate_check_box";
	// 		position: absolute;
	// 		right: 0;
	// }
	// .posterior::after {
	// 		font-family: "Material Icons";
	// 		font-size: 24px;
	// 		content: "check_box_outline_blank";
	// 		position: absolute;
	// 		right: 0;
	// }    
}
.open {
	display: block;
}
.close {
	display: none;
}
</style>
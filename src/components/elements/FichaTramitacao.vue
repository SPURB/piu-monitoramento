<template>
	<div class="ficha-tramitacao" @click="showTramitacao=!showTramitacao">
			<div class="periodoEtapaTramit">
				{{ periodo }}
			</div>
			<div class="label" :class="setLabelClass">
				{{ `0${idTramitacao}` }}
				<span>{{ title }}</span>
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
export default {
	name: 'FichaTramitacao',
	components: {
		FichaTramitacaoArquivos
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
			required: true
		},
		projetoTramitacao: {
			default: 0
		}
	},
	computed: {
		periodo () {
			const isEmpty = str => {
				if (!str) return true
				return str === ''
			}
			const primeiro = this.dataTramitacao.registroSeiPrimeiro
			const ultimo = this.dataTramitacao.registroSeiUltimo
			
			if (isEmpty(primeiro) && isEmpty(ultimo)) {
				return ''
			}

			else if (isEmpty(primeiro) && !isEmpty(ultimo)) {
				return primeiro
			}

			else if (!isEmpty(primeiro) && isEmpty(ultimo)) {
				return ` - ${ultimo}`
			}
			else {
				return  `${primeiro} — ${ultimo}`
			}
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
			if (e < etapa || e > 8) { return 'posterior' }
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
	.anterior::after {
			font-family: "Material Icons";
			font-size: 24px;
			content: "check_box";
			position: absolute;
			right: 0;
	}
	.atual {
			color: #333333;
	}
	.atual::after {
			font-family: "Material Icons";
			font-size: 24px;
			content: "indeterminate_check_box";
			position: absolute;
			right: 0;
	}
	.posterior::after {
			font-family: "Material Icons";
			font-size: 24px;
			content: "check_box_outline_blank";
			position: absolute;
			right: 0;
	}    
}
.open {
	display: block;
}
.close {
	display: none;
}
</style>
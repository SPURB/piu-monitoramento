<template>
	<div id="sumario">

		<Etapa-head />

		<Etapa :etapas="etapaPreposicao" @clicked="getClickedId"/>
		<Etapa :etapas="etapaAndamento" @clicked="getClickedId"/>
		<Etapa :etapas="etapaImplantacao" @clicked="getClickedId"/>
		<Etapa :etapas="etapaSuspenso" @clicked="getClickedId"/>
		<Etapa :etapas="etapaArquivado" @clicked="getClickedId"/>

	</div>
</template>

<script>
import EtapaHead from './EtapaHead.vue'
import Etapa from './Etapa.vue'
export default {
	name:'sumario',
	data () {
		return {
			clickedId: undefined
		}
	},
	components: {
		EtapaHead,
		Etapa
	},
	props: ['data', 'hiperlinks'],
	computed: {
		preposicao () {
			let preposicao = {
				marcadorNumber: '01',
				marcadorTitle: 'EM PROPOSIÇÃO DOS ELEMENTOS PRÉVIOS',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 2 && projeto.id_iniciativa_da_proposta === 'Pública') {
					preposicao.publico.push(projeto)
				} else if (projeto.etapas_NUM === 2 && projeto.id_iniciativa_da_proposta === 'Privado') {
					preposicao.privado.push(projeto)
				}
			})
			return preposicao
		},
		consultaPI () {
			let consulta = {
				marcadorNumber: '02',
				marcadorTitle: 'CONSULTA PÚBLICA INICIAL',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 2 && projeto.id_iniciativa_da_proposta === 'Pública') {
					consulta.publico.push(projeto)
				} else if (projeto.etapas_NUM === 2 && projeto.id_iniciativa_da_proposta === 'Privado') {
					consulta.privado.push(projeto)
				}
			})
			return consulta
		},
		avaliacao () {
			let avaliacao = {
				marcadorNumber: '03',
				marcadorTitle: 'AVALIAÇÃO SMUL',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 3 && projeto.id_iniciativa_da_proposta === 'Pública') {
					avaliacao.publico.push(projeto)
				} else if (projeto.etapas_NUM === 3 && projeto.id_iniciativa_da_proposta === 'Privado') {
					avaliacao.privado.push(projeto)
				}
			})
			return avaliacao
		},
		elaboracao () {
			let elaboracao = {
				marcadorNumber: '04',
				marcadorTitle: 'ELABORAÇÃO',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 4 && projeto.id_iniciativa_da_proposta === 'Pública') {
					elaboracao.publico.push(projeto)
				} else if (projeto.etapas_NUM === 4 && projeto.id_iniciativa_da_proposta === 'Privado') {
					elaboracao.privado.push(projeto)
				}
			})
			return elaboracao
		},
		discussao () {
			let discussao = {
				marcadorNumber: '05',
				marcadorTitle: 'DISCUSSÃO PÚBLICA',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 5 && projeto.id_iniciativa_da_proposta === 'Pública') {
					discussao.publico.push(projeto)
				} else if (projeto.etapas_NUM === 5 && projeto.id_iniciativa_da_proposta === 'Privado') {
					discussao.privado.push(projeto)
				}
			})
			return discussao
		},
		consolidacao () {
			let consolidacaos = {
				marcadorNumber: '06',
				marcadorTitle: 'CONSOLIDAÇÃO',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 6 && projeto.id_iniciativa_da_proposta === 'Pública') {
					consolidacaos.publico.push(projeto)
				} else if (projeto.etapas_NUM === 6 && projeto.id_iniciativa_da_proposta === 'Privado') {
					consolidacaos.privado.push(projeto)
				}
			})
			return consolidacaos
		},
		encaminhamento () {
			let encaminhamentos = {
				marcadorNumber: '07',
				marcadorTitle: 'ENCAMINHAMENTO JURÍDICO',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 7 && projeto.id_iniciativa_da_proposta === 'Pública') {
					encaminhamentos.publico.push(projeto)
				} else if (projeto.etapas_NUM === 7 && projeto.id_iniciativa_da_proposta === 'Privado') {
					encaminhamentos.privado.push(projeto)
				}
			})
			return encaminhamentos
		},
		implantacao () {
			let implantacaos = {
				marcadorNumber: '08',
				marcadorTitle: 'IMPLANTAÇÃO',
				publico: [],
				privado: []
			}

			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 8 && projeto.id_iniciativa_da_proposta === 'Pública') {
					implantacaos.publico.push(projeto)
				} else if (projeto.etapas_NUM === 8 && projeto.id_iniciativa_da_proposta === 'Privado') {
					implantacaos.privado.push(projeto)
				}
			})
			return implantacaos
		},
		suspenso () {
			let suspensos = {
				marcadorNumber: 0,
				marcadorTitle: 'Suspenso',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 9 && projeto.id_iniciativa_da_proposta === 'Pública') {
					suspensos.publico.push(projeto)
				} else if (projeto.etapas_NUM === 9 && projeto.id_iniciativa_da_proposta === 'Privado') {
					suspensos.privado.push(projeto)
				}
			})
			return suspensos
		},
		arquivado () {
			let arquivados = {
				marcadorNumber: 0,
				marcadorTitle: 'Arquivado',
				publico: [],
				privado: []
			}
			this.data.forEach(projeto => {
				if (projeto.etapas_NUM === 10 && projeto.id_iniciativa_da_proposta === 'Pública') {
					arquivados.publico.push(projeto)
				} else if (projeto.etapas_NUM === 10 && projeto.id_iniciativa_da_proposta === 'Privado') {
					arquivados.privado.push(projeto)
				}
			})
			return arquivados
		},
		etapaPreposicao () {
			let data = {
				title: 'Em proposição',
				etapa: []
			}
			data.etapa.push(this.preposicao)
			data.etapa.push(this.consultaPI)
			data.etapa.push(this.avaliacao)
			return data
		},
		etapaAndamento () {
			let data = {
				title: 'Em andamento',
				etapa: []
			}
			data.etapa.push(this.elaboracao)
			data.etapa.push(this.discussao)
			data.etapa.push(this.consolidacao)
			data.etapa.push(this.implantacao)
			return data
		},
		etapaImplantacao () {
			let data = {
				title: 'Em implantação',
				etapa: []
			}
			data.etapa.push(this.implantacao)
			return data
		},
		etapaSuspenso () {
			let data = {
				title: 'Suspenso',
				etapa: []
			}
			data.etapa.push(this.suspenso)
			return data
		},
		etapaArquivado () {
			let data = {
				title: 'Arquivado',
				etapa: []
			}
			data.etapa.push(this.arquivado)
			return data
		}
	},
	watch: {
		clickedId(newprop, oldprop){
			console.log(newprop)
			this.$emit('clicked', newprop)
		}
	},
	methods: {
		hasMembers(first, last, etapa){
			let position = etapa;
			if (first <= position && position <= last) {
				return true
			}
		},
		getClickedId (value) {
			this.clickedId = value
		}
	}
}
</script>

<style lang="scss" scoped>

</style>

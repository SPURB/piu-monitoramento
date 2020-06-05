<template>
	<div id="sumario">

		<etapa-header />
		<etapa title='Em proposição' :etapas="etapasProposicao" @clicked="getClickedId" />
		<etapa title='Em andamento' :etapas="etapasAndamento" @clicked="getClickedId" />
		<etapa title='Em implantação' :etapas="etapasImplantacao" @clicked="getClickedId" />
		<etapa title='Suspenso' :etapas="etapasSuspenso" @clicked="getClickedId" />

	</div>
</template>

<script>
import EtapaHeader from './elements/EtapaHeader.vue'
import Etapa from './elements/Etapa.vue'

export default {
	name:'sumario',
	data () {
		return {
			clickedId: 0,
			error: {
				status: false,
				message: ''
			}
		}
	},
	props: {
		projetos: {
			type: Array,
			required: true
		}
	},
	components: {
		EtapaHeader,
		Etapa
	},
	computed: {
		etapasProposicao () {
			if (!this.projetos.length) { return [] }

			const elemPrevios = this.projetos.filter(projeto => projeto.id_tramitacao === 1)
			const consultaPublicaInical = this.projetos.filter(projeto => projeto.id_tramitacao === 2)
			const avalSmul = this.projetos.filter(projeto => projeto.id_tramitacao === 3)

			return [
				{
					marcadorNumber: '01',
					marcadorTitle: 'EM PROPOSIÇÃO DOS ELEMENTOS PRÉVIOS',
					publico: elemPrevios.filter(projetos => !projetos.proponentePrivado),
					privado: elemPrevios.filter(projetos => projetos.proponentePrivado)
				},
				{
					marcadorNumber: '02',
					marcadorTitle: 'CONSULTA PÚBLICA INICIAL',
					publico: consultaPublicaInical.filter(projetos => !projetos.proponentePrivado),
					privado: consultaPublicaInical.filter(projetos => projetos.proponentePrivado)
				},
				{
					marcadorNumber: '03',
					marcadorTitle: 'AVALIAÇÃO SMUL',
					publico: avalSmul.filter(projetos => !projetos.proponentePrivado),
					privado: avalSmul.filter(projetos => projetos.proponentePrivado)
				}
			]
		},
		etapasAndamento () {
			if (!this.projetos.length) { return [] }

			const elaboracao = this.projetos.filter(projeto => projeto.id_tramitacao === 4)
			const discPub = this.projetos.filter(projeto => projeto.id_tramitacao === 5)
			const consolidacao = this.projetos.filter(projeto => projeto.id_tramitacao === 6)
			const juridico = this.projetos.filter(projeto => projeto.id_tramitacao === 7)

			return [
				{
					marcadorNumber: '04',
					marcadorTitle: 'ELABORAÇÃO',
					publico: elaboracao.filter(projetos => !projetos.proponentePrivado),
					privado: elaboracao.filter(projetos => projetos.proponentePrivado)
				},
				{
					marcadorNumber: '05',
					marcadorTitle: 'DISCUSSÂO PÚBLICA',
					publico: discPub.filter(projetos => !projetos.proponentePrivado),
					privado: discPub.filter(projetos => projetos.proponentePrivado)
				},
				{
					marcadorNumber: '06',
					marcadorTitle: 'CONSOLIDAÇÃO',
					publico: consolidacao.filter(projetos => !projetos.proponentePrivado),
					privado: consolidacao.filter(projetos => projetos.proponentePrivado)
				},
				{
					marcadorNumber: '07',
					marcadorTitle: 'ENCAMINHAMENTO JURÍDICO',
					publico: juridico.filter(projetos => !projetos.proponentePrivado),
					privado: juridico.filter(projetos => projetos.proponentePrivado)
				}
			]
		},

		etapasImplantacao () {
			if (!this.projetos.length) { return [] }

			const implantacao = this.projetos.filter(projeto => projeto.id_tramitacao === 8)

			return [
				{
					marcadorNumber: '08',
					marcadorTitle: 'IMPLANTAÇÂO',
					publico: implantacao.filter(projetos => !projetos.proponentePrivado),
					privado: implantacao.filter(projetos => projetos.proponentePrivado)
				}
			]
		},

		etapasSuspenso () {
			if (!this.projetos.length) { return [] }

			const suspensos = this.projetos.filter(projeto => projeto.id_tramitacao === 9)
			return [
				{
					marcadorNumber: '09',
					marcadorTitle: 'SUSPENSO',
					publico: suspensos.filter(projetos => !projetos.proponentePrivado),
					privado: suspensos.filter(projetos => projetos.proponentePrivado)
				}
			]
		}
	},
	watch: {
		clickedId(newprop, oldprop){
			this.$emit('clicked', newprop)
		}
	},
	methods: {
		getClickedId (value) {
			this.clickedId = value
		}
	}
}
</script>

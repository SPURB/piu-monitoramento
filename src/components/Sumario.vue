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
import { http } from '../mixins'

export default {
	name:'sumario',
	mixins: [ http ],
	data () {
		return {
			clickedId: undefined,
			projetos: [],
			error: {
				status: false,
				message: ''
			}
		}
	},
	components: {
		EtapaHeader,
		Etapa
	},
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	created () {
		this.fetchJson('http://localhost:8080/v1/', 'projetos')
			.then(res=> this.projetos = res)
			.catch(err => {
				this.error.status = true
				this.error.message = err
			})
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
					publico: elemPrevios.filter(projetos => !projetos.id_proponentePrivado),
					privado: elemPrevios.filter(projetos => projetos.id_proponentePrivado)
				},
				{
					marcadorNumber: '02',
					marcadorTitle: 'CONSULTA PÚBLICA INICIAL',
					publico: consultaPublicaInical.filter(projetos => !projetos.id_proponentePrivado),
					privado: consultaPublicaInical.filter(projetos => projetos.id_proponentePrivado)
				},
				{
					marcadorNumber: '03',
					marcadorTitle: 'AVALIAÇÃO SMUL',
					publico: avalSmul.filter(projetos => !projetos.id_proponentePrivado),
					privado: avalSmul.filter(projetos => projetos.id_proponentePrivado)
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
					publico: elaboracao.filter(projetos => !projetos.id_proponentePrivado),
					privado: elaboracao.filter(projetos => projetos.id_proponentePrivado)
				},
				{
					marcadorNumber: '05',
					marcadorTitle: 'DISCUSSÂO PÚBLICA',
					publico: discPub.filter(projetos => !projetos.id_proponentePrivado),
					privado: discPub.filter(projetos => projetos.id_proponentePrivado)
				},
				{
					marcadorNumber: '06',
					marcadorTitle: 'CONSOLIDAÇÃO',
					publico: consolidacao.filter(projetos => !projetos.id_proponentePrivado),
					privado: consolidacao.filter(projetos => projetos.id_proponentePrivado)
				},
				{
					marcadorNumber: '07',
					marcadorTitle: 'ENCAMINHAMENTO JURÍDICO',
					publico: juridico.filter(projetos => !projetos.id_proponentePrivado),
					privado: juridico.filter(projetos => projetos.id_proponentePrivado)
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
					publico: implantacao.filter(projetos => !projetos.id_proponentePrivado),
					privado: implantacao.filter(projetos => projetos.id_proponentePrivado)
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
					publico: suspensos.filter(projetos => !projetos.id_proponentePrivado),
					privado: suspensos.filter(projetos => projetos.id_proponentePrivado)
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

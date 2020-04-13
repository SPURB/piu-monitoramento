<template>
	<div id="sumario">

		<div class="bloco">
			<div class="thead">
				<div>
					Etapas
				</div>
				<div>
					PIUs de iniciativa pública
				</div>
				<div>
					PIUs de iniciativa privada
				</div>
			</div>
		</div>		

		<Etapa :etapas="testeEtapa" />

		<div class="bloco andamento">
			<div class="etapa">Em andamento</div>

			<div>
				<div>
					<div class="marcadorEtapa">04</div>
					<span>Elaboração</span>
				</div>
				<div class="publicos">
					<section :key="`elaboracao-publico-${index}`" v-for="(projeto, index) in elaboracao.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`elaboracao-privado-${index}`" v-for="(projeto, index) in elaboracao.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>

			<div>
				<div>
					<div class="marcadorEtapa">05</div>
					<span>Discussão pública</span>
				</div>
				<div class="publicos">
					<section :key="`discussao-privado-${index}`" v-for="(projeto, index) in discussao.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`discussao-privado-${index}`" v-for="(projeto, index) in discussao.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>

			<div>
				<div>
					<div class="marcadorEtapa">06</div>
					<span>Consolidação</span>
				</div>
				<div class="publicos">
					<section :key="`consolidacao-privado-${index}`" v-for="(projeto, index) in consolidacao.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`consolidacao-privado-${index}`" v-for="(projeto, index) in consolidacao.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>

			<div>
				<div>
					<div class="marcadorEtapa">07</div>
					<span>Encaminhamento Jurídico</span>
				</div>
				<div class="publicos">
					<section :key="`encaminhamentos-privado-${index}`" v-for="(projeto, index) in encaminhamento.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`encaminhamentos-privado-${index}`" v-for="(projeto, index) in encaminhamento.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>
		</div>

		<div class="bloco implantacao">
			<div class="etapa">Implantação</div>

			<div>
				<div>
					<div class="marcadorEtapa">08</div>
					<span>Implantação</span>
				</div>
				<div class="publicos">
					<section :key="`implantacaos-publico-${index}`" v-for="(projeto, index) in implantacao.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`implantacaos-privado-${index}`" v-for="(projeto, index) in implantacao.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>
		</div>

		<div class="bloco suspenso">
			<div class="etapa">Suspenso</div>

			<div>
				<div>
					<span></span>
				</div>
				<div class="publicos">
					<section :key="`suspenso-privado-${index}`" v-for="(projeto, index) in suspenso.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`suspenso-privado-${index}`" v-for="(projeto, index) in suspenso.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>
		</div>

		<div class="bloco arquivado">
			<div class="etapa">Arquivado</div>

			<div>
				<div><span></span></div>
				<div class="publicos">
					<section :key="`arquivado-publico-${index}`" v-for="(projeto, index) in arquivado.publico">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
				<div class="privados">
					<section :key="`arquivado-privado-${index}`" v-for="(projeto, index) in arquivado.privado">
						<a href="#" @click="setProjectId(projeto.ID_rev)" :class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Etapa from './Etapa.vue'
export default {
	name:'sumario',
	data (){
		return {
			clickedId: undefined
		}
	},
	components: {
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
		testeEtapa () {
			let data = {
				title: 'Em proposição',
				etapa: []
			}
			data.etapa.push(this.preposicao)
			data.etapa.push(this.consultaPI)
			data.etapa.push(this.avaliacao)
			return data
		}
	},
	methods: {
		hasMembers(first, last, etapa){
			let position = etapa;
			if (first <= position && position <= last) {
				return true
			}
		},
		setProjectId(id){ 
			this.clickedId = id;
			this.$emit('clicked', id)
		},
		fConsultaAberta(par) {
			if (par.b_status == 'aberta' || par.e_status_consulta_internet_minuta == 'aberta' || par.e_status_consulta_internet_caderno == 'aberta') { 
				return 'consultaAberta'
			};
		}
	}
}
</script>

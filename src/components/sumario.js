export default {
	name:'sumario',
	data (){
		return {
			clickedId: undefined
		}
	},
	props: ['data', 'hiperlinks'],

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
		},
	},

	template: `
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
		
		<div class="bloco proposicao">
			<div class="etapa">Em proposição</div>
			<div>
				<div><div class="marcadorEtapa">01</div> <span>Em proposição dos elementos prévios</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 1 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 1 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">02</div> <span>Consulta Pública Inicial</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 2 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 2 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">03</div> <span>Avaliação SMUL</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 3 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 3 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="bloco andamento">
			<div class="etapa">Em andamento</div>

			<div>
				<div><div class="marcadorEtapa">04</div> <span>Elaboração</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 4 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 4 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">05</div> <span>Discussão pública</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 5 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 5 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">06</div> <span>Consolidação</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 6 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 6 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">07</div> <span>Encaminhamento Jurídico</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 7 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 7 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="bloco implantacao">
			<div class="etapa">Implantação</div>

			<div>
				<div><div class="marcadorEtapa">08</div> <span>Implantação</span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 8 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 8 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="bloco suspenso">
			<div class="etapa">Suspenso</div>

			<div>
				<div><span></span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 9 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 9 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="bloco arquivado">
			<div class="etapa">Arquivado</div>

			<div>
				<div><span></span></div>
				<div class="publicos">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 10 && projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div class="privados">
					<template v-for="projeto in data">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.etapas_NUM == 10 && projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>
	</div>
	`
}
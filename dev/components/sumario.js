let sumario = {
	name:'sumario',
	data (){
		return {
			data: monitoramento,
			clickedId: undefined
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
			this.sendId()
		},
		sendId(event){
			this.$emit('clicked', this.clickedId)
		},
		fConsultaAberta(par) {
			if (par.b_status == 'aberta' || par.e_status_consulta_internet_minuta == 'aberta') { 
				return 'consultaAberta'
			};
		},
	},

	template: `
	<div id="sumario">
		<div>		
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
		
		<div class="proposicao">
			<div class="etapa">Em proposição</div>
			<div>
				<div><div class="marcadorEtapa">01</div> <span>Em proposição dos elementos prévios</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(1,1, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(1,1, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">02</div> <span>Consulta Pública Inicial</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(2,2, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(2,2, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">03</div> <span>Avaliação SMUL</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(3,3, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(3,3, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="andamento">
			<div class="etapa">Em andamento</div>

			<div>
				<div><div class="marcadorEtapa">04</div> <span>Elaboração</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(4,4, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(4,4, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">05</div> <span>Discussão pública</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(5,5, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(5,5, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">06</div> <span>Consolidação</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(6,6, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(6,6, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">07</div> <span>Encaminhamento Jurídico</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(7,7, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(7,7, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="implantacao">
			<div class="etapa">Implantação</div>

			<div>
				<div><div class="marcadorEtapa">08</div> <span>Implantação</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(8,8, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(8,8, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="suspenso">
			<div class="etapa">Suspenso</div>

			<div>
				<div><span></span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(9,9, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div>
					<template v-for="projeto in data" v-if="hasMembers(9,9, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="arquivado">
			<div class="etapa">Arquivado</div>

			<div>
				<div><span></span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(10,10, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div>
					<template v-for="projeto in data" v-if="hasMembers(10,10, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

		<div class="prospeccao">
			<div class="etapa">Em prospecção</div>

			<!-- <div>
				<div><span></span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(11,11, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta!='Pública'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div><div>
					<template v-for="projeto in data" v-if="hasMembers(11,11, projeto.etapas_NUM)">
						<a href="#" @click="setProjectId(projeto.ID_rev)" v-if="projeto.id_iniciativa_da_proposta=='Privado'" v-bind:class="fConsultaAberta(projeto)">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div> -->

			<div>
				<span class="titulo">PIUs de iniciativa pública</span>
				<template v-for="projeto in data" v-if="hasMembers(11,11, projeto.etapas_NUM)">
					<span v-if="projeto.id_iniciativa_da_proposta!='Pública'">{{ projeto.id_nome }}</span>
				</template>
			</div>
			<div>
				<span class="titulo">PIUs de iniciativa privada</span>
				<template v-for="projeto in data" v-if="hasMembers(11,11, projeto.etapas_NUM)">
					<span v-if="projeto.id_iniciativa_da_proposta=='Privado'">{{ projeto.id_nome }}</span>
				</template>
			</div>
		</div>

	</div>
	`
}
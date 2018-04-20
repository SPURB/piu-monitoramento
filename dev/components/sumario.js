let sumario = {
	name:'sumario',
	data (){
		return {
			data: monitoramento,
			clickedId: undefined
		}
	},

	methods: {
		getStatusNumber(string){
			switch (string){
				case 'Em proposição dos elementos prévios': return 1; break;
				case 'Consulta Pública Inicial': return 2; break;
				case 'Em avaliação SMUL': return 3; break;
				case 'Elaboração': return 4; break;
				case 'Discussão pública': return 5; break;
				case 'Consolidação': return 6; break;
				case 'Tramitação Jurídica': return 7; break;
				case 'Implantação': return 8; break;
				case 'Não Autorizado / Não desenvolvido': return 9; break;
				case 'Áreas/Projetos em estudo que demandariam PIUs': return 10; break;
			}
		},
		hasMembers(first, last, etapa){
			let position = this.getStatusNumber(etapa);
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
		}
	},

	template: `
	<div id="sumario">

		<div class="proposicao">
			<div class="thead">
				<div>
					Etapas
				</div>
				<div>
					PIUs públicos
				</div>
				<div>
					PIUs privados
				</div>
			</div>

			<div class="etapa">Em proposição</div>

			<div>
				<div><div class="marcadorEtapa">01</div> <span>Em proposição dos elementos prévios</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(1,1, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(1,1, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">02</div> <span>Consulta Pública Inicial</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(2,2, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(2,2, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">03</div> <span>Em avaliação SMUL</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(3,3, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(3,3, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
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
					<template v-for="projeto in data" v-if="hasMembers(4,4, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(4,4, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">05</div> <span>Discussão pública</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(5,5, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(5,5, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">06</div> <span>Consolidação</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(6,6, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(6,6, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>

			<div>
				<div><div class="marcadorEtapa">07</div> <span>Tramitação Jurídica</span></div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(7,7, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(7,7, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
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
					<template v-for="projeto in data" v-if="hasMembers(8,8, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Pública'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
				<div>
					<template v-for="projeto in data" v-if="hasMembers(8,8, projeto.a_etapa_fluxograma)">
						<a href="#" @click="setProjectId(projeto.id)" v-if="projeto.id_iniciativa_da_proposta=='Privado'">
							{{ projeto.id_nome }}
						</a>
					</template>
				</div>
			</div>
		</div>

	</div>
	`
}
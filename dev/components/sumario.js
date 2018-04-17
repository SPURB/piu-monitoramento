let sumario = {
	name:'sumario',
	data (){
		return {
			data: monitoramento,
		}
	},
	methods: {
		getStatusNumber(string){
			switch (string){
				case 'Não autorizado / Desenvolvido': return 1; break;
				case 'Elaboração': return 2; break;
				case 'Não autorizado / Não Desenvolvido': return 3; break;
				case 'Consolidação': return 4; break;
				case 'Implantação': return 5; break;
				case 'Em avaliação SMUL': return 6; break;
				case 'Avaliação após 1ª Consulta': return 7; break;
				case 'Em proposição dos elementos prévios': return 8; break;
				case 'Possível PIU': return 9; break;
				case 'Possível': return 10; break;
				default: return 0; 
			}
		},
		hasMembers(first, last, etapa){
			let position = this.getStatusNumber(etapa);
			if (first <= position && position <= last) {
				return true
			}
		}
	},
	computed:{
		unique_status_values(){
			let all = []
			this.data.map(function(index){
				all.push(index.etapa_fluxograma)
			})
			return Array.from(new Set(all))//filtra etapas repetidas
		}
	},
	template: `
	<div id="sumario">
		<div class='proposicao'>
			<h4>proposicao</h4>
			<template v-for="projeto in data">
				<div v-if="hasMembers(1,3, projeto.etapa_fluxograma)">
					<div v-if="hasMembers(1,1, projeto.etapa_fluxograma)">
						{{projeto.id_nome}}
					</div>
					<div v-if="hasMembers(2,2, projeto.etapa_fluxograma)">
						{{projeto.id_nome}}
					</div>
					<div v-if="hasMembers(3,3, projeto.etapa_fluxograma)">
						{{projeto.id_nome}}
					</div>
				</div>
			</template>
		</div>
		<div class="implantacao">
			<h4>implantacao</h4>
			<template v-for="projeto in data">
				<div class='Implantacao' v-if="hasMembers(4,4, projeto.etapa_fluxograma)">
					<div>
						{{projeto.id_nome}}
					</div>
				</div>
			</template>
			</div>
	</div>`
}

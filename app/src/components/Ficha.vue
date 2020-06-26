<template>
	<div id="ficha">
		<div @click="menu=!menu" class="menu-titulo" id="menuTitulo">
			<div class="titulo" :class="atribuiEtapaClass(projeto.id_tramitacao)">
				<span :class="consultaAbertaClass(projeto.consultaAberta)">{{ projeto.nome }}</span>
				<i class="material-icons" v-if="!menu">expand_more</i>
				<i class="material-icons" v-if="menu">expand_less</i>
			</div>
			<transition name="menuSlide">
				<ul class="menu" v-if="menu">
					<li v-for="projeto in menuItens" 
					:class="atribuiEtapaClass(projeto.id_tramitacao)" 
					:key="projeto.id">
						<a :class="consultaAbertaClass(projeto.consultaAberta)" @click="gravaId(projeto.id)">{{ projeto.nome }}</a>
					</li>
				</ul>
			</transition>
		</div>

		<div class="container">
			<ficha-sumario
				:projeto="projeto"
				:proponentes="proponentes"
				:origens="origens"
				:arquivosTramitacao="arquivos_tramitacao"
				:etapaClass="atribuiEtapaClass(projeto.id_tramitacao)" 
				:etapaTag="atribuiEtapaTag(projeto.id_tramitacao)" 
				:clickedId="clickedId" />
			<ficha-aspectos
				v-if="clickedId"
				:idProjeto="clickedId"
				:descricao="projeto.descricao"
				:elemento="projeto.elementoMEM"
				:areaTotal="projeto.areaTotal"
			/>
			<div class="tramitacao">
				<h4>Tramitacao<span>Última atualização <strong>{{ projeto.ultimaAtualizacao }}</strong></span></h4>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="1"
					:title="'Proposição dos elementos prévios'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 1
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 1	
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="2"
					:title="'Consulta pública inicial'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 2
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 2
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="3"
					:title="'Avaliação SMUL'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 3
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 3
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="4"
					:title="'Elaboração'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 4
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 4
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="5"
					:title="'Discussão pública'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 5
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 5
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="6"
					:title="'Consolidação'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 6
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 6
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="7"
					:title="'Encaminhamento Jurídico'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 7
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 7
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
				<ficha-tramitacao
					:clickedId="clickedId"
					:idTramitacao="8"
					:title="'Implantação'"
					:arquivos="getArquivosTramitacao(arquivos_tramitacao, {
						idProjeto: projeto.id,
						idTramitacao: 8
					})"
					:dataTramitacao="getDataTramitacao(data_tramitacao,{
						idProjeto: projeto.id,
						idTramitacao: 8
					})"
					:grupos="gruposOrdenado"
					:projetoTramitacao="projeto.id_tramitacao"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import FichaSumario from './elements/FichaSumario.vue'
import FichaAspectos  from './elements/FichaAspectos.vue'
import FichaTramitacao from './elements/FichaTramitacao.vue'

import { http } from '../api'

export default {
	name:'ficha',
	mixins: [ http ],
	data () {
		return {
			menuClickedId: 0,
			menu: false,
			arquivos_tramitacao: [],
			proponentes: [],
			origens: [],
			data_tramitacao: [],
			grupos: [],
		}
	},
	props: {
		clickedId: {
			type: Number,
			required: true
		},
		projetos:{
			type: Array,
			required: true
		},
		tramitacao:{
			type: Array,
			required: true
		}
	},
	components:{
		FichaSumario,
		FichaAspectos,
		FichaTramitacao
	},
	created () {
		const dataTables = [
			'arquivos_tramitacao',
			'proponentes',
			'origens',
			'data_tramitacao',
			'grupos'
		].map(table => this.fetchJson(table))

		Promise.all(dataTables)
			.then(res => {
				this.arquivos_tramitacao = res[0]
				this.proponentes = res[1]
				this.origens = res[2]
				this.data_tramitacao = res[3]
				this.grupos = res[4]
			})
			.catch(err => {
				this.error.status = true
				this.error.message = err
			})
	},
	computed: {
		menuItens () {
			if (!this.projetos.length) { return [] }
			return this.projetos
				.sort((objA, objB) => {
					const a = objA.nome.toUpperCase()
					const b = objB.nome.toUpperCase()
					if (a < b) { return -1 }
					if (a > b) { return 1 }
					return 0;
				})
				.sort((a, b) => a.id_tramitacao - b.id_tramitacao)
		},
		projeto () {
			if (!this.projetos.length || !this.clickedId) { return {} }
			return this.projetos.find(projeto => projeto.id === this.clickedId)
		},
		tramitacoesValidas () {
			if (!this.tramitacao.length) { return [] }
			return this.tramitacao.filter(item => item.id < 9)
		},
		gruposOrdenado () {
			if (!this.grupos.length) { return [] }
			const ordered = this.grupos
				.sort((a, b) => a.id === 7 ? -1 : 1)
				.sort((a, b) => a.id === 4 ? -1 : 1)
				.sort((a, b) => a.id === 6 ? -1 : 1)
				.sort((a, b) => a.id === 5 ? -1 : 1)
				.sort((a, b) => a.id === 1 ? -1 : 1)
				.sort((a, b) => a.id === 3 ? -1 : 1)
				.sort((a, b) => a.id === 9 ? -1 : 1)
				.sort((a, b) => a.id === 2 ? -1 : 1)
				.sort((a, b) => a.id === 8 ? -1 : 1)

			return ordered.concat({ id: 0, nome:'' })
		}
	},
	methods: {
		getArquivosTramitacao (arquivos, { idProjeto, idTramitacao }) {
			if (!arquivos.length || !idProjeto || !idTramitacao) { return [] }
			return arquivos.filter(arquivo => arquivo.id_projetos === idProjeto && arquivo.id_tramitacao === idTramitacao)
		},
		getDataTramitacao (datas, { idProjeto, idTramitacao }) {
			if (!datas.length || !idProjeto || !idTramitacao) { return {} }
			return datas.find(data => data.id_projetos === idProjeto && data.id_tramitacao === idTramitacao)
		},
		getProjetoTramitacao (id) {
			return id ? id : 0
		},
		atribuiEtapaClass(etp) {
			if (etp <= 3) { return 'proposicao' };
			if (etp > 3 && etp <= 7) { return 'andamento'};
			if (etp == 8) { return 'implantacao' };
			if (etp == 9) { return 'suspenso' };
			if (etp == 10) { return 'arquivado' };
			if (etp == 11) { return 'prospeccao' };
		},

		atribuiEtapaTag(etp) {
			switch (etp) {
				case 1: return 'Proposição';
				case 2: return 'Consulta púb. inicial';
				case 3: return 'Avaliação SMUL';
				case 4: return 'Elaboração';
				case 5: return 'Discussão pública';
				case 6: return 'Consolidação';
				case 7: return 'Enc. jurídico';
				case 8: return 'Implantação';
				case 9: return 'Suspenso';
				case 10: return 'Arquivado';
				case 11: return 'Em prospecção';
			};
		},

		enviaId(event) {
			this.$emit('clicked', this.menuClickedId)
		},

		gravaId(id) {
			this.menuClickedId = id
			this.enviaId()
		}
	},
}
</script>

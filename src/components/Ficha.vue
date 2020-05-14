<template>
	<div id="ficha">
		<div @click="menu=!menu" class="menu-titulo" id="menuTitulo">
			<div class="titulo" :class="atribuiEtapaClass(refProjeto.id_tramitacao)">
				<span :class="consultaAbertaClass(refProjeto.id_statusConsulta)">{{ refProjeto.nome }}</span>
				<i class="material-icons" v-if="!menu">expand_more</i>
				<i class="material-icons" v-if="menu">expand_less</i>
			</div>
			<transition name="menuSlide">
				<ul class="menu" v-if="menu">
					<li v-for="projeto in menuItens" 
					:class="atribuiEtapaClass(projeto.id_tramitacao)" 
					:key="projeto.id">
						<a :class="consultaAbertaClass(projeto.id_statusConsulta)" @click="gravaId(projeto.id)">{{ projeto.nome }}</a>
					</li>
				</ul>
			</transition>
		</div>

		<div class="container">
			<ficha-sumario
				:projeto="refProjeto"
				:proponentes="proponentes"
				:origens="origens"
				:arquivosTramitacao="arquivos_tramitacao"
				:etapaClass="atribuiEtapaClass(refProjeto.id_tramitacao)" 
				:etapaTag="atribuiEtapaTag(refProjeto.id_tramitacao)" 
				:clickedId="clickedId" />
			<aspectos
				v-if="clickedId"
				:idProjeto="clickedId"
				:descricao="refProjeto.descricao"
				:elemento="refProjeto.elementoMEM"
				:areaTotal="refProjeto.areaTotal"
				:meta="meta"
			/>

			<div class="tramitacao">
				<h4>Tramitação <span>Última atualização <strong>{{ dataExcelJS(projeto.ultima_atualizacao) }}</strong></span></h4>
				<tramitacao
					:etapa=" {
						title: 'Proposição dos elementos prévios',
						number: '01',
						periodo: '29/07/2016 — 28/09/2016'
					}"
				>
					<template slot="content">
						<topicos :subtitle="`Protocolado em 11/12/2017`" />
						<hiperlinks
								:nomeSecao="`Consulta Inicial`"
								:arquivos="[
									{ nome: 'PDF de Estrutura', url: 'estrutura.pdf' },
									{ nome: 'Image da Estrutura', url: 'imagem_estrutura.jpeg' }
								]"
						/>
					</template>
				</tramitacao>
			</div>
		</div>
	</div>
</template>
<script>
import FichaSumario from './elements/FichaSumario.vue'
import Aspectos  from './elements/Aspectos.vue'
import Tramitacao from './elements/Tramitacao.vue'
import Topicos from './elements/Topicos.vue'
import Hiperlinks from './elements/Hiperlinks.vue'
import { http } from '../api'

export default {
	name:'ficha',
	mixins: [ http ],
	data () {
		return {
			projeto: {},
			menuClickedId: 0,
			menu: false,
			projetos: [],
			arquivos_tramitacao: [],
			proponentes: [],
			origens: [],
			meta: []
		}
	},
	props: [
		'clicked-id', 
		'data', 
		'hiperlinks'
	],
	components:{
		FichaSumario,
		Aspectos,
		Tramitacao,
		Topicos,
		Hiperlinks
	},
	created () {
		[
			'projetos',
			'arquivos_tramitacao',
			'proponentes',
			'origens',
			'meta'
		].forEach(table => {
			this.fetchJson(table)
				.then(res => this[table] = res)
				.catch(err => {
					this.error.status = true
					this.error.message = err
				})
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
		refProjeto () {
			if (!this.projetos.length || !this.clickedId) { return {} }
			return this.projetos.find(projeto => projeto.id === this.clickedId)
		}
	},
	methods: {
		atribuiEtapaClass(etp) {
			if (etp <= 3) { return 'proposicao' };
			if (etp > 3 && etp <= 7) { return 'andamento'};
			if (etp == 8) { return 'implantacao' };
			if (etp == 9) { return 'suspenso' };
			if (etp == 10) { return 'arquivado' };
			if (etp == 11) { return 'prospeccao' };
		},

		atribuiEtapaTag(etp) {
			const etapa = parseInt(etp)
			switch (etapa) {
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

		dataExcelJS(data) {
			if (data != null && data != '-' && data != 'NA') {
				if (data.toString().length == 5) {
					let d = new Date((Math.floor(data - 25568))*86400000);
					let string = ('0' + d.getDate()).slice(-2)+'/'+('0' + (d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();
					return string;
				} else if (data.replace('/','').length > 5 && data.replace('/','').length <= 8) {
					return data;
				} else { return data };
			} else { return '' }
		},

		encontraProjeto(newClickedId) {
			this.data.map(function(index) {
				if (index.id == newClickedId) {
					this.projeto = index;
				};
			});
			this.hiperlinks.map(function(index) {
				if (index.ID == newClickedId) {
					this.proj == index;
				};
			});
		},

		enviaId(event) {
			this.$emit('clicked', this.menuClickedId)
		},

		gravaId(id) {
			this.menuClickedId = id;
			this.enviaId();
		},

		abreTramitacao(par) {
			let etapa = par.etapas_NUM;
			if (etapa == 1) { this.E01 = true; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 2) { this.E02 = true; this.E01 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 3) { this.E03 = true; this.E01 = false; this.E02 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 4) { this.E04 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 5) { this.E05 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 6) { this.E06 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 7) { this.E07 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E08 = false; };
			if (etapa == 8) { this.E08 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; };
		},

		fConsultaAberta(par) {
			if (par.b_status == 'aberta' || par.e_status_consulta_internet_minuta == 'aberta' || par.e_status_consulta_internet_caderno == 'aberta') { 
				return 'consultaAberta'
			};
		},		

		numberToReal(numero) {
			var numero = numero.toFixed(2).split('.');
			numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
			return numero.join(',');
		},

		filtroMenu(proj) {
			return (proj.etapas_NUM > 0 && proj.etapas_NUM <= 10);
		}
	},

	watch:{
		clickedId(newprop,oldprop){
			const app = this;
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index;
					app.abreTramitacao(index);
				};
			});
		},
	}
}
</script>

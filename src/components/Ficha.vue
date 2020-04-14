<template>
	<div id="ficha">
		<div @click="menu=!menu" class="menu-titulo" id="menuTitulo">
			<div class="titulo" v-bind:class="atribuiEtapaClass(projeto.etapas_NUM)">
				<span v-bind:class="fConsultaAberta(this.projeto)">{{ projeto.id_nome }}</span>
				<i class="material-icons" v-if="!menu">expand_more</i>
				<i class="material-icons" v-if="menu">expand_less</i>
			</div>
			<transition name="menuSlide">
				<ul class="menu" v-if="menu">
					<li v-for="projeto in data.filter(filtroMenu).sort(function(a,b){return a.etapas_NUM - b.etapas_NUM})" 
					v-bind:class="atribuiEtapaClass(projeto.etapas_NUM)" 
					:key="projeto.ID_rev">
						<a v-bind:class="fConsultaAberta(projeto)" @click="gravaId(projeto.ID_rev)">{{ projeto.id_nome }}</a>
					</li>
				</ul>
			</transition>
		</div>

		<div class="container">
				<ficha-sumario
					:projeto="projeto"
					:hiperlinks="hiperlinks"
					:etapaClass="atribuiEtapaClass(projeto.etapas_NUM)" 
					:etapaTag="atribuiEtapaTag(projeto.etapas_NUM)" 
					:clickedId="clickedId" />

			<div class="aspectos">
				<h4>Aspectos técnico-urbanísticos</h4>

				<p>{{ projeto.urb_descricao_basica }}</p>

				<template v-if="testeVazio(projeto.urb_elemento_da_rede_de_estruturacao_urbana) != false">
					<div>
						<h6>Elemento da rede de estruturação urbana</h6>
						{{ projeto.urb_elemento_da_rede_de_estruturacao_urbana }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_area_total) != false">
					<div>
						<h6>Área total</h6>
						{{ projeto.urb_area_total }} ha
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_zonas_especiais) != false">
					<div>
						<h6>Zonas especiais</h6>
						{{ projeto.urb_zonas_especiais }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_justificativa_interesse_publico) != false">
					<div>
						<h6>Interesse público</h6>
						{{ projeto.urb_justificativa_interesse_publico }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_contrapartida_prevista) != false">
					<div>
						<h6>Contrapartida prevista</h6>
						{{ projeto.urb_contrapartida_prevista }}
					</div>
				</template>
				<template v-if="testeVazio(projeto.urb_justificativa_interesse_publico) != false">
					<div>
						<h6>Interesse privado</h6>
						{{ projeto.urb_justificativa_interesse_publico }}
					</div>
				</template>
			</div>

			<div class="tramitacao">
				<h4>Tramitação <span>Última atualização <strong>{{ dataExcelJS(projeto.ultima_atualizacao) }}</strong></span></h4>
						
				<Tramitacao
					:etapa="{
						title: 'Proposição dos elementos prévios',
						subtitle: 'Protocolado em 11/12/2017',
						number: '01',
						periodo: '29/07/2016 — 28/09/2016'
					}"
				>
					<template slot="content">
						<Hiperlinks />
					</template>
				</Tramitacao>

				<Tramitacao
					:etapa="{
						title: 'Consulta pública inicial',
						subtitle: 'Consulta encerrada (29/09/2016—14/10/2016)(60 contribuições)',
						number: '02',
						periodo: '29/07/2016 — 28/09/2016'
					}"
				>
					<template slot="content">
						<Hiperlinks />
					</template>
				</Tramitacao>

			</div>
		</div>
	</div>
</template>
<script>
import FichaSumario from './FichaSumario.vue'
import Tramitacao from './Tramitacao.vue'
import Hiperlinks from './Hiperlinks.vue'

export default {
	name:'ficha',
	data () {
		return {
			projeto: {},
			menuClickedId: 0,
			menu: false
		}
	},
	props: [
		'clicked-id', 
		'data', 
		'hiperlinks'
	],
	components:{
		FichaSumario,
		Tramitacao,
		Hiperlinks
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

		testeVazio(file) {
			if (file != undefined && file != null && file != '-' && file != '' && file != 'NA') {
				return true;
			} else { return false };
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

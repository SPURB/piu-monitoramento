let sumario_linha = {
	name: 'sumario_linha',
	data() {
		return {
			data: monitoramento,
			clickedId: undefined,
		}
	},
	methods: {
	},
	mounted() {
		let app = this;
		let container = document.getElementById('linha_do_tempo');

		let itemsTemp = [];

		// colunas com datas/periodos:
		// PROPOSICAO: a_data_protocolo , a_data_protocolo - a_data_envio_comunicacao
		// * CONS PUB INICIAL: b_data_inicio - b_data_final
		//		b_data_instancia_consultada , 
		// AVAL SMUL: c_data_envio - c_data_devolucao_spurb
		//		c_data_cmpu , 
		// ELABORACAO: Data_inicio_4 - Data_fim_4
		// * DISC PUB: Data_inicio_5 - Data_fim_5
		//		e_data_inicio_consulta_caderno - e_data_final_consulta_caderno
		//		e_data_inicio_consulta_minuta - e_data_final_consulta_minuta
		//		e_data_audiencia_publica
		// CONSOLIDACAO: Data_inicio_6 - Data_fim_6
		// ENC JURIDICO: g_data_envio_aprovacao - Data_fim_7
		// IMPLANTACAO: h_data_inicio - Data_fim_8

		let preencheItems = function() {
			for (var i = 0; i < app.data.length; i++) {		// Loop PIUs
				for (var j = 1; j <= 8; j++) {				// Loop Etapas

					let inc = null; let fnl = null; let etp = null; let clsN = null;
					switch (j) {
						case 1: 
							inc = app.data[i].a_data_protocolo; fnl = app.data[i].a_data_envio_comunicacao; etp = 'Em proposição dos elementos prévios'; clsN = 'lt_proposicao'; break;
						case 2: 
							inc = app.data[i].b_data_inicio; fnl = app.data[i].b_data_final; etp = 'Consulta Pública Inicial'; clsN = 'lt_proposicao'; break;
						case 3: 
							inc = app.data[i].c_data_envio; fnl = app.data[i].c_data_devolucao_spurb; etp = 'Avaliação SMUL'; clsN = 'lt_proposicao'; break;
						case 4: 
							inc = app.data[i].Data_inicio_4; fnl = app.data[i].Data_fim_4; etp = 'Elaboração'; clsN = 'lt_andamento'; break;
						case 5: 
							inc = app.data[i].Data_inicio_5; fnl = app.data[i].Data_fim_5; etp = 'Discussão pública'; clsN = 'lt_andamento'; break;
						case 6: 
							inc = app.data[i].Data_inicio_6; fnl = app.data[i].Data_fim_6; etp = 'Consolidação'; clsN = 'lt_andamento'; break;
						case 7: 
							inc = app.data[i].g_data_envio_aprovacao; fnl = app.data[i].Data_fim_7; etp = 'Encaminhamento Jurídico'; clsN = 'lt_andamento'; break;
						case 8: 
							inc = app.data[i].h_data_inicio; fnl = app.data[i].Data_fim_8; etp = 'Implantação'; clsN = 'lt_implantacao'; break;
					};

					if (inc != null && inc != '' && inc != '-') {

						let inicio = new Date((Math.floor(inc - 25568))*86400000);
						let final = new Date((Math.floor(fnl - 25568))*86400000);
						let inicio_comp = inicio.getFullYear()+'-'+('0' + (inicio.getMonth()+1)).slice(-2)+'-'+('0' + inicio.getDate()).slice(-2);
						let final_comp = final.getFullYear()+'-'+('0' + (final.getMonth()+1)).slice(-2)+'-'+('0' + final.getDate()).slice(-2);
						let inicio_str = ('0' + inicio.getDate()).slice(-2)+'/'+('0' + (inicio.getMonth()+1)).slice(-2)+'/'+inicio.getFullYear();
						let final_str = ('0' + final.getDate()).slice(-2)+'/'+('0' + (final.getMonth()+1)).slice(-2)+'/'+final.getFullYear();

						if (fnl != null && fnl != '' && fnl != '-') {
							itemsTemp.push({
								id: i+'_'+j,
								group: app.data[i].ID_rev,
								content: etp,
								start: inicio_comp,
								end: final_comp,
								title: etp+': '+inicio_str+' – '+final_str,
								className: clsN,
							});
						} else {
							itemsTemp.push({
								id: i+'_'+j,
								type: 'point',
								group: app.data[i].ID_rev,
								content: etp,
								start: inicio_comp,
								title: etp+': '+inicio_str,
								className: clsN,
							});
						};
						console.log(itemsTemp);
					} else { };

				};
			};
		}();

		let items = new vis.DataSet(itemsTemp);

		let groups = [];

		let preencheGroups = function() {
			for (var i = 0; i < app.data.length; i++) {
				groups.push({
					id: app.data[i].ID_rev,
					content: app.data[i].id_nome,
					title: app.data[i].id_nome
				});
			};
		}();

		let hoje = new Date();
		let maximo = new Date(hoje.getFullYear(), (hoje.getMonth()+2), hoje.getDate());

		let options = {
			align: 'left',
			margin: {
				axis: 40,
				item: 10,
			},
			min: 1970,
			max: maximo,
			selectable: false,
			stack: false,
			stackSubgroups: false,
			timeAxis: {
				scale: 'month',
				step: 3,
			},
			zoomMax: 315576000000,
			zoomMin: 2592000000
		};

		let timeline = new vis.Timeline(container, items, groups, options);
	},
	template: `
	<section id="sumario_linha">
		<div id="linha_do_tempo"></div>
	</section>
	`
}